import dbConnect from '@/utils/mongodb';
import KontakModel from '@/models/Kontak';

export async function GET(req, { params }) {
    const { id } = params;

    await dbConnect();

    try {
        const item = await Item.findById(id);
        if (!item) {
            return new Response(JSON.stringify({ success: false, message: 'Item not found' }), { status: 404 });
        }
        return new Response(JSON.stringify({ success: true, data: item }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, message: error.message }), { status: 400 });
    }
}

export async function PUT(req, { params }) {
    const { id } = params;
    const body = await req.json();

    await dbConnect();

    try {
        const item = await Item.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });
        if (!item) {
            return new Response(JSON.stringify({ success: false, message: 'Item not found' }), { status: 404 });
        }
        return new Response(JSON.stringify({ success: true, data: item }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, message: error.message }), { status: 400 });
    }
}

export const updateContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.query.id, req.body, { new: true });
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ message: 'Error updating contact' });
    }
};
export const DELETE = async (req) => {
    const { id } = req.query;
    await dbConnect();
    try {
        const doc = await KontakModel.findByIdAndDelete(id);

        if (doc) {
            return new Response(JSON.stringify({ success: true, data: doc, message: 'Document deleted successfully' }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ success: false, message: 'Document not found' }), { status: 404 });
        }
    } catch (error) {
        return new Response(JSON.stringify({ success: false, message: error.message }), { status: 400 });
    }
};