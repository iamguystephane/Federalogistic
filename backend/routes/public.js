const { Router } = require("express")
const { getPublicSettings, getPublicPaymentMethods, getPublicPaymentMethod, contact } = require("../controllers/publicController")

const router = Router()

router.get("/public/settings", getPublicSettings)
router.get("/public/payment-methods", getPublicPaymentMethods)
router.get("/public/payment-methods/:id", getPublicPaymentMethod)
router.post("/contact", contact)

module.exports = router
