import mongoose, { Schema } from "mongoose"

const AdminSchema = new Schema(
  {
    // Flexible schema to match your existing data
  },
  {
    strict: false,
    collection: "admins",
  },
)

export default mongoose.models.Admin || mongoose.model("Admin", AdminSchema)
