import Link from "next/link";
import { getSessionById } from "@/lib/db-json";
import SessionForm from "@/components/SessionForm";

export async function getServerSideProps({ params }) {
  const session = getSessionById(params.id);

  if (!session) {
    return { notFound: true };
  }

  return { props: { session } };
}

export default function EditSession({ session }) {
  return (
    <main className="container" style={{marginTop: '40px'}}>
      <div className="header">
        <h1>Edit Session</h1>
        <Link href="/" className="btn" style={{padding: '8px 16px', fontSize: '14px'}}>
          ← Back to Sessions
        </Link>
      </div>
      <SessionForm action={`/api/sessions/${session.id}`} session={session} />
    </main>
  );
}
