import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            maxlength: 100,
            required: true
        },
        description: {
            type: String,
            maxlength: 300,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ['Available', 'In Progress', 'Completed', 'Cancelled'],
            default: 'Available',
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
        },
        jobPoster:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        applicants: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
        selectedApplicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
        },
    },
    { timestamps: true, versionKey: false }
)

export default mongoose.model('Job', JobSchema);