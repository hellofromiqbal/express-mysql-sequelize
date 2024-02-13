import Product from '../models/model.js';

export const getAllProducts = async (req, res) => {
  try {
    await Product.sync();
    const result = await Product.findAll();
    res.send(result);
  } catch (error) {
    res.send(error);
  };
};

export const getSingleProduct = async (req, res) => {
  try {
    await Product.sync();
    const { id } = req.params;
    console.log(id);
    const result = await Product.findOne({
      where: { id }
    });
    res.send(result);
  } catch (error) {
    res.send(error);
  };
};

export const postSingleProduct = async (req, res) => {
  try {
    const { name, price, stock, status, userId } = req.body;
    await Product.sync();
    const result = await Product.create({ userId, name, price, stock, status });
    res.send(result);
  } catch (error) {
    res.send(error);
  };
};

export const updateSingleProduct = async (req, res) => {
  try {
    const { userId, name, price, stock, status } = req.body;
    const { id } = req.params;
    await Product.sync();
    const updatedFields = { userId, name, price, stock, status };
    const [numUpdatedRows, updatedProducts] = await Product.update(updatedFields, {
      where: { id }
    });

    if (numUpdatedRows > 0) {
      res.status(200).json({ message: "Product updated successfully", updatedProducts });
    } else {
      res.status(404).json({ message: "Product not found" });
    };
    
    res.send(updatedProduct);
  } catch (error) {
    res.send(error)
  };
};

export const deleteSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.sync();
    await Product.destroy({
      where: { id }
    });
    res.send({ message: "Product deleted successfully!" });
  } catch (error) {
    res.send(error);
  };
};