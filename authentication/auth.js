import jwt from "jsonwebtoken";
const checkToken = (req, res, next) => {
  //bypass login, register user
  if (
    req.url.toLowerCase().trim() == "/users/login".toLocaleLowerCase().trim() ||
    req.url.toLowerCase().trim() == "/users/register".toLocaleLowerCase().trim()
  ) {
    next();
    return;
  }

  try {
    const token = req.headers?.authorization?.split("Bearer")[1].trim(); 
    const jwtObject = jwt.verify(token, process.env.JWT_SECRET);

    const isExpired = Date.now() >= jwtObject.exp * 1000;
    if (isExpired) {
      res.status(403).json({ message: "Token expired" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default checkToken;
