import mongoose, { Schema } from "mongoose"

const NotificationSchema = new Schema({
  notification_id: {
    type: String,
    required: true,
    unique: true,
  },
  sender_id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["add", "drop", "waitlist", "withdraw"],
    required: true,
  },
  student_id: {
    type: String,
    ref: "Student",
    required: true,
  },
  student_name: {
    type: String,
    required: true,
  },
  course_id: {
    type: String,
    ref: "Course",
  },
  course_name: {
    type: String,
  },
  message: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Notification || mongoose.model("Notification", NotificationSchema)
