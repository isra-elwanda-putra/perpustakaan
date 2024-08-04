import dbConnect from '@/utils/mongodb';
import BookModel from '@/models/Books';
import { NextResponse } from 'next/server';

export const GET = async (req) => {
    await dbConnect();

    try {
        const doc = await BookModel.find({
            $or: [
                { judulBuku: new RegExp(req.query, 'i') },
                { seriBuku: new RegExp(req.query, 'i') },
                // tambahkan kondisi pencarian lainnya
            ],
        });
        return new Response(JSON.stringify({ success: true, data: doc }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ success: false }), { status: 400 });
    }
}


export const POST = async (req) => {
    try {
        // Parse the request body
        const body = await req.json();
        console.log('Request Body:', body);

        // Connect to the database
        await dbConnect();

        // Validate data
        if (!body.judulBuku || !body.image || !body.penulis) {
            return new NextResponse(
                JSON.stringify({ success: false, message: 'Data tidak lengkap' }),
                { status: 400 }
            );
        }

        // Create a new book item
        const item = await BookModel.create(body);

        // Return success response
        return new NextResponse(
            JSON.stringify({ success: true, data: item }),
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating book:', error);
        return new NextResponse(
            JSON.stringify({ success: false, message: 'Terjadi kesalahan saat memproses data' }),
            { status: 500 }
        );
    }
};
