const catchAsyncError = (errorFunction) => (req, res, next) => {
  Promise.resolve(errorFunction(req, res, next)).catch(next);
};

export default catchAsyncError;
