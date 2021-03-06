import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import { getInterviewersForDay } from "helpers/selectors";

export default function Form(props) {
  const defaultState = {
    studentName: "",
    interviewerId: null,
    days: [],
    interviewerIds: null,
  };

  const [state, setState] = useState({
    studentName: props.name || "",
    interviewerId: props.interviewer || null,
    days: props.days || [],
    interviewers: props.interviewers || [],
  });
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const interviewData = getInterviewersForDay(state, props.day);

  //validates the form for a user and interviewer

  function validate() {
    if (!name) {
      setError("Student name cannot be blank");
      return;
    }
    if (!interviewer) {
      setError("Please Select Interviewer");
      return;
    }

    setError("");
    props.onSave(name, interviewer);
  }

  function enterPress(event) {
    if (event.key === "Enter" || event.key === "NumpadEnter") {
      event.preventDefault();
      validate();
    }
  }
  //resets the form when new interview is esstablished
  function reset() {
    setName("");
    setInterviewer("");
    props.onCancel();
  }
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="studentName"
            value={name}
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => setName(event.target.value)}
            data-testid="student-name-input"
            onKeyPress={enterPress}
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={interviewData}
          interviewer={interviewer}
          setInterviewer={(id) => setInterviewer(id)}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={reset}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
