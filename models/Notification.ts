import mongoose, { Schema } from "mongoose"

const NotificationSchema = new Schema(
  {
    // Flexible schema to match your existing data
  },
  {
    strict: false,
    collection: "notifications",
  },
)

export default mongoose.models.Notification || mongoose.model("Notification", NotificationSchema)
