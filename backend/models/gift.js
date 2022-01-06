    const mongoose=require('mongoose');
    const giftSchema = mongoose.Schema({
        name : String,
        category : String,
        occasion : String,
        destinataire : String,
        age: String,
        prix : String,
        idFornisseur : String,
        img: String,
      stock:String,

    
    
    });
    const gift=mongoose.model('Gift',giftSchema);
    module.exports=gift;