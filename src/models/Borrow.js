import mongoose from 'mongoose';
const AutoIncrement = require('mongoose-sequence')(mongoose);
const { Schema } = mongoose;
const borrowSchema = new Schema({
    id: {
        type: Number,
        unique: true,
    },
    namaLengkap: {
        type: String,
        required: true,
        trim: true // Remove leading/trailing whitespace
    },
    judulBuku: {
        type: String,
        required: true,
        trim: true // Remove leading/trailing whitespace
    },
    penulis: {
        type: String,
        required: true,
        trim: true // Remove leading/trailing whitespace
    },
    kelas: {
        type: String,
        required: true,
        trim: true // Remove leading/trailing whitespace
    },
    nomorTelepon: {
        type: String,
        required: true,
        trim: true // Remove leading/trailing whitespace
    },
    tanggalPeminjaman: {
        type: Date,
        required: true
    },
    tanggalPengembalian: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true,
        trim: true // Remove leading/trailing whitespace
    },
}, {
    timestamps: true,
    versionKey: false
});

// Tambahkan hook pre-save untuk menghitung tanggalPengembalian
// borrowSchema.pre('save', function (next) {
//     if (this.isNew || this.isModified('tanggalPeminjaman')) {
//         this.tanggalPengembalian = new Date(this.tanggalPeminjaman.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days later
//     }
//     next();
// });

// Tambahkan auto-increment plugin ke skema
borrowSchema.plugin(AutoIncrement, { id: 'borrow_seq', inc_field: 'id' });
const borrowModel = mongoose.models.borrows || mongoose.model('borrows', borrowSchema);
export default borrowModel;