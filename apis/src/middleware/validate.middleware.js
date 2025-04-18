module.exports = (schema) => {
    return (req, res, next) => {
      try {
        req.body = schema.parse(req.body); // Validate and transform the body
        next(); // If valid, move on
      } catch (err) {
        return res.status(400).json({
          message: 'Validation failed',
          errors: err.errors, // Zod gives detailed field-level errors
        });
      }
    };
  };
  