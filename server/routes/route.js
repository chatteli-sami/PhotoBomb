import { Router } from "express";
import {register, login, logout, checkAuth} from "../controllers/user.controller.js";
import ImageController from "../controllers/image.controller.js";
import AlbumController from "../controllers/album.controller.js";

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/check-auth").get(checkAuth);



// Image routes

router.route("/images/upload").post(ImageController.createImage);
router.route("/images").get(ImageController.getAllImages);
router.route("/images/:id").get(ImageController.getImageById);
router.route("/images/:id/favorite").patch(ImageController.toggleFavorite);
router.route("/images/:id/assign-album").patch(ImageController.assignToAlbum);
router.route("/images/:id/update").patch(ImageController.updateImage);
router.route("/images/:id").delete(ImageController.deleteImage);



// Album routes
router.route("/albums").get(AlbumController.getAllAlbums);
router.route("/albums/create").post(AlbumController.createAlbum);
router.route("/albums/:id/delete").delete(AlbumController.deleteAlbum);
export default router;