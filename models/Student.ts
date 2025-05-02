import mongoose, { Schema } from "mongoose"

const StudentSchema = new Schema({
  student_id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  major: {
    type: String,
    required: true,
  },
  credit_hours: {
    type: Number,
    default: 0,
  },
  enrolled_in_course: [
    {
      type: String,
      ref: "Course",
    },
  ],
  gpa: {
    type: Number,
    default: 0.0,
  },
  status: {
    type: String,
    enum: ["active", "inactive", "withdrawn"],
    default: "active",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Student || mongoose.model("Student", StudentSchema)
