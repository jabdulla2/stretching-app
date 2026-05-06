import Link from "next/link";
import SessionForm from "@/components/SessionForm";

const pageStyle = {
  maxWidth: 560,
  margin: "40px auto",
  padding: "0 20px",
  fontFamily: "Arial, sans-serif",
  color: "#222"
};

export default function NewSession() {
  return (
    <main style={pageStyle}>
      <h1>Add Session</h1>
      <SessionForm action="/api/sessions" />
      <p style={{ marginTop: 20 }}>
        <Link href="/">Back to sessions</Link>
      </p>
    </main>
  );
}
