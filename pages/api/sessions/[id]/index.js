import { getSessionById, updateSession } from "@/lib/db";
import { validateSessionInput } from "@/lib/validation";

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  if (!getSessionById(req.query.id)) {
    return res.status(404).end("Session not found");
  }

  const result = validateSessionInput(req.body);
  if (result.error) {
    return res.status(400).send(result.error);
  }

  updateSession(req.query.id, result.value);
  return res.redirect(303, "/");
}
