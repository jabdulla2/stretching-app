import Link from "next/link";
import { getSessionById } from "@/lib/db";
import SessionForm from "@/components/SessionForm";

const pageStyle = {
  maxWidth: 560,
  margin: "40px auto",
  padding: "0 20px",
  fontFamily: "Arial, sans-serif",
  color: "#222"
};

export async function getServerSideProps({ params }) {
  const session = getSessionById(params.id);

  if (!session) {
    return { notFound: true };
  }

  return { props: { session } };
}

export default function EditSession({ session }) {
  return (
    <main style={pageStyle}>
      <h1>Edit Session</h1>
      <SessionForm action={`/api/sessions/${session.id}`} session={session} />
      <p style={{ marginTop: 20 }}>
        <Link href="/">Back to sessions</Link>
      </p>
    </main>
  );
}
