import Joi from "joi";
const validate = (schema, req, res, next) => {
  const options = {
    abortEarly: true, // jei true, radus klaida, netikrina kitu laukeliu
    stripUnknown: true,
  };
  const { error, value } = schema.validate(req.body, options);

  let message = "";
  console.log(message);
  if (error) {
    switch (error.details[0].path[0]) {
      case "username":
        message = "Neteisingi nurodytas vartotojo vardas";
        break;
      case "email":
        message = "El pastas per trumpas arba neteisingas formatas";
        break;
      case "password":
        message = "per trumpas slaptazodis";
        break;
      case "title":
        message = "Privaloma įrašyti straipsnio pavadinimą";
      default:
        message = "Neteisingai užpildyti laukeliai";
        break;
    }
    return res.status(500).send(message);
  }
  console.log(value);
  req.body = value;
  next();
};

export const postValidator = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(5).max(255).required(),
    category: Joi.string().max(255).allow(""),
    content: Joi.string().max(255).allow(""),
    content_full: Joi.string().allow(""),
    comment_count: Joi.string().max(255).allow(""),
    image: Joi.string().allow(""),
  });

  validate(schema, req, res, next);
};

export const registerValidator = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().min(2).max(50).required(),
    password: Joi.string().min(4).max(12).required(),
  });

  validate(schema, req, res, next);
};

export const loginValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().min(2).max(50).required(),
    password: Joi.string().min(4).max(12).required(),
  });

  validate(schema, req, res, next);
};

export const commentsValidator = (req, res, next) => {
  const schema = Joi.object({
    comment: Joi.string().min(1).max(100).required(),
    postId: Joi.number().required(),
  });

  validate(schema, req, res, next);
};

export default validate;
