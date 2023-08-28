const Joi = require("joi")


Schema = Joi.object({
  name: Joi.string().required(),
  price: Joi.string().required(),
  imageUrl: Joi.string(),
  description: Joi.string(),
  categoryId: Joi.string(),
  product_type: Joi.string().required(),
  
});

module.exports = Schema