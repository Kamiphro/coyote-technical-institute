import mongoose, { Schema } from "mongoose"

const CourseSchema = new Schema({
  course_id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  max_size: {
    type: Number,
    required: true,
  },
  schedule: {
    type: String,
    required: true,
  },
  time_slot: {
    type: String,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  credits: {
    type: Number,
    required: true,
  },
  prerequisites: {
    type: [String],
    default: [],
  },
  enrolled_students: [
    {
      type: String,
      ref: "Student",
    },
  ],
  waitlist: [
    {
      type: String,
      ref: "Student",
    },
  ],
  status: {
    type: String,
    enum: ["active", "inactive"],
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

export default mongoose.models.Course || mongoose.model("Course", CourseSchema)
