const jwt = require("jsonwebtoken")

function signAdmin() {
  return jwt.sign({ role: "admin" }, process.env.JWT_SECRET || "dev-secret", { expiresIn: "8h" })
}

function requireAdmin(req, res, next) {
  const header = req.headers.authorization || ""
  const token = header.startsWith("Bearer ") ? header.slice(7) : null
  if (!token) return res.status(401).json({ message: "Missing admin token" })

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "dev-secret")
    if (payload.role !== "admin") throw new Error("Invalid role")
    next()
  } catch {
    res.status(401).json({ message: "Invalid or expired admin token" })
  }
}

module.exports = { signAdmin, requireAdmin }
