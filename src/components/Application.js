import React from "react";
import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "./Appointment";
import * as selectors from "../helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

// main application adn redering of scheduler

export default function Application(props) {
  const [destroy, bookInterview, setDay, state] = useApplicationData();
  const appointments = selectors.getAppointmentsForDay(state, state.day);

  const schedule = appointments.map((appointment) => {
    const interview = selectors.getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={state.interviewers}
        bookInterview={bookInterview}
        destroy={destroy}
        days={state.days}
        day={state.day}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment time={props.time} />
      </section>
    </main>
  );
}
