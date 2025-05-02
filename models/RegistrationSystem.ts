import mongoose, { Schema } from "mongoose"

const RegistrationSystemSchema = new Schema(
  {
    // Flexible schema to match your existing data
  },
  {
    strict: false,
    collection: "registration_systems",
  },
)

export default mongoose.models.RegistrationSystem || mongoose.model("RegistrationSystem", RegistrationSystemSchema)
