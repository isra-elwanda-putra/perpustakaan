import mongoose from 'mongoose';
const AutoIncrement = require('mongoose-sequence')(mongoose);
const { Schema } = mongoose;
const pengajuanSchema = new Schema({
    id: {
        type: Number,
        unique: true,
    },
    namaLengkap: {
        type: String,
        required: true,
        trim: true // Remove leading/trailing whitespace
    },
    kelas: {
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
    alasanPengajuan: {
        type: String,
        required: true,
        trim: true // Remove leading/trailing whitespace
    },
    tanggalPengajuan: {
        type: Date,
        required: true
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
pengajuanSchema.plugin(AutoIncrement, { id: 'pengajuan_seq', inc_field: 'id' });
const pengajuanModel = mongoose.models.pengajuans || mongoose.model('pengajuans', pengajuanSchema);
export default pengajuanModel;