const { Router } = require("express")
const { requireAdmin } = require("../middleware/auth")
const {
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
} = require("../controllers/adminController")

const router = Router()

router.post("/admin/login", login)
router.post("/admin/forgot-password", forgotPassword)
router.post("/admin/reset-password", resetPassword)

router.get("/admin/profile", requireAdmin, getProfile)
router.put("/admin/profile", requireAdmin, updateProfile)

router.get("/admin/settings", requireAdmin, getSettings)
router.put("/admin/settings", requireAdmin, updateSettings)

router.get("/admin/payment-methods", requireAdmin, getPaymentMethods)
router.post("/admin/payment-methods", requireAdmin, createPaymentMethod)
router.put("/admin/payment-methods/:id", requireAdmin, updatePaymentMethod)
router.delete("/admin/payment-methods/:id", requireAdmin, deletePaymentMethod)

module.exports = router
