const { Router } = require("express")
const multer = require("multer")
const { requireAdmin } = require("../middleware/auth")
const { listShipments, createShipment, updateShipment, patchProgress, trackShipment } = require("../controllers/shipmentController")

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } })
const router = Router()

// Admin
router.get("/admin/shipments", requireAdmin, listShipments)
router.post("/admin/shipments", requireAdmin, upload.single("itemImage"), createShipment)
router.put("/admin/shipments/:id", requireAdmin, upload.single("itemImage"), updateShipment)
router.patch("/admin/shipments/:id/progress", requireAdmin, patchProgress)

// Public
router.get("/shipments/:trackingNumber", trackShipment)

module.exports = router
