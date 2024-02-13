const log = (req, res, next) => {
  console.log({
    url: req.originalUrl,
    method: req.method,
    date: new Date().toLocaleDateString()
  });
  next();
};

export default log;