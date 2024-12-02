// controllers/securityPersonnel.controller.js

import SecurityPersonnel from "../models/securityPersonnel.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const register = async (req, res, next) => {
  const { name, email, password, category, whatsappNumber } = req.body;

  try {
    const existingPersonnel = await SecurityPersonnel.findOne({ email });
    if (existingPersonnel) {
      return next(errorHandler(400, "Email already exists"));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newPersonnel = new SecurityPersonnel({
      name,
      email,
      password: hashedPassword,
      category,
      whatsappNumber,
    });

    await newPersonnel.save();
    res.status(201).json({ message: "Security personnel registered successfully" });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const personnel = await SecurityPersonnel.findOne({ email });
    if (!personnel) {
      return next(errorHandler(404, "Security personnel not found"));
    }

    const validPassword = bcryptjs.compareSync(password, personnel.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid credentials"));
    }

    const token = jwt.sign(
      { id: personnel._id, isSecurityPersonnel: true },
      process.env.JWT_SECRET
    );

    const { password: pass, ...rest } = personnel._doc;
    res.status(200).cookie("access_token", token, {
      httpOnly: true,
    }).json(rest);
  } catch (error) {
    next(error);
  }
};

export const getLivePersonnel = async (req, res, next) => {
  try {
    const livePersonnel = await SecurityPersonnel.find({ isLive: true })
      .select('-password')
      .sort({ category: 1, averageResponseTime: 1 });
    res.status(200).json(livePersonnel);
  } catch (error) {
    next(error);
  }
};

export const updateLiveStatus = async (req, res, next) => {
  const { isLive } = req.body;

  try {
    const personnel = await SecurityPersonnel.findByIdAndUpdate(
      req.user.id,
      { isLive, lastLive: new Date() },
      { new: true }
    ).select('-password');

    res.status(200).json(personnel);
  } catch (error) {
    next(error);
  }
};