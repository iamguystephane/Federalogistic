const { Router } = require("express")
const multer = require("multer")
const { requireAdmin } = require("../middleware/auth")
const { listPayments, updatePayment, submitPayment } = require("../controllers/paymentController")

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } })
const router = Router()

// Admin
router.get("/admin/payments", requireAdmin, listPayments)
router.put("/admin/payments/:id", requireAdmin, updatePayment)

// Public
router.post("/payments", upload.single("proof"), submitPayment)

module.exports = router
