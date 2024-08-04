import mongoose from 'mongoose';
const AutoIncrement = require('mongoose-sequence')(mongoose);
const { Schema } = mongoose;
const contactSchema = new Schema({
    id: {
        type: Number,
        unique: true,
    },
    namaLengkap: {
        type: String,
        required: true,
        trim: true // Remove leading/trailing whitespace
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate: { // Email validation (optional)
            validator: (value) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value),
            message: 'Please provide a valid email address'
        }
    },
    nomorTelepon: {
        type: String,
        trim: true // Optional, if phone number formatting is not important
    },
    pesan: {
        type: String,
        required: true,
        trim: true
    },
}, {
    timestamps: true,
    versionKey: false
});

// Tambahkan auto-increment plugin ke skema
contactSchema.plugin(AutoIncrement, { id: 'contact_seq', inc_field: 'id' });
const kontakModel = mongoose.models.contacts || mongoose.model('contacts', contactSchema);
export default kontakModel;