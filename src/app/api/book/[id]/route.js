import dbConnect from '@/utils/mongodb';
import BookModel from '@/models/Books';
import { NextResponse } from 'next/server';

export async function GET(req) {
    await dbConnect();
    const { pathname } = new URL(req.url);
    const id = pathname.split('/').pop();
    try {
        const item = await BookModel.findById(id);
        if (!item) {
            return new NextResponse(JSON.stringify({ success: false, message: 'Item not found' }), { status: 404 });
        }
        return new NextResponse(JSON.stringify({ success: true, data: item }), { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify({ success: false, message: error.message }), { status: 400 });
    }
}
export const PUT = async (req) => {
    await dbConnect();
    const { pathname } = new URL(req.url);
    const id = pathname.split('/').pop();
    try {
        const updates = await req.json();
        const updatedBook = await BookModel.findByIdAndUpdate(id, updates, { new: true });
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

export const DELETE = async (req) => {
    await dbConnect();
    const { pathname } = new URL(req.url);
    const id = pathname.split('/').pop();
    try {
        const deletedDoc = await BookModel.findByIdAndDelete(id);
        if (deletedDoc) {
            return NextResponse.json({ success: true, data: deletedDoc, message: 'Document deleted successfully' });
        } else {
            return NextResponse.json({ success: false, message: 'Document not found' }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
}