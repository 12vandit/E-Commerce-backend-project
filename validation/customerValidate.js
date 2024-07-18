const {celebrate , Joi} = require("celebrate");

module.exports.createCustmer = celebrate({
    body : Joi.object().keys({
        fname:Joi.string().required(),
        lastName:Joi.string().required(),
        dob:Joi.string().required(),
        gender:Joi.string().required(),
        Address:Joi.string().required(),
        email:Joi.string().required(),
        mobileNo:Joi.number().required(),
        password:Joi.string().required(),
        status:Joi.boolean().required()
    })
}) 
