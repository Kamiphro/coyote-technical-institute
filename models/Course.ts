import mongoose, { Schema } from "mongoose"

const CourseSchema = new Schema(
  {
    // Flexible schema to match your existing data
  },
  {
    strict: false,
    collection: "courses",
  },
)

export default mongoose.models.Course || mongoose.model("Course", CourseSchema)
