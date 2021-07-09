export function getAppointmentsForDay(state, day) {
  const d = state.days.find((stateDay) => stateDay.name === day);
  return d
    ? d.appointments.map((appointmentId) => state.appointments[appointmentId])
    : [];
}

export const getInterview = (state, interview) => {
  if (interview) {
    return {
      student: interview.student,
      interviewer: { ...state.interviewers[interview.interviewer] },
    };
  } else {
    return null;
  }
};
