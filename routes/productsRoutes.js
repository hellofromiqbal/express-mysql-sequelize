import express from 'express';
import multer from 'multer';
import {
  getAllProducts,
  getSingleProduct,
  postSingleProduct,
  putSingleProduct,
  deleteSingleProduct
} from '../controllers/productsController.js';

const router = express.Router();
const upload = multer({ dest: 'public/images/' });

// GET ALL PRODUCTS
router.get('/', getAllProducts);

// POST SINGLE PRODUCT
router.post('/', upload.single('image'), postSingleProduct);

// GET SINGLE PRODUCT
router.get('/:id', getSingleProduct);

// PUT SINGLE PRODUCT
router.put('/:id', upload.single('image'), putSingleProduct);

// DELETE SINGLE PRODUCT
router.delete('/:id', deleteSingleProduct);
export default router;