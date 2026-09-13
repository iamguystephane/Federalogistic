const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const prisma = require("../prisma")
const { signAdmin } = require("../middleware/auth")
const { sendMail, emailHtml } = require("../config/mail")

async function login(req, res, next) {
  try {
    const { email, password } = req.body
    const admin = await prisma.admin.findUnique({ where: { email } })
    if (!admin) return res.status(401).json({ message: "Invalid admin credentials" })
    const valid = await bcrypt.compare(password, admin.passwordHash)
    if (!valid) return res.status(401).json({ message: "Invalid admin credentials" })
    res.json({ token: signAdmin(), admin: { email: admin.email } })
  } catch (err) {
    next(err)
  }
}

async function forgotPassword(req, res, next) {
  try {
    const admin = await prisma.admin.findUnique({ where: { email: req.body.email } })
    if (!admin) return res.status(404).json({ message: "No admin account found for that email" })

    const token = jwt.sign(
      { email: admin.email, purpose: "reset" },
      process.env.JWT_SECRET || "dev-secret",
      { expiresIn: "1h" },
    )
    const clientUrl = process.env.CLIENT_URL || "http://localhost:3000"
    const resetLink = `${clientUrl}/reset-password?token=${token}`

    const html = emailHtml({
      title: "Password Reset Request",
      preheader: "Reset your admin password",
      body: `
        <p style="margin:0 0 20px;color:#475569;font-size:15px;line-height:1.7;">We received a request to reset the password for your admin account. Click the button below to set a new password. This link expires in <strong>1 hour</strong>.</p>
        <div style="text-align:center;margin:28px 0;">
          <a href="${resetLink}" style="display:inline-block;background:linear-gradient(135deg,#2459d8,#1a3faf);color:#ffffff;font-size:15px;font-weight:700;padding:14px 36px;border-radius:10px;text-decoration:none;">Reset Password</a>
        </div>
        <p style="margin:20px 0 0;color:#94a3b8;font-size:13px;">If you didn't request this, you can safely ignore this email.</p>
      `,
    })

    const sent = await sendMail({ to: admin.email, subject: "Federalogistic — Admin Password Reset", html })
    if (sent) return res.json({ message: "Password reset email sent. Check your inbox." })

    console.log("Reset link:", resetLink)
    res.json({
      message: "SMTP not configured — reset link generated. Check server console.",
      devLink: process.env.NODE_ENV === "production" ? undefined : resetLink,
    })
  } catch (err) {
    next(err)
  }
}

async function resetPassword(req, res, next) {
  try {
    const { token, password } = req.body
    if (!token || !password) return res.status(400).json({ message: "Token and password are required" })
    const payload = jwt.verify(token, process.env.JWT_SECRET || "dev-secret")
    if (payload.purpose !== "reset") return res.status(400).json({ message: "Invalid reset token" })
    const admin = await prisma.admin.findUnique({ where: { email: payload.email } })
    if (!admin) return res.status(404).json({ message: "Admin not found" })
    const passwordHash = await bcrypt.hash(password, 10)
    await prisma.admin.update({ where: { id: admin.id }, data: { passwordHash } })
    res.json({ message: "Password updated successfully." })
  } catch {
    res.status(400).json({ message: "Invalid or expired reset link. Please request a new one." })
  }
}

async function getProfile(req, res, next) {
  try {
    const admin = await prisma.admin.findFirst()
    if (!admin) return res.status(404).json({ message: "Admin not found" })
    res.json({ email: admin.email })
  } catch (err) {
    next(err)
  }
}

async function updateProfile(req, res, next) {
  try {
    const admin = await prisma.admin.findFirst()
    if (!admin) return res.status(404).json({ message: "Admin not found" })
    const updates = {}
    if (req.body.email) updates.email = req.body.email
    if (req.body.password) updates.passwordHash = await bcrypt.hash(req.body.password, 10)
    const updated = await prisma.admin.update({ where: { id: admin.id }, data: updates })
    res.json({ email: updated.email, message: "Profile updated successfully." })
  } catch (err) {
    next(err)
  }
}

async function getSettings(req, res, next) {
  try {
    let settings = await prisma.siteSettings.findUnique({ where: { id: "singleton" } })
    if (!settings) settings = await prisma.siteSettings.create({ data: { id: "singleton" } })
    res.json(settings)
  } catch (err) {
    next(err)
  }
}

async function updateSettings(req, res, next) {
  try {
    const {
      contactPhone, contactEmail, contactAddress, formDestinationEmail,
      socialFacebook, socialX, socialInstagram, socialTiktok,
    } = req.body
    const settings = await prisma.siteSettings.upsert({
      where: { id: "singleton" },
      update: { contactPhone, contactEmail, contactAddress, formDestinationEmail, socialFacebook, socialX, socialInstagram, socialTiktok },
      create: {
        id: "singleton",
        contactPhone: contactPhone || "",
        contactEmail: contactEmail || "",
        contactAddress: contactAddress || "",
        formDestinationEmail: formDestinationEmail || "",
        socialFacebook: socialFacebook || "",
        socialX: socialX || "",
        socialInstagram: socialInstagram || "",
        socialTiktok: socialTiktok || "",
      },
    })
    res.json(settings)
  } catch (err) {
    next(err)
  }
}

async function getPaymentMethods(req, res, next) {
  try {
    const methods = await prisma.paymentMethod.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    })
    res.json(methods)
  } catch (err) {
    next(err)
  }
}

async function createPaymentMethod(req, res, next) {
  try {
    const { name, type, details, isVisible, sortOrder } = req.body
    if (!name || !type) return res.status(400).json({ message: "name and type are required" })
    const method = await prisma.paymentMethod.create({
      data: { name, type, details: details || {}, isVisible: isVisible !== false, sortOrder: sortOrder || 0 },
    })
    res.status(201).json(method)
  } catch (err) {
    next(err)
  }
}

async function updatePaymentMethod(req, res, next) {
  try {
    const { name, type, details, isVisible, sortOrder } = req.body
    const method = await prisma.paymentMethod.update({
      where: { id: req.params.id },
      data: {
        ...(name && { name }),
        ...(type && { type }),
        ...(details !== undefined && { details }),
        ...(isVisible !== undefined && { isVisible }),
        ...(sortOrder !== undefined && { sortOrder }),
      },
    })
    res.json(method)
  } catch (err) {
    next(err)
  }
}

async function deletePaymentMethod(req, res, next) {
  try {
    await prisma.paymentMethod.delete({ where: { id: req.params.id } })
    res.json({ message: "Payment method deleted." })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  login,
  forgotPassword,
  resetPassword,
  getProfile,
  updateProfile,
  getSettings,
  updateSettings,
  getPaymentMethods,
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
}
