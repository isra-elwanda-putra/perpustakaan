import dbConnect from '@/utils/mongodb';
import BorrowModel from '@/models/Borrow';
import { NextResponse } from 'next/server';

export async function GET(req) {
    await dbConnect();
    const { pathname } = new URL(req.url);
    const id = pathname.split('/').pop();
    try {
        const item = await BorrowModel.findById(id);
        if (!item) {
            return new NextResponse(JSON.stringify({ success: false, message: 'Item not found' }), { status: 404 });
        }
        return new NextResponse(JSON.stringify({ success: true, data: item }), { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify({ success: false, message: error.message }), { status: 400 });
    }
}

// export async function PUT(req, { params }) {
//     const { id } = params;
//     const body = await req.json();

//     await dbConnect();

//     try {
//         const item = await Item.findByIdAndUpdate(id, body, {
//             new: true,
//             runValidators: true,
//         });
//         if (!item) {
//             return new Response(JSON.stringify({ success: false, message: 'Item not found' }), { status: 404 });
//         }
//         return new Response(JSON.stringify({ success: true, data: item }), { status: 200 });
//     } catch (error) {
//         return new Response(JSON.stringify({ success: false, message: error.message }), { status: 400 });
//     }
// }
export const PUT = async (req) => {
    await dbConnect();
    const { pathname } = new URL(req.url);
    const id = pathname.split('/').pop();
    try {
        const updates = await req.json();
        const updatedBook = await BorrowModel.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedBook) {
            return new NextResponse(JSON.stringify({ success: false, message: 'Book not found' }), {
                headers: { 'Content-Type': 'application/json' },
                status: 404
            });
        }
        return new NextResponse(JSON.stringify({ success: true, data: updatedBook, message: 'Book updated successfully' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ success: false, message: error.message }), {
            headers: { 'Content-Type': 'application/json' },
            status: 400
        });
    }
}

// const handler = async (req, res) => {
//     await dbConnect();
//     const { id } = req.query;
//     switch (req.method) {
//         case 'DELETE':
//             try {
//                 const doc = await BorrowModel.findByIdAndDelete(id);

//                 if (doc) {
//                     return res.status(200).json({ success: true, data: doc, message: 'Document deleted successfully' });
//                 } else {
//                     return res.status(404).json({ success: false, message: 'Document not found' });
//                 }
//             } catch (error) {
//                 return res.status(400).json({ success: false, message: error.message });
//             }
//         case 'PATCH':
//             try {
//                 const updates = req.body; // Assuming the updates are sent in the request body
//                 const doc = await BorrowModel.findByIdAndUpdate(id, updates, { new: true });

//                 if (doc) {
//                     return res.status(200).json({ success: true, data: doc, message: 'Document updated successfully' });
//                 } else {
//                     return res.status(404).json({ success: false, message: 'Document not found' });
//                 }
//             } catch (error) {
//                 return res.status(400).json({ success: false, message: error.message });
//             }
//         default:
//             res.setHeader('Allow', ['DELETE', 'PATCH']);
//             return res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// };

export const DELETE = async (req) => {
    await dbConnect();
    const { pathname } = new URL(req.url);
    const id = pathname.split('/').pop();
    try {
        const deletedDoc = await BorrowModel.findByIdAndDelete(id);
        if (deletedDoc) {
            return NextResponse.json({ success: true, data: deletedDoc, message: 'Document deleted successfully' });
        } else {
            return NextResponse.json({ success: false, message: 'Document not found' }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
}