// Basic authorization middleware
function protect(req, res, next) {
  // Example: check if user is authenticated (customize as needed)
  if (req.user) {
    return next();
  }
  return res.status(401).json({ message: 'Not authorized' });
}

module.exports = { protect };
