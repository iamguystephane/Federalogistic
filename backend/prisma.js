const { PrismaClient } = require("@prisma/client")

// Retry queries on Neon cold-start connection drops (P1001 / P1017)
function createClient() {
  const client = new PrismaClient()

  return client.$extends({
    query: {
      $allModels: {
        async $allOperations({ args, query }) {
          const maxRetries = 3
          for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
              return await query(args)
            } catch (err) {
              const isConnectionDrop = err?.code === "P1001" || err?.code === "P1017"
              if (isConnectionDrop && attempt < maxRetries) {
                await new Promise((r) => setTimeout(r, 500 * attempt))
                continue
              }
              throw err
            }
          }
        },
      },
    },
  })
}

const prisma = createClient()

module.exports = prisma
