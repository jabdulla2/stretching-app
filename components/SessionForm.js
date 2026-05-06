const labelStyle = {
  display: "block",
  marginBottom: 6,
  fontWeight: "bold"
};

const fieldStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: 8,
  border: "1px solid #aaa",
  marginBottom: 16
};

const buttonStyle = {
  padding: "8px 12px",
  border: "1px solid #777",
  background: "#f5f5f5",
  cursor: "pointer"
};

function toDateInputValue(value) {
  if (!value) {
    return new Date().toISOString().slice(0, 10);
  }

  return new Date(value).toISOString().slice(0, 10);
}

export default function SessionForm({ action, session }) {
  return (
    <form method="post" action={action}>
      <label style={labelStyle} htmlFor="date">
        Date
      </label>
      <input
        id="date"
        name="date"
        type="date"
        required
        defaultValue={toDateInputValue(session?.date)}
        style={fieldStyle}
      />

      <label style={labelStyle} htmlFor="duration_minutes">
        Duration minutes
      </label>
      <input
        id="duration_minutes"
        name="duration_minutes"
        type="number"
        min="1"
        required
        defaultValue={session?.duration_minutes || ""}
        style={fieldStyle}
      />

      <label style={labelStyle} htmlFor="stretch_type">
        Stretch type
      </label>
      <input
        id="stretch_type"
        name="stretch_type"
        type="text"
        required
        defaultValue={session?.stretch_type || ""}
        style={fieldStyle}
      />

      <label style={labelStyle} htmlFor="notes">
        Notes
      </label>
      <textarea id="notes" name="notes" rows="4" defaultValue={session?.notes || ""} style={fieldStyle} />

      <button type="submit" style={buttonStyle}>
        Save
      </button>
    </form>
  );
}
