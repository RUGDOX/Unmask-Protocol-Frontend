// models.js - Unmask Protocol Database Models with Maximum Security and Functionality
const mongoose = require('mongoose');
const crypto = require('crypto');
const zlib = require('zlib');

// ==============================
// 🔒 ENCRYPTION LOGIC FOR PII VAULT
// ==============================
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || crypto.randomBytes(32).toString('hex');  // 32-character secure key
const IV_LENGTH = 16;

// Encryption Function
const encryptData = (data) => {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return { encryptedData: encrypted, iv: iv.toString('hex') };
};

// Decryption Function
const decryptData = (encryptedData, iv) => {
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

// Data Integrity Hash Function
const hashData = (data) => crypto.createHash('sha256').update(data).digest('hex');

// ==============================
// 👤 USER SCHEMA
// ==============================
const UserSchema = new mongoose.Schema({
    wallet_address: { type: String, required: true, unique: true },
    wallet_age: { type: Number, required: true },
    unique_wallet_interactions: { type: Number, default: 0 },
    wallet_reputation_score: { type: Number, default: 0 },
    circular_transfers: { type: Boolean, default: false },
    flagged: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    schema_version: { type: String, default: "1.4" }
});

// ==============================
// 🔄 TRANSACTION SCHEMA
// ==============================
const TransactionSchema = new mongoose.Schema({
    wallet_address: { type: String, required: true },
    transaction_amount: { type: Number, required: true },
    gas_price: { type: Number, required: true },
    contract_interaction: { type: Boolean, default: false },
    threat_score: { type: Number, default: 0 },
    block_number: { type: Number, required: true },
    transaction_hash: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    schema_version: { type: String, default: "1.4" }
});

// ==============================
// 🔐 EVIDENCE SCHEMA (PII Vault with Dead Man's Switch)
// ==============================
const EvidenceSchema = new mongoose.Schema({
    vault_id: { type: String, required: true, unique: true },
    wallet_address: { type: String, required: true },
    encrypted_data: { type: String, required: true },
    iv: { type: String, required: true },
    submitted_by: { type: String, required: true },
    verified: { type: Boolean, default: false },
    locked: { type: Boolean, default: false },
    data_hash: { type: String }, // Data Integrity Hash
    createdAt: { type: Date, default: Date.now },
    schema_version: { type: String, default: "1.4" }
});

// Encrypt Data Before Saving
EvidenceSchema.pre('save', function (next) {
    if (this.locked) {
        throw new Error("This evidence record is locked and cannot be modified.");
    }
    const { encryptedData, iv } = encryptData(this.encrypted_data);
    this.encrypted_data = zlib.gzipSync(encryptedData).toString('base64'); // Compressed Vault Data
    this.iv = iv;
    this.data_hash = hashData(this.encrypted_data);  // Store Hash
    next();
});

EvidenceSchema.methods.verifyIntegrity = function () {
    return this.data_hash === hashData(this.encrypted_data);
};

EvidenceSchema.methods.triggerDeadManSwitch = function () {
    const fakeMetadata = {
        fake_wallet: "0x" + crypto.randomBytes(20).toString('hex'),
        fake_data: crypto.randomBytes(256).toString('hex'),
        timestamp: Date.now()
    };
    return { corrupted_data: JSON.stringify(fakeMetadata), message: "WARNING: This data is corrupted and invalid." };
};

// ==============================
// 🚨 ALERT SCHEMA (For RugHunter Threat Sharing)
// ==============================
const AlertSchema = new mongoose.Schema({
    wallet_address: { type: String, required: true },
    threat_score: { type: Number, default: 0 },
    flagged_reason: { type: String, required: true },
    alert_source: { type: String, enum: ['AI', 'Admin', 'RugHunter'], required: true },
    alert_type: { type: String, enum: ['High Risk', 'Suspicious', 'Confirmed Scam'], required: true },
    alert_timestamp: { type: Date, default: Date.now, expires: '30d' },
    schema_version: { type: String, default: "1.4" }
});

// ==============================
// 🔽 EXPORT MODELS
// ==============================
const User = mongoose.model('User', UserSchema);
const Transaction = mongoose.model('Transaction', TransactionSchema);
const Evidence = mongoose.model('Evidence', EvidenceSchema);
const Alert = mongoose.model('Alert', AlertSchema);

module.exports = { User, Transaction, Evidence, Alert };
