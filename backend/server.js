const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
require("dotenv").config();

const app = express();
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Models
const Evidence = require("./models/Evidence");
const RugID = require("./models/RugID");
const User = require("./models/User");
const UnmaskRequest = require("./models/UnmaskRequest");
const AuditLog = require("./models/AuditLog");

// Evidence Model
const EvidenceSchema = new mongoose.Schema({
    url: { type: String, required: true },
    description: { type: String, required: true },
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["submitted", "reviewed", "flagged", "closed"], default: "submitted" },
    createdAt: { type: Date, default: Date.now }
});
const Evidence = mongoose.model("Evidence", EvidenceSchema);

// RugID Model
const RugIDSchema = new mongoose.Schema({
    encryptedPII: { type: String, required: true },
    status: { type: String, enum: ["pending_verification", "verified", "rejected", "pending_unmask"], default: "pending_verification" },
    createdAt: { type: Date, default: Date.now }
});
const RugID = mongoose.model("RugID", RugIDSchema);

// User Model
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin", "validator"], default: "user" },
    createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model("User", UserSchema);

// Unmask Request Model
const UnmaskRequestSchema = new mongoose.Schema({
    evidenceId: { type: mongoose.Schema.Types.ObjectId, ref: "Evidence" },
    requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["pending", "approved", "denied"], default: "pending" },
    createdAt: { type: Date, default: Date.now }
});
const UnmaskRequest = mongoose.model("UnmaskRequest", UnmaskRequestSchema);

// Audit Log Model
const AuditLogSchema = new mongoose.Schema({
    action: { type: String, required: true },
    performedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    targetResource: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});
const AuditLog = mongoose.model("AuditLog", AuditLogSchema);

// Middleware for Authentication
const authenticate = (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).json({ msg: "No token, authorization denied" });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ msg: "Invalid token" });
    }
};

// Audit Log Middleware
const logAction = async (action, performedBy, targetResource) => {
    await AuditLog.create({ action, performedBy, targetResource });
};

// Evidence Submission
app.post("/api/evidence", authenticate, async (req, res) => {
    const { url, description } = req.body;
    const newEvidence = new Evidence({ url, description, submittedBy: req.user.id });
    await newEvidence.save();
    await logAction("Submitted Evidence", req.user.id, newEvidence._id);
    res.json({ msg: "Evidence submitted successfully" });
});

// Admin Panel - Evidence Management
app.get("/api/evidence/list", authenticate, async (req, res) => {
    const evidenceList = await Evidence.find().populate("submittedBy");
    res.json({ evidenceList });
});

// Project Owner Registration with RugID Generation
app.post("/api/project-owner/register", authenticate, async (req, res) => {
    const { fullName, email, dob, address, idDocument } = req.body;
    const encryptedPII = crypto.createCipher("aes-256-ctr", process.env.ENCRYPTION_KEY).update(JSON.stringify({ fullName, email, dob, address, idDocument }), "utf8", "hex");
    const newRugID = new RugID({ encryptedPII, status: "pending_verification" });
    await newRugID.save();
    await logAction("Created RugID", req.user.id, newRugID._id);
    res.json({ msg: "RugID created successfully", rugID: newRugID._id });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
