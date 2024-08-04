import mongoose from 'mongoose';
const AutoIncrement = require('mongoose-sequence')(mongoose);
const { Schema } = mongoose;
const bookSchema = new Schema({
    judulBuku: {
        type: String,
    },
    image: {
        type: String,
    },
    penulis: {
        type: String,
    },
}, {
    timestamps: false,
    versionKey: false
});
const bookModel = mongoose.models.books || mongoose.model('books', bookSchema);
export default bookModel;