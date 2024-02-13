import fs from 'fs';
import path from 'path';
import connection from "../config/mysql.js";

export const getAllProducts = (req, res) => {
  connection.query({
    sql: 'SELECT * FROM products'
  }, (error, result) => {
    if(error) {
      return res.status(400).send({
        success: false,
        message: error.message
      });
    } else {
      return res.json({
        success: true,
        products: result
      });
    };
  });
};

export const getSingleProduct = (req, res) => {
  connection.query({
    sql: `SELECT * FROM products WHERE id = ?`,
    values: [req.params.id]
  }, (error, result) => {
    if(error) {
      return res.status(400).send({
        success: false,
        message: error.message
      });
    } else {
      return res.json({
        success: true,
        product: result
      });
    };
  });
};

export const postSingleProduct = (req, res) => {
  const { name, price, stock, status, userId } = req.body;
  if(!name || !price || !stock || !status || !userId) {
    return res.status(400).send({
      success: false,
      message: 'Data needed.'
    });
  };

  const image = req.file;
  if(!image) {
    return res.status(400).send({
      success: false,
      message: 'Image needed.'
    });
  };

  // IMAGE FILE RENAMING
  const rootPath = process.cwd();
  console.log(rootPath);
  const fileTargetPath = path.join(rootPath, '/public/images/', image.originalname);
  console.log(fileTargetPath);
  fs.renameSync(image.path, fileTargetPath);
  console.log(image);

  connection.query({
    sql: `INSERT INTO products (name, price, stock, status, userId, imgUrl) VALUES (?, ?, ?, ?, ?, ?)`,
    values: [
      name,
      parseInt(price),
      parseInt(stock),
      parseInt(status),
      parseInt(userId),
      `http://localhost:3000/public/images/${image.originalname}`
    ]
  }, (error, result) => {
    if(error) {
      return res.status(400).send({
        success: false,
        message: error
      });
    } else {
      return res.json({
        success: true,
        product: result
      });
    };
  });
};

export const putSingleProduct = (req, res) => {
  const { name, price, stock, status, userId } = req.body;
  if(!name || !price || !stock || !status || !userId) {
    return res.status(400).send({
      success: false,
      message: 'Data needed.'
    });
  };

  const image = req.file;
  console.log(image);
  if(!image) {
    return res.status(400).send({
      success: false,
      message: 'Image needed.'
    });
  };

  // IMAGE FILE RENAMING
  const rootPath = process.cwd();
  console.log(rootPath);
  const fileTargetPath = path.join(rootPath, '/public/images/', image.originalname);
  console.log(fileTargetPath);
  fs.renameSync(image.path, fileTargetPath);
  console.log(image);

  connection.query({
    sql: `UPDATE products SET name = ?, price = ?, stock = ?, status = ?, userId = ?, imgUrl = ? WHERE id = ${req.params.id}`,
    values: [
      name,
      parseInt(price),
      parseInt(stock),
      parseInt(status),
      parseInt(userId),
      `http://localhost:3000/public/images/${image.originalname}`
    ]
  }, (error, result) => {
    if(error) {
      return res.status(400).send({
        success: false,
        message: error
      });
    } else {
      return res.json({
        success: true,
        product: result
      });
    };
  });
};

export const deleteSingleProduct = (req, res) => {
  connection.query({
    sql: `DELETE FROM products WHERE id = ?`,
    values: [req.params.id]
  }, (error, result) => {
    if(error) {
      return res.status(400).send({
        success: false,
        message: error.message
      });
    } else {
      return res.json({
        success: true,
        message: 'Deleted successfully.'
      });
    };
  });
};