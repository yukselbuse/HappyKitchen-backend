const express = require("express");
const router = express.Router();

const adminController = require("../controllers/product/admin");

// router.get('/', (req, res) => {
//     res.end('hey naber?');
// });


router.get("/",adminController.getProducts);
router.get(
	"/:product_id",
	// verifyAccessToken,
	// grantAccess('readAny', 'product'),
	// cache.route(),
	adminController.getProductById
);
router.post("/add",adminController.postAddProduct);

router.delete("/:product_id", adminController.postDeleteProduct);

// router.get("/add-product", adminController.getAddProduct);

// router.post("/add-product", adminController.postAddProduct);

module.exports = router;
