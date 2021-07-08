export function getAppointmentsForDay(state, day) {
  try {
    return state.days
      .find((stateDay) => stateDay.id === day)
      .appointments.map((appointmentId) => state.appointments[appointmentId]);
  } catch (err) {
    return [];
  }
}
