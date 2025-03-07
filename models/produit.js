const mongoose = require('mongoose');

const ProduitManageSchema = new mongoose.Schema({
    nom: String,
    prix: Number,
    stock: Number,
});
const Produit = mongoose.model('Produit', ProduitManageSchema);
