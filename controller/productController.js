const { Product } = require("../model/Product");

exports.createproduct = async (req, res) => {
  const product = new Product(req.body);

  try {
    const resp = await product.save();
    console.log(resp);
    res.status(201).send(resp);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.fetchAllProduct = async (req, res) => {
  let q = Product.find({});

  if (req.query.category) {
    q = q.find({ category: req.query.category });
  }
  if (req.query.brand) {
    q = q.find({ brand: req.query.brand });
  }
  if (req.query._sort && req.query._order) {
    q = q.sort({ [req.query._sort]: req.query._order });
  }
  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit; //10
    const page = req.query._page;
    q = q.skip(pageSize * (page - 1)).limit(pageSize);
  }

  try {
    const products = await q.exec();
    if (products && products.length > 0) {
      res.status(201).send({ data: products });
    } else {
      res.status(404).send({ message: "No products found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
