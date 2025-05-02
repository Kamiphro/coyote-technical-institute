import mongoose, { Schema } from "mongoose"

// This is a flexible schema that will adapt to your existing data structure
const StudentSchema = new Schema(
  {
    // We're using strict: false to allow for fields that aren't explicitly defined
  },
  {
    strict: false,
    // This tells Mongoose which collection to use
    collection: "students",
  },
)

export default mongoose.models.Student || mongoose.model("Student", StudentSchema)
