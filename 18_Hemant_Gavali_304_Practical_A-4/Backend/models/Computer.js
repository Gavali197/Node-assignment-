const mongoose = require('mongoose');

const computerSchema = new mongoose.Schema({
    compId: { type: String, required: true, unique: true },
    modelName: { type: String, required: true },
    computerType: { type: String, enum: ['Assembled', 'Branded'], required: true },
    brand: { type: String, required: true },
    processor: { type: String, required: true },
    ram: { type: String, required: true },
    price: { type: Number, required: true },
    purchaseDate: { type: Date, required: true },
    stockStatus: { type: String, required: true }
});

module.exports = mongoose.model('Computer', computerSchema);