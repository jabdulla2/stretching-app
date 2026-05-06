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
    <main className="container" style={{marginTop: '40px'}}>
      <div className="header">
        <h1>Add New Session</h1>
        <Link href="/" className="btn" style={{padding: '8px 16px', fontSize: '14px'}}>
          ← Back to Sessions
        </Link>
      </div>
      <SessionForm action="/api/sessions" />
    </main>
  );
}
