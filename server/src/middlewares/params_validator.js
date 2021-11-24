// Middleware que valida los esquemas
const { checkSchema, validationResult } = require('express-validator');

const checkValidationResult = (request, _, next) => {
  const errorsResult = validationResult(request);
  if (!errorsResult.isEmpty()) {
    return next('Params validation failed');
  }

  return next();
};

exports.validateSchema = schema => checkSchema(schema);

exports.validateSchemaAndFail = schema => [exports.validateSchema(schema), checkValidationResult];