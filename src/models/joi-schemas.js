import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
  isAdmin: Joi.boolean().example("true"),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArraySpec = Joi.array().items(UserSpecPlus).label("UserArray");

export const PlaceMarkSpec = Joi.object()
    .keys({
        name: Joi.string().example("Cinema").required(),
        description: Joi.string().example("Watch Movies").required(),
        latitude: Joi.number().example(12.214124).required(),
        longitude: Joi.number().example(12.214124).required(),
    }).label("Placemark");

export const PlacemarkSpecPlus = PlaceMarkSpec.keys({
    categoryid: IdSpec,
    _id: IdSpec,
    __v: Joi.number(),
}).label("PlacemarkDetailsPlus")

export const PlacemarkArraySpec = Joi.array().items(PlacemarkSpecPlus).label("PlacemarkArray");

export const CategorySpec = Joi.object()
    .keys({
        title: Joi.string().example("Entertainment").required(),
        placemarks: PlacemarkArraySpec,
    })

export const CategorySpecPlus = CategorySpec.keys({
    _id: IdSpec,
    __v: Joi.number(),
}).label("CategoryDetailsPlus")

export const CategoryArraySpec = Joi.array().items(CategorySpecPlus).label("CategoryArray");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");
