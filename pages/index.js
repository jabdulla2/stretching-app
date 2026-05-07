import Link from "next/link";
import { getAllSessions } from "@/lib/db-json";

export async function getServerSideProps() {
  return {
    props: {
      sessions: getAllSessions()
    }
  };
}

export default function Home({ sessions }) {
  return (
    <main className="container">
      <div className="header">
        <h1>🧘 Stretching Sessions</h1>
        <Link href="/new" className="btn">
          + Add Session
        </Link>
      </div>

      {sessions.length === 0 ? (
        <div className="empty-state">
          <p>No sessions logged yet. Start tracking your stretching routine!</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Duration</th>
              <th>Type</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => (
              <tr key={session.id}>
                <td>{new Date(session.date).toLocaleDateString()}</td>
                <td>{session.duration_minutes} min</td>
                <td>{session.stretch_type}</td>
                <td>{session.notes || "-"}</td>
                <td>
                  <Link href={`/edit/${session.id}`} className="btn" style={{padding: '6px 12px', fontSize: '12px'}}>
                    Edit
                  </Link>
                  <form method="post" action={`/api/sessions/${session.id}/delete`} style={{display: "inline", marginLeft: 8}}>
                    <button type="submit" className="btn btn-danger" style={{padding: '6px 12px', fontSize: '12px'}}>
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
