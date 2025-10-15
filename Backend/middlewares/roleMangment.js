const jwt = require("jsonwebtoken");
const db = require("../database/connectionDB");

module.exports = async (req, res, next) => {

  const authHeader = req.headers.authorization;
  
  const token = authHeader.split(" ")[1].trim();
  
  try {
    const decoded = jwt.verify(token, process.env.token);
    const r = await db.execute("select * from users where id_user=?", [
      decoded.id,
    ]);
    if (r[0][0].user_role !== "admin") {
      return res.status(401).send({ msg: "not authorized" });
    }
    req.user = r[0][0];
    next();
  } catch (error) {
    return res.status(401).send({ msg: "invalid token" });
  }
};
