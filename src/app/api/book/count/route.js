import dbConnect from '@/utils/mongodb';
import BookModel from '@/models/Books';

export async function GET() {
    try {
        await dbConnect();
        const bookCount = await BookModel.countDocuments();
        return new Response(JSON.stringify({ count: bookCount }), {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500
        });
    }
}
