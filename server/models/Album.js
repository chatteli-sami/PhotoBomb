import { Schema, model } from "mongoose";

const AlbumSchema = new Schema({
    title:{
        type: String,
        required: [true, "Album title is required"]
    },
    description: {
        type: String,
        required: [true, "Album description is required"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

    images:[{
        type: Schema.Types.ObjectId,
        ref: 'Image',
    }],
    owner:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
})

const Album = model('Album', AlbumSchema);
export default Album;