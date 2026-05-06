import Link from "next/link";
import { getAllSessions } from "@/lib/db";

const pageStyle = {
  maxWidth: 760,
  margin: "40px auto",
  padding: "0 20px",
  fontFamily: "Arial, sans-serif",
  color: "#222"
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: 20
};

const cellStyle = {
  borderBottom: "1px solid #ddd",
  padding: "10px 8px",
  textAlign: "left",
  verticalAlign: "top"
};

const buttonStyle = {
  padding: "6px 10px",
  border: "1px solid #999",
  background: "#fff",
  cursor: "pointer"
};

export async function getServerSideProps() {
  return {
    props: {
      sessions: getAllSessions()
    }
  };
}

export default function Home({ sessions }) {
  return (
    <main style={pageStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
        <h1 style={{ margin: 0 }}>Stretching Sessions</h1>
        <Link href="/new" style={{ alignSelf: "center" }}>
          Add session
        </Link>
      </div>

      {sessions.length === 0 ? (
        <p style={{ marginTop: 24 }}>No sessions logged yet.</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={cellStyle}>Date</th>
              <th style={cellStyle}>Duration</th>
              <th style={cellStyle}>Type</th>
              <th style={cellStyle}>Notes</th>
              <th style={cellStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => (
              <tr key={session.id}>
                <td style={cellStyle}>{new Date(session.date).toLocaleDateString()}</td>
                <td style={cellStyle}>{session.duration_minutes} min</td>
                <td style={cellStyle}>{session.stretch_type}</td>
                <td style={cellStyle}>{session.notes || ""}</td>
                <td style={cellStyle}>
                  <Link href={`/edit/${session.id}`}>Edit</Link>
                  <form method="post" action={`/api/sessions/${session.id}/delete`} style={{ display: "inline", marginLeft: 12 }}>
                    <button type="submit" style={buttonStyle}>
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
