const { v2: cloudinary } = require("cloudinary")

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

function cloudinaryReady() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET,
  )
}

function uploadToCloudinary(file, folder) {
  if (!file) return Promise.resolve(null)
  if (!cloudinaryReady()) {
    const error = new Error(
      "Cloudinary is not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.",
    )
    error.status = 500
    throw error
  }

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "auto", use_filename: true, unique_filename: true },
      (error, result) => {
        if (error) reject(error)
        else resolve(result)
      },
    )
    stream.end(file.buffer)
  })
}

module.exports = { cloudinary, uploadToCloudinary }
