import Image from "../models/image.js";


const ImageController = {
    createImage: async (req, res) => {
        try{
            const image = await Image.create(req.body);
            res.status(201).json({image, msg : "Image created successfully"});
        }catch(err){
            console.error("Error creating image:", err);
            res.status(500).json({error: "Failed to create image"});
        }
    },

    getAllImages: async (req, res) => {
        try {
            const images = await Image.find().populate('albumId', 'title').sort({ createdAt: -1 });
            res.status(200).json(images);
        } catch (err) {
            console.error("Error fetching images:", err);
            res.status(500).json({ error: "Failed to fetch images" });
        }
    },

    getImageById: async (req, res) => {
        try {
            const image = await Image.findById(req.params.id).populate('albumId', 'title');
            if (!image) {
                return res.status(404).json({ error: "Image not found" });
            }
            res.status(200).json(image);
        } catch (err) {
            console.error("Error fetching image:", err);
            res.status(500).json({ error: "Failed to fetch image" });
        }
    },

    toggleFavorite: async (req, res) => {
        try {
            const image = await Image.findById(req.params.id);
            if (!image) {
                return res.status(404).json({ error: "Image not found" });
            }

            image.isFavorite = !image.isFavorite;
            await image.save();

            res.status(200).json({ msg: "Image favorite status updated", image });
        } catch (err) {
            console.error("Error toggling favorite:", err);
            res.status(500).json({ error: "Failed to update favorite status" });
        }
    },

    deleteImage: async (req, res) => {
        try {
            const image = await Image.findByIdAndDelete(req.params.id);
            if (!image) {
                return res.status(404).json({ error: "Image not found" });
            }
            res.status(200).json({ msg: "Image deleted successfully" });
        } catch (err) {
            console.error("Error deleting image:", err);
            res.status(500).json({ error: "Failed to delete image" });
        }
    },

    assignToAlbum: async (req, res) => {
        try {
          const imageId = req.params.id; // Extract from URL path
          const { albumId } = req.body;
      
          const image = await Image.findById(imageId);
          if (!image) {
            return res.status(404).json({ error: "Image not found" });
          }
      
          image.album = albumId; // Field name should match schema (likely `album`)
          await image.save();
      
          res.status(200).json({ message: "Image assigned to album", image });
        } catch (err) {
          console.error("Error assigning image to album:", err);
          res.status(500).json({ error: "Failed to assign image to album" });
        }
      },

      updateImage: async (req, res) => {
        try {
          const { id } = req.params;
          const updateData = req.body;
      
          // Optional: Validate input data here if needed
      
          const updatedImage = await Image.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
          });
      
          if (!updatedImage) {
            return res.status(404).json({ error: "Image not found" });
          }
      
          return res.status(200).json({
            image: updatedImage,
            message: "Image updated successfully",
          });
        } catch (error) {
          console.error("Error updating image:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      }
}

export default ImageController;