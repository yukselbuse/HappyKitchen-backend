const express = require("express");
const HK = express();

const bodyParser = require("body-parser");
const path = require("path");
const routes = require("./routes")
const cors = require('cors');


// const adminController = require("./controllers/product/admin");

//buraya front-end kısmıyla ilgili eklrmeler olacak

// const userRoutes = require("./routes/routes");
const adminRoutes = require("./routes/admin");

const sequelize = require("./database");
const Category = require("./model/category");
const Product = require("./model/product");
// const { count } = require("console");



HK.use(bodyParser.urlencoded({ extended: false }));
HK.use(express.static(path.join(__dirname, "public")));

HK.use(routes);
// HK.use(userRoutes);
HK.use("/admin", adminRoutes);

HK.use(cors());

HK.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
  next();
});

HK.use(express.json());
HK.use(express.urlencoded({ extended: true }));


sequelize
  .authenticate()
  .then(() => console.log("baglanti tamam"))
  .catch((err) => console.log(err));

// ilişkilendirme
Product.belongsTo(Category, { foreignkey: { allowNull: false } });
Category.hasMany(Product);

let _user;
sequelize
  .sync()
  .then(() => {
    Category.count().then((count) => {
      if (count === 0) {
        Category.bulkCreate([
          { name: "Çorbalar", imageUrl: "" },
          { name: "Ana Yemekler", imageUrl: "" },
          { name: "Tatlılar", imageUrl: "" },
          { name: "İçecekler", imageUrl: "" },
        ]);
      }
    });
    // Product.bulkCreate([{
    //   name:"yemek",price:10,product_status:"var",imageUrl:"",description:"asdasd"
    // }])
  })
  .catch((err) => console.log(err));

HK.listen(3000, () => console.log("listening on port 3000"));

module.exports = HK;