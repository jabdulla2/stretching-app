const { deleteSession, getSessionById } = require("@/lib/db");

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  const session = getSessionById(req.query.id);
  if (!session) {
    return res.status(404).end("Session not found");
  }

  deleteSession(req.query.id);
  return res.redirect(303, "/");
}
