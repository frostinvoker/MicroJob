import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: string,
            unique: true,
            required: true,
            trim: true,
        }
    }
)

export default models.mongoose('Category', CategorySchema);