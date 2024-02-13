import express from 'express';
// import productsRoutes from './routes/productsRoutes.js';
import productsRoutesV2 from './routes/productsRoutesV2.js';
import logger from 'morgan';
import morgan from 'morgan';
import connection from './config/mysql.js';

const app = express();

app.use(logger('dev'));
app.use(express.json());

// app.use('/products', productsRoutes);
app.use('/products', productsRoutesV2);

app.get('/', (req, res) => {
  return res.send({
    success: true,
    message: `Main route`
  });
});

app.use((req, res) => {
  return res.status(404).json({
    url: req.originalUrl,
    method: req.method,
    date: new Date().toLocaleDateString(),
    message: '404 Not Found.'
  });
});

app.listen(3000, () => {
  connection.connect();
  console.log(`App is listening on port http://localhost:3000`);
});