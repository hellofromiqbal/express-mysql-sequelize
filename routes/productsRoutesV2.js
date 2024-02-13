import express from 'express';
import { deleteSingleProduct, getAllProducts, getSingleProduct, postSingleProduct, updateSingleProduct } from '../controllers/productsControllerV2.js';

const router = express.Router();

// GET ALL PRODUCTS
router.get("/", getAllProducts);

// CREATE NEW PRODUCT
router.post("/", postSingleProduct);

// GET SINGLE PRODUCT
router.get("/:id", getSingleProduct);

// UPDATE SINGLE PRODUCT
router.put("/:id", updateSingleProduct);

// DELETE SINGLE PRODUCT
router.delete("/:id", deleteSingleProduct);

export default router;