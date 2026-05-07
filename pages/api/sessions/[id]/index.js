const { getSessionById, updateSession } = require("@/lib/db-json");
const { validateSessionInput } = require("@/lib/validation");

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

    const result = validateSessionInput(req.body);
    if (result.error) {
      return res.status(400).send(result.error);
    }

    updateSession(req.query.id, result.value);
    return res.redirect(303, "/");
  } catch (error) {
    console.error("Error in /api/sessions/[id]:", error);
    return res.status(500).json({ error: error.message, stack: error.stack });
  }
};
