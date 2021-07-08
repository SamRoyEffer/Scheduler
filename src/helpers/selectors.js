export function getAppointmentsForDay(state, day) {
  try {
    return state.days
      .find((stateDay) => stateDay.name === day)
      .appointments.map((appointmentId) => state.appointments[appointmentId]);
  } catch (err) {
    return [];
  }
}

export const getInterview = (state, interview) => {
  try {
    return {
      student: interview.student,
      interviewer: { ...state.interviewers[interview.interviewer] },
    };
  } catch (err) {
    return null;
  }
};
