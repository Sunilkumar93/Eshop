const getAllProducts = (req, res, next) => {
  res.send({ error: false, message: "all products" });
};

module.exports = { getAllProducts };
