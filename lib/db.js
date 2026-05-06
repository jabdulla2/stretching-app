const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(process.cwd(), "stretching.db");
const db = new Database(dbPath);

db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    duration_minutes INTEGER NOT NULL,
    stretch_type TEXT NOT NULL,
    notes TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`);

function getAllSessions() {
  return db
    .prepare(
      `SELECT id, date, duration_minutes, stretch_type, notes, created_at
       FROM sessions
       ORDER BY date DESC, id DESC`
    )
    .all();
}

function getSessionById(id) {
  return db
    .prepare(
      `SELECT id, date, duration_minutes, stretch_type, notes, created_at
       FROM sessions
       WHERE id = ?`
    )
    .get(id);
}

function createSession({ date, duration_minutes, stretch_type, notes }) {
  return db
    .prepare(
      `INSERT INTO sessions (date, duration_minutes, stretch_type, notes)
       VALUES (?, ?, ?, ?)`
    )
    .run(date, duration_minutes, stretch_type, notes || null);
}

function updateSession(id, { date, duration_minutes, stretch_type, notes }) {
  return db
    .prepare(
      `UPDATE sessions
       SET date = ?, duration_minutes = ?, stretch_type = ?, notes = ?
       WHERE id = ?`
    )
    .run(date, duration_minutes, stretch_type, notes || null, id);
}

function deleteSession(id) {
  return db.prepare("DELETE FROM sessions WHERE id = ?").run(id);
}

module.exports = {
  getAllSessions,
  getSessionById,
  createSession,
  updateSession,
  deleteSession
};
