    const mongoose=require('mongoose');
    const orderSchema = mongoose.Schema({
        idClient : String,
        idGift : String,
        Qty:String,
        idFornisseur:String,
        commentaire:String,
        prix:String,

    
    
    
    });
    const order=mongoose.model('Order',orderSchema);
    module.exports=order;