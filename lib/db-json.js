const fs = require("fs");
const path = require("path");

const dbPath = path.join(process.cwd(), "stretching.json");

// Initialize the JSON file if it doesn't exist
function initDB() {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({ sessions: [] }, null, 2));
  }
}

function readDB() {
  initDB();
  const data = fs.readFileSync(dbPath, "utf8");
  return JSON.parse(data);
}

function writeDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

function getAllSessions() {
  const db = readDB();
  return db.sessions.sort((a, b) => {
    if (a.date !== b.date) return b.date.localeCompare(a.date);
    return b.id - a.id;
  });
}

function getSessionById(id) {
  const db = readDB();
  return db.sessions.find((s) => s.id === parseInt(id)) || null;
}

function createSession({ date, duration_minutes, stretch_type, notes }) {
  const db = readDB();
  const newId = db.sessions.length > 0 
    ? Math.max(...db.sessions.map(s => s.id)) + 1 
    : 1;
  
  const newSession = {
    id: newId,
    date,
    duration_minutes: parseInt(duration_minutes),
    stretch_type,
    notes: notes || null,
    created_at: new Date().toISOString()
  };
  
  db.sessions.push(newSession);
  writeDB(db);
  return { lastInsertRowid: newId };
}

function updateSession(id, { date, duration_minutes, stretch_type, notes }) {
  const db = readDB();
  const index = db.sessions.findIndex((s) => s.id === parseInt(id));
  
  if (index === -1) return { changes: 0 };
  
  db.sessions[index] = {
    ...db.sessions[index],
    date,
    duration_minutes: parseInt(duration_minutes),
    stretch_type,
    notes: notes || null
  };
  
  writeDB(db);
  return { changes: 1 };
}

function deleteSession(id) {
  const db = readDB();
  const initialLength = db.sessions.length;
  db.sessions = db.sessions.filter((s) => s.id !== parseInt(id));
  
  if (db.sessions.length < initialLength) {
    writeDB(db);
    return { changes: 1 };
  }
  return { changes: 0 };
}

module.exports = {
  getAllSessions,
  getSessionById,
  createSession,
  updateSession,
  deleteSession
};
