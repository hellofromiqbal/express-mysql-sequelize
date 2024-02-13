import sequelize from '../config/sequelize.js';
import { DataTypes } from 'sequelize';

const Product = sequelize.define('Product', {
  // Model attributes are defined here
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.TEXT
  }
});

// `sequelize.define` also returns the model
// console.log(Product === sequelize.models.Product); // true
export default Product;