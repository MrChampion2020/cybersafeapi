// models/securityPersonnel.model.js

import mongoose from "mongoose";

const securityPersonnelSchema = new mongoose.Schema({
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
  category: {
    type: String,
    required: true,
  },
  whatsappNumber: {
    type: String,
    required: true,
  },
  isPaidLevel: {
    type: Boolean,
    default: false,
  },
  hourlyCharge: {
    type: Number,
    default: 0,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isLive: {
    type: Boolean,
    default: false,
  },
  lastLive: {
    type: Date,
  },
  averageResponseTime: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

const SecurityPersonnel = mongoose.model("SecurityPersonnel", securityPersonnelSchema);

export default SecurityPersonnel;