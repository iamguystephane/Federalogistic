const path = require("path")
const fs = require("fs")
const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const bcrypt = require("bcrypt")

dotenv.config()

const prisma = require("./prisma")
const adminRoutes = require("./routes/admin")
const shipmentRoutes = require("./routes/shipments")
const paymentRoutes = require("./routes/payments")
const publicRoutes = require("./routes/public")

const app = express()
const port = process.env.PORT || 4000
const uploadDir = path.join(__dirname, "uploads")

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })

const allowedOrigins = new Set(
  [
    process.env.CLIENT_URL,
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    "https://federalogistic.com",
    "https://www.federalogistic.com",
  ].filter(Boolean),
)

const corsOptions = {
  origin(origin, callback) {
    // Allow requests with no origin (native mobile apps, curl, server-to-server)
    if (!origin || allowedOrigins.has(origin)) return callback(null, true)
    const err = Object.assign(new Error("Not allowed by CORS"), { status: 403 })
    callback(err)
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
}

// Handle preflight requests for every route before any other middleware
app.options(/.*/, cors(corsOptions))
app.use(cors(corsOptions))
app.use(express.json({ limit: "2mb" }))
app.use("/uploads", express.static(uploadDir))

app.get("/api/health", (_req, res) => res.json({ ok: true }))

app.use("/api", adminRoutes)
app.use("/api", shipmentRoutes)
app.use("/api", paymentRoutes)
app.use("/api", publicRoutes)

app.use((error, _req, res, _next) => {
  if (error.message !== "Not allowed by CORS") console.error(error)
  res.status(error.status || 500).json({ message: error.message || "Server error" })
})

async function seedAdmin() {
  const existing = await prisma.admin.findFirst()
  if (!existing) {
    const email = process.env.ADMIN_EMAIL || "admin@federalogistic.com"
    const password = process.env.ADMIN_PASSWORD || "Admin@12345"
    const passwordHash = await bcrypt.hash(password, 10)
    await prisma.admin.create({ data: { email, passwordHash } })
    console.log(`Admin seeded: ${email}`)
  }
}

async function startServer() {
  const maxRetries = 6
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await prisma.$connect()
      console.log("Database connected.")
      break
    } catch (err) {
      if (attempt === maxRetries) {
        console.error("Could not connect to database after retries:", err.message)
        process.exit(1)
      }
      const delay = attempt * 3000
      console.log(`DB connection attempt ${attempt} failed — retrying in ${delay / 1000}s…`)
      await new Promise((r) => setTimeout(r, delay))
    }
  }

  await seedAdmin().catch(console.error)

  app.listen(port, () => {
    console.log(`Federalogistic API running on http://127.0.0.1:${port}`)
  })
}

startServer()
