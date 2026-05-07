const { deleteSession, getSessionById } = require("@/lib/db-json");

module.exports = function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  try {
    const session = getSessionById(req.query.id);
    if (!session) {
      return res.status(404).end("Session not found");
    }

    deleteSession(req.query.id);
    return res.redirect(303, "/");
  } catch (error) {
    console.error("Error in /api/sessions/[id]/delete:", error);
    return res.status(500).json({ error: error.message, stack: error.stack });
  }
};
