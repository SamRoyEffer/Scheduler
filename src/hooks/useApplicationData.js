import { useEffect, useState } from "react";
import axios from "axios";
const defaultState = {
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: [],
};

export default function useApplicationData() {
  const [state, setState] = useState(defaultState);

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      console.log("ALL", all);
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then((res) => {
        setState({
          ...state,
          appointments,
        });
      })
      .catch((err) => console.log(`PUT /api/appointments/${id}`, err));
  }

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  function destroy(id) {
    return axios.delete(`/api/appointments/${id}`).then((res) => {
      setState((prev) => ({
        ...prev,
        appointments: {
          ...prev.appointments,
          [id]: {
            ...prev.appointments[id],
            interview: null,
          },
        },
      }));
    });
  }

  return [destroy, bookInterview, setDay, state];
}
