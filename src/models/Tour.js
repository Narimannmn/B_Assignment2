const mongoose = require('mongoose');
const Schema = mongoose.Schema
const tourSchema = new Schema({
    country: { type: String, required: true },
    city: { type: String, required: true },
    hotel: { type: String, required: true },
    dateArrival: { type: Date, required: true },
    dateDeparture: { type: Date, required: true },
    adults: { type: Number, required: true },
    children: { type: Number, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: true },
    creationDate: { type: Date, default: Date.now },
    history: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'RequestHistory',
        },
    ],
});

tourSchema.pre('save', async function(next) {
    next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
