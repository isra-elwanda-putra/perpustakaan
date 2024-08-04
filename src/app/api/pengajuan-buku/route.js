import dbConnect from '@/utils/mongodb';
import PengajuanModel from '@/models/Pengajuan';

export const GET = async (req) => {
    await dbConnect();

    try {
        const doc = await PengajuanModel.find({
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
        const newPengajuan = new PengajuanModel({
            namaLengkap: body.namaLengkap,
            kelas: body.kelas,
            judulBuku: body.judulBuku,
            penulis: body.penulis,
            alasanPengajuan: body.alasanPengajuan,
            tanggalPengajuan: new Date(body.tanggalPengajuan)
        });
        // Simpan data ke MongoDB
        const doc = await newPengajuan.save();
        console.log(doc);
        return new Response(JSON.stringify({ success: true, data: doc }), { status: 201 });
    } catch (error) {
        console.error('Error saving data:', error.message);
        console.error('Error stack:', error.stack);
        return new Response(JSON.stringify({ success: false }), { status: 400 });
    }
}