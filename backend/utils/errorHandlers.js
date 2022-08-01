module.exports.findByIdErrorHandler = (err, res) => {
  if (err.name === 'DocumentNotFoundError') return res.status(404).send('Could not find the document');
  if (err.name === 'CastError') return res.status(404).send(`Invalid ${err.path}: ${err.value}`);
  return res.status(500).send('Internal server error');
};

module.exports.createOrUpdateErrorHandler = (err, res) => {
  if (err.name === 'DocumentNotFoundError') return res.status(404).send('Could not find the document');
  if (err.name === 'ValidatorError') return res.status(400).send(err.message);
  if (err.name === 'ValidationError') {
    const errors = {};

    Object.keys(err.errors).forEach((key) => {
      errors[key] = err.errors[key].message;
    });

    return res.status(400).send(errors);
  }
  return res.status(500).send('Internal server error');
};

module.exports.findAllDocumentsErrorHandler = (err, res) => {
  if (err.name === 'DocumentNotFoundError') return res.status(404).send('Could not find the document');
  return res.status(500).send('Internal server error');
};
