function validateSessionInput(input) {
  const date = String(input.date || "").trim();
  const stretch_type = String(input.stretch_type || "").trim();
  const notes = String(input.notes || "").trim();
  const duration_minutes = Number.parseInt(input.duration_minutes, 10);

  if (!date) {
    return { error: "Date is required." };
  }

  if (!Number.isInteger(duration_minutes) || duration_minutes <= 0) {
    return { error: "Duration must be a positive number of minutes." };
  }

  if (!stretch_type) {
    return { error: "Stretch type is required." };
  }

  return {
    value: {
      date: new Date(date).toISOString(),
      duration_minutes,
      stretch_type,
      notes
    }
  };
}

module.exports = { validateSessionInput };
