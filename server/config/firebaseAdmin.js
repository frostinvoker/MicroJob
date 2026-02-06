import admin from "firebase-admin";
import { createRequire } from "module"; 

// Needed because JSON imports are experimental in some Node versions
const require = createRequire(import.meta.url);
const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default admin;