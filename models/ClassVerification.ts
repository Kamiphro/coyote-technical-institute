import mongoose, { Schema } from "mongoose"

const ClassVerificationSchema = new Schema(
  {
    // Flexible schema to match your existing data
  },
  {
    strict: false,
    collection: "class_verification",
  },
)

export default mongoose.models.ClassVerification || mongoose.model("ClassVerification", ClassVerificationSchema)
