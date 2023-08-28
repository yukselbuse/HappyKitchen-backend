const Product = require("../../model/product"); // değişecek
const Category = require("../../model/category");
const { result } = require("underscore");

const Boom = require("boom");

const ProductSchema = require("./validations");
const { where } = require("sequelize");

exports.getProducts = async (req, res, next) => {
  // Product.findAll()
  //   .then((products) => {
  //     // res.render({
  //     //   title: "Admin Products",
  //     //   products: products,
  //     //   path: "/admin/products",
  //     //   action: req.query.action,
  //     // });
      
  //     // let product = products.toString();
  //     res.json(product)

  //   })
  //   .catch((err) => console.log(err));

  
  // const input = req.body;
  // const { error } = ProductSchema.validate(input);


  // if(error){
  //   return next(Boom.badRequest(error.details[0].message));

  // }


  // const { product_id } = req.params;

  // console.log(product_id);

	// if (!product_id) {
	// 	return next(Boom.badRequest("Missing paramter (:product_id)"));
	// }

  try {
    const product = await Product.findAll();

    res.json(product);
  } catch (e) {
    next(e);
  }
};

exports.getProductById = async (req, res, next) => {
	const { product_id } = req.params;

  console.log(product_id);

	if (!product_id) {
		return next(Boom.badRequest("Missing paramter (:product_id)"));
	}

	try {
		const product = await Product.findAll({
      where:{id:product_id}
    });

		res.json(product);
	} catch (e) {
		next(e);
	}
};




exports.getAddProduct = (req, res, next) => {
  Category.findAll()
    .then((categories) => {
      res.render("admin/html", {
        title: "New Product",
        path: "/admin/html",
        categories: categories,
      });
    })
    .catch((err) => console.log(err));
};

exports.postAddProduct = async (req, res, next) => {
  // const name = req.body.name;
  // const price = req.body.price;
  // const imageUrl = req.body.imageUrl;
  // const description = req.body.description;
  // const categoryid = req.body.categoryid;
  // const product_status = req.body.product_status;
  // const user = req.user;


  const input = req.body;
	const { error } = ProductSchema.validate(input);

	if (error) {
		return next(Boom.badRequest(error.details[0].message));
	}

	try {
    input.imageUrl = JSON.parse(input.imageUrl);


		const product = new Product(input);
		const savedData = await product.save();

		res.json(savedData);
	} catch (e) {
		next(e);
	}


  // user
  //   .createProduct({
  //     name: name,
  //     price: price,
  //     imageUrl: imageUrl,
  //     description: description,
  //     categoryid: categoryid,
  //     product_status: product_status,
  //   })
  //   .then(() => {
  //     res.redirect("/");
  //   })
  //   .catch((err) => console.log(err));

  
};


exports.getEditProduct = (req, res, next) => {
  Product.findByPk(req.params.productid)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      Category.findAll()
        .then((categories) => {
          res.render("admin/html", {
            title: "Edit Product",
            path: "/admin/products",
            product: product,
            categories: categories,
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const id = req.body.id;
  const name = req.body.name;
  const price = req.body.price;
  const description = req.body.description;
  const categoryid = req.body.categoryid;
  const product_status = res.body.product_status;

  Product.findByPk(id)
    .then((product) => {
      product.name = name;
      product.price = price;
      product.description = description;
      product.categoryId = categoryid;
      product.product_status = product_status;
      return product.save();
    })
    .then((result) => {
      console.log("updated");
      res.redirect("/admin/product?action=edit");
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = async (req, res, next) => {
  // const id = req.body.productid;
  // Product.findByPk(id)
  //   .then((product) => {
  //     return product.destroy();
  //   })
  //   .then((result) => {
  //     console.log("product has been deleted");
  //     res.redirect("/admin/product?action=delete");
  //   })
  //   .catch((err) => console.log(err));


  const { product_id } = req.params;

	try {
		const deleted = await Product.destroy({
      where:{
        id:product_id
      }
    });

		if (!deleted) {
			throw Boom.badRequest("Product not found.");
		}

		res.json(deleted);
	} catch (e) {
		next(e);
	}
};
