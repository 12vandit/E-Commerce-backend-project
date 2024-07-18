const {celebrate , Joi} = require("celebrate")

module.exports.createProduct = celebrate({
    body : Joi.object().keys({
        name:Joi.string().required(),
        price:Joi.number().required(),
        category_id:Joi.string().required(),
        Description:Joi.string()
    })
}) 