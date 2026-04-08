// Basic role-based middleware
function authorize(role) {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      return next();
    }
    return res.status(403).json({ message: 'Forbidden: insufficient role' });
  };
}

module.exports = { authorize };
