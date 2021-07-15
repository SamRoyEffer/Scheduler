import { useEffect, useState } from "react";
import * as hp from "helpers/selectors";
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
      .then(() => {
        const isUpdate = state.appointments[id].interview;
        const days = hp.updateSpots2([...state.days], id, isUpdate ? 0 : -1);
        setState({
          ...state,
          appointments,
          days,
        });
      })
      .catch((err) => console.log(`PUT /api/appointments/${id}`, err));
  }

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  function destroy(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = hp.updateSpots2([...state.days], id, 1);
    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState((prev) => ({
        ...prev,
        days,
        appointments,
      }));
    });
  }
  return [destroy, bookInterview, setDay, state];
}
