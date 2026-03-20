const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const admin = require("firebase-admin");
const multer = require("multer");
const sharp = require("sharp");

dotenv.config();

// Initialize Firebase Admin
let serviceAccount = {};
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else if (process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
  try {
    serviceAccount = require(path.resolve(process.env.FIREBASE_SERVICE_ACCOUNT_PATH));
  } catch {
    console.error("Service account file not found, falling back to env var");
  }
}

if (Object.keys(serviceAccount).length > 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  admin.initializeApp();
}

const db = admin.firestore();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

const app = express();
app.use(cors());
app.use(express.json({ limit: "15mb" }));

// Auth middleware
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Helper: compress and convert uploaded file to base64 data URL
async function fileToDataUrl(file) {
  // PDFs: store as-is (but reject if too large)
  if (file.mimetype === "application/pdf") {
    if (file.buffer.length > 900000) {
      throw new Error("PDF too large. Please upload a PDF under 900KB, or upload an image instead.");
    }
    const base64 = file.buffer.toString("base64");
    return `data:${file.mimetype};base64,${base64}`;
  }
  // Images: compress with sharp to fit under Firestore 1MB limit
  let quality = 80;
  let width = 1200;
  let compressed;
  for (let attempt = 0; attempt < 4; attempt++) {
    compressed = await sharp(file.buffer)
      .resize({ width, withoutEnlargement: true })
      .jpeg({ quality })
      .toBuffer();
    if (compressed.length < 700000) break;
    quality -= 15;
    width -= 200;
  }
  const base64 = compressed.toString("base64");
  return `data:image/jpeg;base64,${base64}`;
}

// ===== PROJECTS ROUTES =====
app.get("/api/projects", async (req, res) => {
  try {
    let snapshot;
    try {
      snapshot = await db.collection("projects").orderBy("order", "asc").get();
    } catch {
      snapshot = await db.collection("projects").get();
    }
    const projects = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/projects", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { title, description, tech, link, github, role, company, location, period, order } = req.body;
    let imageUrl = "";
    if (req.file) {
      imageUrl = await fileToDataUrl(req.file);
    }
    const docRef = await db.collection("projects").add({
      title,
      description,
      tech: tech ? JSON.parse(tech) : [],
      link: link || "",
      github: github || "",
      role: role || "",
      company: company || "",
      location: location || "",
      period: period || "",
      imageUrl,
      order: parseInt(order) || 0,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.json({ id: docRef.id, message: "Project created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/projects/:id", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { title, description, tech, link, github, role, company, location, period, order } = req.body;
    const updateData = {
      title,
      description,
      tech: tech ? JSON.parse(tech) : [],
      link: link || "",
      github: github || "",
      role: role || "",
      company: company || "",
      location: location || "",
      period: period || "",
      order: parseInt(order) || 0,
    };
    if (req.file) {
      updateData.imageUrl = await fileToDataUrl(req.file);
    }
    await db.collection("projects").doc(req.params.id).update(updateData);
    res.json({ message: "Project updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/projects/:id", authMiddleware, async (req, res) => {
  try {
    await db.collection("projects").doc(req.params.id).delete();
    res.json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== CERTIFICATES ROUTES =====
app.get("/api/certificates", async (req, res) => {
  try {
    let snapshot;
    try {
      snapshot = await db.collection("certificates").orderBy("order", "asc").get();
    } catch {
      snapshot = await db.collection("certificates").get();
    }
    const certs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(certs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/certificates", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { title, issuer, date, order } = req.body;
    let imageUrl = "";
    let fileType = "image";
    if (req.file) {
      imageUrl = await fileToDataUrl(req.file);
      fileType = req.file.mimetype === "application/pdf" ? "pdf" : "image";
    }
    const docRef = await db.collection("certificates").add({
      title,
      issuer: issuer || "",
      date: date || "",
      imageUrl,
      fileType,
      order: parseInt(order) || 0,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.json({ id: docRef.id, message: "Certificate created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/certificates/:id", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { title, issuer, date, order } = req.body;
    const updateData = { title, issuer: issuer || "", date: date || "", order: parseInt(order) || 0 };
    if (req.file) {
      updateData.imageUrl = await fileToDataUrl(req.file);
      updateData.fileType = req.file.mimetype === "application/pdf" ? "pdf" : "image";
    }
    await db.collection("certificates").doc(req.params.id).update(updateData);
    res.json({ message: "Certificate updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/certificates/:id", authMiddleware, async (req, res) => {
  try {
    await db.collection("certificates").doc(req.params.id).delete();
    res.json({ message: "Certificate deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== PROFILE ROUTE =====
app.get("/api/profile", async (req, res) => {
  try {
    const doc = await db.collection("settings").doc("profile").get();
    res.json(doc.exists ? doc.data() : {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/profile", authMiddleware, async (req, res) => {
  try {
    await db.collection("settings").doc("profile").set(req.body, { merge: true });
    res.json({ message: "Profile updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== CONNECTIONS (Contact Form) ROUTES =====
app.post("/api/connections", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required" });
    }
    const docRef = await db.collection("connections").add({
      name,
      email,
      message,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      read: false,
    });
    res.json({ id: docRef.id, message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/connections", authMiddleware, async (req, res) => {
  try {
    let snapshot;
    try {
      snapshot = await db.collection("connections").orderBy("createdAt", "desc").get();
    } catch {
      snapshot = await db.collection("connections").get();
    }
    const connections = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(connections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/connections/:id", authMiddleware, async (req, res) => {
  try {
    await db.collection("connections").doc(req.params.id).delete();
    res.json({ message: "Connection deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
