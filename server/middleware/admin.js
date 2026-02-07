const requireAdmin = (req, res, next) => {
  const role = req.user?.role;
  if (role === 'superadmin') {
    return next();
  }
  return res.status(403).json({ message: 'Super admin access required.' });
};

export default requireAdmin;
