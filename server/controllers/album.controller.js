import Album from "../models/Album.js";
import mongoose from "mongoose";

const AlbumController =  {

    createAlbum: async (req, res) => {
        try {
            console.log('Incoming Album Data:', req.body);
            if (mongoose.connection.readyState !== 1) {
                console.error("MongoDB not connected 🛑");
                return res.status(500).json({ error: "Database connection not ready" });
            }
            const album = await Album.create(req.body);
            res.status(201).json(album);
        } catch (err) {
            console.error("Error creating album:", err);
            res.status(500).json({ error: "Failed to create album" });
        }
    },

    getAllAlbums: async (req, res) => {
        try {
            const albums = await Album.find().populate('owner','images').sort({ createdAt: -1 });
            res.status(200).json(albums);
        } catch (err) {
            console.error("Error fetching albums:", err);
            res.status(500).json({ error: "Failed to fetch albums" });
        }
    },

    deleteAlbum: async (req, res) => {
        try {
            const { id } = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: "Invalid album ID" });
            }

            const deletedAlbum = await Album.findByIdAndDelete(id);
            if (!deletedAlbum) {
                return res.status(404).json({ error: "Album not found" });
            }

            res.status(200).json({ message: "Album deleted", album: deletedAlbum });
        } catch (err) {
            console.error("Error deleting album:", err);
            res.status(500).json({ error: "Failed to delete album" });
        }
    }
}

export default AlbumController;
