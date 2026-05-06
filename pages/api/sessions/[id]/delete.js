import { deleteSession } from "@/lib/db";

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  deleteSession(req.query.id);
  return res.redirect(303, "/");
}
