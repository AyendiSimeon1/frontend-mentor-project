const Joi = require('joi');

const noteValidator = {
    createNote: Joi.object({
        title: Joi.string()
            .required()
            .min(1)
            .max(200)
            .trim(),
        tags: Joi.array()
            .items(Joi.string().trim())
            .optional(),
        content: Joi.string()
            .required()
            .min(1)
            .trim(),
        isArchived: Joi.boolean()
            .optional()
    }),
    updateNote: Joi.object({
        title: Joi.string()
          .min(1)
          .max(200)
          .trim()
          .optional(),
        tags: Joi.array()
          .items(Joi.string().trim())
          .optional(),
        content: Joi.string()
          .min(1)
          .trim()
          .optional(),
        isArchived: Joi.boolean()
          .optional()
      }),
    
      validateId: Joi.object({
        id: Joi.string()
          .required()
          .pattern(/^[0-9a-fA-F]{24}$/)
          .messages({
            'string.pattern.base': 'Invalid MongoDB ObjectId format'
          })
      })
};

module.exports = noteValidator;