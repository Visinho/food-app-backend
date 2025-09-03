import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  // ✅ Make sure req.body exists
  if (!req.body) req.body = {};

  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: "Not authorized, Login again!" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id; 
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export default authMiddleware;

// import jwt from "jsonwebtoken";

// const authMiddleware = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ 
//         success: false, 
//         message: "Not authorized, no token provided" 
//       });
//     }

//     const token = authHeader.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // ✅ Safe: store authenticated user info here
//     req.user = decoded; 

//     next();
//   } catch (error) {
//     console.error("JWT Error:", error);
//     res.status(401).json({ success: false, message: "Invalid or expired token" });
//   }
// };

// export default authMiddleware;
