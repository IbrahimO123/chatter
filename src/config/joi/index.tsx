import Joi from "joi";

export const schema = Joi.object({
  firstname: Joi.string()
    .min(3)
    .message("Name must be at least 3 characters long")
    .max(30)
    .message("Name must be at most 30 characters long")
    .required()
    .pattern(new RegExp(/^\S+$/))
    .message("Field must not contain spaces"),
  lastname: Joi.string()
    .required()
    .min(3)
    .message("Name must be at least 3 characters long")
    .max(30)
    .message("Name must be at most 30 characters long")
    .pattern(new RegExp(/^\S+$/))
    .message("Field must not contain spaces"),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .message("Invalid email address")
    .custom((value) => value.trim())
    .pattern(new RegExp(/^\S+$/))
    .message("Field must not contain spaces")
    .required(),
  phoneNumber: Joi.string()
    .required()
    .custom((value) => value.trim())
    .max(30)
    .min(11)
    .pattern(new RegExp(/^\S+$/))
    .message("Field must not contain spaces"),
  password: Joi.string()
    .min(6)
    .message("Password must be have at least six characters")
    .max(15)
    .message("Password must not contain more than 15 caharcaters")
    .required()
    .pattern(new RegExp(/^\S+$/))
    .message("Field must not contain spaces"),
  confirmPassword: Joi.valid(Joi.ref("password")).required().messages({
    "any.only": "Password does not match",
  }),
  dateCreated: Joi.string().required(),
  timeCreated: Joi.string().required(),
  isAuthorised: Joi.boolean().required(),
  isLoggedIn: Joi.boolean().required(),
  isRegistered: Joi.boolean().required(),
  profileImageUrl: Joi.string().allow("", null),
  facebookHandle: Joi.string().allow("", null),
  twitterHandle: Joi.string().allow("", null),
  linkedInHandle: Joi.string().allow("", null),
});

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .message("Invalid email address")
    .custom((value) => value.trim())
    .pattern(new RegExp(/^\S+$/))
    .message("Field must not contain spaces")
    .required(),
  password: Joi.string()
    .min(6)
    .message("Password must be have at least six characters")
    .max(15)
    .message("Password must not contain more than 15 caharcaters")
    .required()
    .pattern(new RegExp(/^\S+$/))
    .message("Field must not contain spaces"),
});

export const updateUserSchema = Joi.object({
  firstname: Joi.string()
    .min(3)
    .message("Name must be at least 3 characters long")
    .max(30)
    .message("Name must be at most 30 characters long")
    .required()
    .pattern(new RegExp(/^\S+$/))
    .message("Field must not contain spaces"),
  lastname: Joi.string()
    .required()
    .min(3)
    .message("Name must be at least 3 characters long")
    .max(30)
    .message("Name must be at most 30 characters long")
    .pattern(new RegExp(/^\S+$/))
    .message("Field must not contain spaces"),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .message("Invalid email address")
    .custom((value) => value.trim())
    .pattern(new RegExp(/^\S+$/))
    .message("Field must not contain spaces")
    .required(),
  phoneNumber: Joi.string()
    .required()
    .custom((value) => value.trim())
    .max(30)
    .min(11)
    .pattern(new RegExp(/^\S+$/))
    .message("Field must not contain spaces"),
  facebookHandle: Joi.string().allow(""),
  twitterHandle: Joi.string().allow(""),
  linkedInHandle: Joi.string().allow(""),
});
