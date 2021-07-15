import React from "react";

import "./styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM_DELETE = "CONFIRM_DELETE";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW, true))
      .catch((err) => transition(ERROR_SAVE, true));
  }

  function destroy(event) {
    transition(DELETING, true);
    props
      .destroy(props.id)
      .then(() => transition(EMPTY, true))
      .catch((err) => {
        transition(ERROR_DELETE, true);
      });
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM_DELETE)}
        />
      )}
      {mode === CREATE && (
        <Form
          onSave={save}
          interviewers={props.interviewers}
          day={props.day}
          days={props.days}
          onCancel={back}
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          day={props.day}
          days={props.days}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === SAVING && <Status message={"SAVING"} />}
      {mode === CONFIRM_DELETE && (
        <Confirm
          message={"Are you sure you would like to delete?"}
          onConfirm={destroy}
          onCancel={back}
        />
      )}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === ERROR_SAVE && (
        <Error message={"Unable to save to server."} onClose={back} />
      )}
      {mode === ERROR_DELETE && (
        <Error message={"Unable to delete from server"} onClose={back} />
      )}
    </article>
  );
}
