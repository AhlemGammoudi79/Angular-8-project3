// import express
const express = require("express");
// import mongoose
const mongoose = require("mongoose");
// import models
const User = require("./models/user");
const Gift = require("./models/gift");
const Order= require("./models/order");
const Contact= require("./models/contact");
const path=require('path');
// import pdfkit
const fs=require('fs');
const PDFDocument = require('./pdfkit');

// import multer 
const multer = require('multer');
const bcrypt = require("bcrypt");
// import bodyparser
const bodyParser = require("body-parser");
const doc = require("pdfkit");
const app = express();

// Connect to Data Base
mongoose.connect("mongodb://localhost:27017/cadeauAhlem", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-with, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS, PATCH, PUT"
  );
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// multer *
// 1.etape :acceder aux fichiers
app.use('/images', express.static(path.join('backend/images')));
// 2.etape : config multer 
// 2.1defintion des extension des fichiers
const MIME_TYPE = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpeg': 'jpg',
  'application/pdf':'pdf'
  }
  // 2.2 definition de destination et le nom des fichiers
  const storage = multer.diskStorage({
    // ** 1.destination
    destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    let error = new Error("Mime type is invalid");
    if (isValid) {
    error = null;
    }
    //Affecter la destination /variable des success
    cb(null, 'backend/images')
    },
    //file name
    filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const extension = MIME_TYPE[file.mimetype];
    const imgName = name + '-' + Date.now() + '-crococoder-' +
    '.' + extension;
    //Affecter file name
    cb(null, imgName);
    }
    });
// traitement create user
app.post("/api/createUser", multer({ storage: storage
}).single('img'), (req, res) => {
  console.log(req.body);
  let url = req.protocol + '://' + req.get('host');
  console.log('here URL', url);
User.findOne({email:req.body.email}).then((doc)=>{
  if(doc){
    res.status(200).json({message:"user existe"})
  }
  else {
    
  bcrypt.hash(req.body.password, 10).then((cryptedPassword) => {
    // 1.etape1
    let user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: cryptedPassword,
      role: req.body.role,
      tel: req.body.tel,
      ville: req.body.ville,
      statut:req.body.statut,
      dateOfBirth:req.body.dateOfBirth,
      description:req.body.description,

      img:url + '/images/' + req.file.filename,
   
    });
    // 2.etape2:
    user.save();
    // 3.etape3:
    res.status(200).json({
      message: "user added with success",
    });
  });
  }
}

)

});


    // traitement create user
    app.post('/api/createUserC',(req,res)=> 
    // 1.etape1
   { let user = new User({

    firstName:req.body.firstName,
    lastName:req.body.lastName,
    email:req.body.email,
    password:req.body.password,
    password:req.body.password,
    confirmPasword:req.body.confirmPasword,
     role:req.body.role,
    tel:req.body.tel,

    

});
// 2.etape2:
user.save();
// 3.etape3:
res.status(200).json({
    message :'user added with success'
})
});


// traitement de get all users
app.get("/api/allUsers", (req, res) => {
  console.log("here in function get all users");
  // 1.etape1:
  User.find((err, docs) => {
    if (err) {
      console.log("error in DB ");
    } else {
      // success
      res.status(200).json({
        users: docs,
      });
    }
  });
});


// traitement login
app.post("/api/login", (req, res) => {
  console.log("Here in login", req.body);
  // etape1:recherche de l'utilisateur par mail
  User.findOne({ email: req.body.email })
    .then((resultEmail) => {
      console.log("resultEmail", resultEmail);
      // si l'email n'exit pas
      if (!resultEmail) {
        res.status(200).json({
          findedUser: "Wrong Email",
        });
      }

      return bcrypt.compare(req.body.password, resultEmail.password);
    })
    .then((resultPwd) => {
      console.log("resultPwd", resultPwd);
      // 3.si le mot de pass ne sont pas identique
      if (!resultPwd) {
        res.status(200).json({
          findedUser: "Wrong password",
        });
      }
      // 4.si l'email wpwd existent donc on passe a la recherch de l'utilisateur par son mail
      else {
        User.findOne({ email: req.body.email }).then((result) => {
          console.log("result", result);
          res.status(200).json({
            findedUser: result,
          });
        });
      }
    });
});

  // traitement edit User
  app.put('/api/allUsers/:id',(req,res)=>{
    console.log("here in function edit user");
    // 1etape

    let user={_id:req.body._id,
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      email:req.body.email,
      password:req.body.password,
      role:req.body.role,
      tel:req.body.tel,
      statut:req.body.statut,
      ville :req.body.ville,

    };
    // 2.etape
    User.updateOne({_id:req.body._id},user).then(
      (result)=>{
        console.log("result update",result);
        res.status(200).json({
          message:"Edited with success"
        })
      }
    )
  })

// traitement delete user
app.delete("/api/allUsers/:id", (req, res) => {
  console.log("hello in BE to delete user by id");
  //1. recuperation de l'id dans le path
  let id = req.params.id;
  console.log("id user to delete", id);
User.findOne({_id:id}).then((findedUser)=>{
if (findedUser.role =="fournisseur") {
  Gift.deleteMany({idFornisseur:findedUser._id}).then(()=>{
    console.log('deleted gifts');
  });

 
} 
  User.deleteOne({ _id: id }).then((result) => {
    console.log(result);
    if (result) {
      // success
      res.status(200).json({
        message: "user deleted with success",
      });
    }
  });

})


});

  // traitement get user
app.get("/api/allUsers/:id", (req, res) => {
  console.log("hello in BE to get user by id");
  // 1.recuperation de la valeur de l'id dans la path
  let id = req.params.id;
  console.log("id user to search", id);
  // 2.recherche par id
  User.findOne({ _id: id }).then((doc) => {
    console.log("finded user", doc);
    res.status(200).json({
      user: doc,
    });
  });
});
      
    // traitement de search user
    app.post("/api/searchUser",(req,res)=>{
      console.log("here in search");
      // etape1
      let searchValue=req.body.searchValue;
      console.log(searchValue);
      // etape2:recherche
      User.find({
        $or:[
          {firstName:{$regex:`.*${searchValue}`}},
          {role:{$regex:`.*${searchValue}`}}
        ]
      }).then((docs)=>{
        if(docs){
          console.log("result",docs);
          res.status(200).json({
            users:docs
          })
        }
      })
    
    })
    
    
    
// traitement create gift
app.post("/api/createGift", multer({ storage: storage
}).single('img'), (req, res) => {
    console.log("here in fn create gift");
    let url = req.protocol + '://' + req.get('host');
    console.log('here URL', url);

   Gift.findOne({name:req.body.name,idFornisseur:req.body.idFornisseur}).then((doc)=>
    {
      if (doc) {
        res.status(200).json({message:"gift existe"})

      } else {
      

  let gift = new Gift({
    name: req.body.name,
    category: req.body.category,
    occasion: req.body.occasion,
    destinataire: req.body.destinataire,
    age: req.body.age,
    prix: req.body.prix,
    stock:req.body.stock,
    idFornisseur: req.body.idFornisseur,

    img: url + '/images/' + req.file.filename,

  });
  // 2.etape2:
  gift.save();
  // 3.etape3:
  res.status(200).json({
    message: "gift added with success",
  }); 
      }
    })

});
// traitement de get all gifts
app.get("/api/allGifts", (req, res) => {
  console.log("here in function get all gifts");
  // 1.etape1:
  Gift.find((err, docs) => {
    if (err) {
      console.log("error in DB ");
    } else {
      // success
  res.status(200).json({
      gifts:docs
  })
    }
  });
});


// traitement delete gift
app.delete("/api/allGifts/:id", (req, res) => {
  console.log("hello in BE to delete gift by id");

  //1. recuperation de l'id dans le path
  let id = req.params.id;
  console.log("id gift to delete", id);
  // 2. delete
  
  Gift.deleteOne({ _id: id }).then((result) => {
    console.log(result);
    if (result) {
      // success
      res.status(200).json({
        message: "gift deleted with success",
      });
    }
  });
});

// traitement de get My Gifts
app.get("/api/allMyGifts/:id", (req, res) => {
  console.log("here in function get my gifts");
  // 1.etape1:
  let id =req.params.id;
  Gift.find({idFornisseur:id},(err, docs) => {
    if (err) {
      console.log("error in DB ");
    } else {
      // success
  res.status(200).json({
      myGifts:docs
  })
    }
  });
});


  // traitement edit gift
  app.put('/api/allGifts/:id',(req,res)=>{
    console.log('here in function edit Gift');
    let gift={
      _id:req.body._id,

      name : req.body.name,
      category : req.body.category,
      occasion : req.body.occasion,
      destinataire : req.body.destinataire,
      age: req.body.age,
      prix : req.body.prix,
    stock:req.body.stock, 
    
    };
    Gift.updateOne({_id:req.body._id},gift).then((result)=>{
      console.log('resultat edit gift',result);
      res.status(200).json({
        message:"gift edited with success"
      })
    })
  })

    // traitement de search gift
    app.post("/api/searchGift",(req,res)=>{
      console.log("here in search");
      // etape1
      let category=req.body.category;
      console.log(category);
      let occasion=req.body.occasion;
      console.log(occasion);
       let destinataire=req.body.destinataire;
      console.log(destinataire);
      // etape2:recherche
      Gift.find({
        $and:[
          {category:{$regex:`.*${category}`}},
          {occasion:{$regex:`.*${occasion}`}},
          {destinataire:{$regex:`.*${destinataire}`}},
            ]
        
      }).then((docs)=>{
        if(docs){
          console.log("result",docs);
          res.status(200).json({
            gifts:docs
          })
        }
      })
  
  })

// traitement get Gift
app.get("/api/allGifts/:id", (req, res) => {
  console.log("hello in BE to get gift by id");
  // 1.recuperation de la valeur de l'id dans la path
  let id = req.params.id;
  console.log("id plat to search", id);
  // 2.recherche par id
  Gift.findOne({ _id: id }).then((doc) => {
    console.log("finded  gift", doc);
    res.status(200).json({
      gift: doc,
    });
  });
});


  



// traitement create order
app.post("/api/createOrder",(req, res) => {
    console.log("here in fn create order");
  let order = new Order({
  
    idClient: req.body.idClient,
    idGift: req.body.idGift,
    Qty: req.body.Qty,
    idFornisseur: req.body.idFornisseur,
    prix: req.body.prix,
  
  })
Gift.findOne({_id: req.body.idGift}).then(
  (doc)=>{
    console.log("doccc",doc);
    if (doc) {
      let newStock = Number(doc.stock) - Number(req.body.Qty)
      let gift = new Gift({
        _id : doc._id,
        name : doc.name,
        category : doc.category,
        occasion : doc.occasion,
        destinataire : doc.destinataire,
        age: doc.age,
        prix : doc.prix,
        stock: newStock

      })

      Gift.updateOne({_id:req.body.idGift},gift).then((result)=>{
        console.log('resultat edit gift',result);
        
      })    }
  }
)

  // 2.etape2:
  order.save();
  // 3.etape3:
  res.status(200).json({
    message: "order added with success",
  
      })
    })


// traitement de get My orders
app.get("/api/allMyOrders/:id", (req, res) => {
  console.log("here in function get my orders");
  // 1.etape1:
  let id =req.params.id;
  Order.find({idClient:id},(err, docs) => {
    if (err) {
      console.log("error in DB ");
    } else {
      // success
  res.status(200).json({
      myOrders:docs
  })
    }
  });
});


// traitement delete order
app.delete("/api/allOrders/:id", (req, res) => {
  console.log("hello in BE to delete order by id");

  //1. recuperation de l'id dans le path
  let id = req.params.id;
  console.log("id order to delete", id);
  // 2. delete
  
 Order.deleteOne({ _id: id }).then((result) => {
    console.log(result);
    if (result) {
      // success
      res.status(200).json({
        message: "order deleted with success",
      });
    }
  });
});



 // traitement de generation pdf 
 app.get("/orders/generateFile/pdf", (req, res) => {
  console.log("here in generate pdf");
  Order.find((err, docs) => {
    User.find((err,doc)=>{
  if (err) {
  console.log("ERROR");
  } else {
  
  const doc = new PDFDocument();
  // Pipe the PDF into a user's file
  doc.pipe(fs.createWriteStream(`backend/pdfs/facture.pdf`));
  // Add the header - https://pspdfkit.com/blog/2019/generate-invoices pdfkit-node/
  doc
  .image("backend/images/logo.jpg.jpg", 50, 45, { width: 50 })
  .fillColor("#444444")
  .fontSize(20)
  .text("Here All Orders", 110, 57)
  .fontSize(10)
  .text("Imm Yasmine Tower", 200, 65, { align: "right" })
  .text("Centre Urbain Nord", 200, 80, { align: "right" }) .moveDown();
  // Create the table - https://www.andronio.me/2017/09/02/pdfkit-tables/
  const table = {
  headers: [
  "idOrder",
  "idClient",
  "idFournisseur",
  "Qty",
 
 
  ],
  rows: [],
  };
  // Add the users to the table


  for (const order of docs) {
    table.rows.push([
   
    order._id,
    order.idClient,
    order.idFornisseur,
    order.Qty,
    ]);
    }
   

 
      
  // Draw the table
  doc.moveDown().table(table, 10, 125, { width: 590 }); // Finalize  the PDF and end the stream
  doc.end();
  res.status(200).json({
  message: "HERE PDF (success)",
  });
  }
  });
})});




// traitement de get My commande
app.get("/api/allMyCommand/:id", (req, res) => {
  console.log("here in function get my command");
  // 1.etape1:
  let id =req.params.id;
  Order.find({idFornisseur:id},(err, docs) => {
    if (err) {
      console.log("error in DB ");
    } else {
      // success
  res.status(200).json({
    myCommandes:docs
  })
    }
  });
});


// traitement create contact
app.post("/api/createMessageContact", (req, res) => {

    let contact = new Contact({
      nom: req.body.nom,
      message: req.body.message,
      email: req.body.email,
     

   
    });
    // 2.etape2:
    contact.save();
    // 3.etape3:
    res.status(200).json({
      message: "contact added with success",
    });
  });
 

// traitement de get all contacts
app.get("/api/allMessageContact", (req, res) => {
  console.log("here in function get all contacts");
  // 1.etape1:
  Contact.find((err, docs) => {
    if (err) {
      console.log("error in DB ");
    } else {
      // success
      res.status(200).json({
        contacts: docs,
      });
    }
  });
});

// traitement delete contact
app.delete("/api/allMessageContacts/:id", (req, res) => {
  console.log("hello in BE to delete contact by id");

  //1. recuperation de l'id dans le path
  let id = req.params.id;
  console.log("id contact to delete", id);
  // 2. delete
  
  Contact.deleteOne({ _id: id }).then((result) => {
    console.log(result);
    if (result) {
      // success
      res.status(200).json({
        message: "contact deleted with success",
      });
    }
  });
});



// traitement de get all orders
app.get("/api/allOrders", (req, res) => {
  console.log("here in function get all orders");
  // 1.etape1:
  Order.find((err, docs) => {
    if (err) {
      console.log("error in DB ");
    } else {
      // success
      res.status(200).json({
        orders: docs,
      });
    }
  });
});




module.exports=app;