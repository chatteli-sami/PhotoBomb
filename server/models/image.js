import {Schema, model} from 'mongoose';

const ImageSchema = new Schema({
    url:{
        type: String,
        required: [true, "Image URL is required"]
    },
    description: {
        type: String,
        required: [true, "Image description is required"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    albumId:{
        type: Schema.Types.ObjectId,
        ref: 'Album',
    },
    tags:[{
        type: String,
        required: [true, "Tag is required"]
    }],
    favorite:{
        type: Boolean,
        default: false
    }
})

const Image = model('Image', ImageSchema);

export default Image;
