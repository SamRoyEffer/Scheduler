export function getAppointmentsForDay(state, day) {
  console.log("SSATTEE", state.days);
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

export const updateSpots2 = (days, id, value) => {
  return days.map((day) => {
    if (day.appointments.includes(id)) {
      day = {
        ...day,
        spots: parseInt(day.spots) + value,
      };
    }
    return day;
  });
};

export const updateSpots = (appointments, days, dayI) => {
  const day = days.find((day) => day.name === dayI);

  day.spots = day.appointments.filter(
    (appointmentId) => !appointments[appointmentId].interview
  ).length;

  return days;
};

const actions = {
  update: 0,
  create: -1,
  delete: 1,
};

export const updateSpots3 = (state, action) => {
  const dayIndex = state.days.findIndex((day) => day.name === state.day);
  const day = {
    ...state.days[dayIndex],
    spots: parseInt(state.days[dayIndex].spots) + actions[action],
  };
  const days = [...state.days];
  days.splice(dayIndex, 1, day);
  return days;
};
