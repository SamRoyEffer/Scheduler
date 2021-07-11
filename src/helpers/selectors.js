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

export function getInterviewersForDay(state, day) {
  const i = state.days.find((stateDay) => stateDay.name === day);
  return i
    ? i.interviewers.map((interviewerId) => state.interviewers[interviewerId])
    : [];
}

export const updateSpots = (appointments, days, dayI) => {
  const day = days.find((day) => day.name === dayI);

  day.spots = day.appointments.filter(
    (appointmentId) => !appointments[appointmentId].interview
  ).length;
  console.log(
    "🚀 ~ file: selectors.js ~ line 32 ~ updateSpots ~ day.spots",
    day.spots
  );
  return days;
};

export const updateSpots2 = (days, id, value) => {
  days.forEach((day) => {
    if (day.appointments.includes(id)) {
      day.spots = parseInt(day.spots) + value;
    }
    console.log(day.spots);
  });
  return days;
};
