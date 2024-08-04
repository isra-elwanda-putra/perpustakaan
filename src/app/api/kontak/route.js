import dbConnect from '@/utils/mongodb';
import KontakModel from '@/models/Kontak';

export const GET = async (req) => {
    await dbConnect();

    try {
        // Buat instance baru dari model Contact
        // const newContact = new ContactModel({
        //     namaLengkap: namaLengkap,
        //     email: email,
        //     nomorTelepon: nomorTelepon,
        // });
        // await newContact.find();
        const data = await KontakModel.find({
            $or: [
                { namaLengkap: new RegExp(req.query, 'i') },
                { pesan: new RegExp(req.query, 'i') },
                // tambahkan kondisi pencarian lainnya
            ],
        });
        return new Response(JSON.stringify({ success: true, data: data }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ success: false }), { status: 400 });
    }
}
export const POST = async (req) => {
    const body = await req.json();

    await dbConnect();

    try {
        // Buat instance baru dari model Contact
        const newKontak = new KontakModel(body);
        // Simpan data ke MongoDB
        const doc = await newKontak.save();
        return new Response(JSON.stringify({ success: true, data: doc }), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ success: false }), { status: 400 });
    }
}