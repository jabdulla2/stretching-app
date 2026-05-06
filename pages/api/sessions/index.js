const { createSession } = require("@/lib/db");
const { validateSessionInput } = require("@/lib/validation");

module.exports = function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  try {
    const result = validateSessionInput(req.body);
    if (result.error) {
      return res.status(400).send(result.error);
    }

    createSession(result.value);
    return res.redirect(303, "/");
  } catch (error) {
    console.error("Error in /api/sessions:", error);
    return res.status(500).json({ error: error.message, stack: error.stack });
  }
};
