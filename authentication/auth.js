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
  //get and validate token

  try {
    const token = req.headers?.authorization.split(" ")[1];
    const jwtObject = jwt.verify(token, process.env.JWT_SECRET);
    console.log(jwtObject);
    const isExpired = Date.now() - jwtObject.exp * 1000;
    if (isExpired) {
      res.status(403).json({ message: "Token expired" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default checkToken;
