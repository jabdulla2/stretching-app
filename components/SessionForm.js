const labelStyle = {
  display: "block",
  marginBottom: 8,
  fontWeight: "600",
  color: "#333",
  fontSize: "14px"
};

const fieldStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "10px 12px",
  border: "2px solid #e0e0e0",
  borderRadius: "8px",
  fontSize: "14px",
  transition: "border-color 0.2s",
  outline: "none"
};

const buttonStyle = {
  padding: "10px 20px",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "600",
  transition: "transform 0.2s, box-shadow 0.2s"
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
      <div style={{marginBottom: "20px"}}>
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
      </div>

      <div style={{marginBottom: "20px"}}>
        <label style={labelStyle} htmlFor="duration_minutes">
          Duration (minutes)
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
      </div>

      <div style={{marginBottom: "20px"}}>
        <label style={labelStyle} htmlFor="stretch_type">
          Stretch Type
        </label>
        <input
          id="stretch_type"
          name="stretch_type"
          type="text"
          required
          placeholder="e.g., hamstring, shoulder, back"
          defaultValue={session?.stretch_type || ""}
          style={fieldStyle}
        />
      </div>

      <div style={{marginBottom: "24px"}}>
        <label style={labelStyle} htmlFor="notes">
          Notes (optional)
        </label>
        <textarea 
          id="notes" 
          name="notes" 
          rows="4" 
          placeholder="Any notes about this stretching session..."
          defaultValue={session?.notes || ""} 
          style={{...fieldStyle, resize: "vertical", minHeight: "80px"}} 
        />
      </div>

      <button type="submit" style={buttonStyle}>
        Save Session
      </button>
    </form>
  );
}
