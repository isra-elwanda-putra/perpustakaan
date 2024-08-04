import dbConnect from '@/utils/mongodb';
import BorrowModel from '@/models/Borrow';

export const GET = async (req) => {
    await dbConnect();

    try {
        const doc = await BorrowModel.find({
            $or: [
                { namaLengkap: new RegExp(req.query, 'i') },
                { judulBuku: new RegExp(req.query, 'i') },
                { penulis: new RegExp(req.query, 'i') },
                { kelas: new RegExp(req.query, 'i') },
                { status: new RegExp(req.query, 'i') },
                // tambahkan kondisi pencarian lainnya
            ],
        });
        return new Response(JSON.stringify({ success: true, data: doc }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ success: false }), { status: 400 });
    }
}

export const POST = async (req) => {
    const body = await req.json();
    console.log(body);
    await dbConnect();
    console.log('Database connected successfully.');

    try {
        // Buat instance baru dari model Contact
        const newBorrow = new BorrowModel({
            namaLengkap: body.namaLengkap,
            judulBuku: body.judulBuku,
            penulis: body.penulis,
            kelas: body.kelas,
            nomorTelepon: body.nomorTelepon,
            tanggalPeminjaman: new Date(body.tanggalPeminjaman),
            tanggalPengembalian: new Date(new Date(body.tanggalPeminjaman).getTime() + 7 * 24 * 60 * 60 * 1000),
            status: "Dipinjam"
        });
        // Simpan data ke MongoDB
        const doc = await newBorrow.save();
        console.log(doc);
        return new Response(JSON.stringify({ success: true, data: doc }), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ success: false }), { status: 400 });
    }
}