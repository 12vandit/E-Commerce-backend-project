const { celebrate , Joi} = require("celebrate");

module.exports.createStudent = celebrate({
    body : Joi.object().keys({
        FirstName:Joi.string().required(),
        LastName:Joi.string().required(),
        Email:Joi.string().required(),
        phoneNumber:Joi.number().required(),
        Status:Joi.string().required()
      })
})

module.exports.deleteByid = celebrate({
  body : Joi.object().keys({
    _id:Joi.string().required()
  })
})

module.exports.updateusers = celebrate({
  body : Joi.object().keys({
    _id:Joi.string().required()
  })
})