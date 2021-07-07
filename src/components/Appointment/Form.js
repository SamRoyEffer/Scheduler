import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  const defaultState = {
    studentName: "",
    interviewerId: null,
  };

  const [state, setState] = useState({
    studentName: props.name || "",
    interviewerId: props.interviewer || null,
  });
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const updateState = (data) => {
    setState(
      data
        ? {
            ...state,
            ...Button(
              data.name && data.value
                ? { [data.name]: data.value }
                : { ...data }
            ),
          }
        : defaultState
    );
  };

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
            /*
          This must be a controlled component
        */
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer}
          setInterviewer={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={reset}>
            Cancel
          </Button>
          <Button confirm onClick={() => props.onSave(name, interviewer)}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
