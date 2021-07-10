import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";

export default function InterviewerList(props) {
  const listOfInterviewers = Object.keys(props.interviewers).map(
    (interviewer) => {
      return (
        <InterviewerListItem
          key={props.interviewers[interviewer].id}
          id={props.interviewers[interviewer].id}
          name={props.interviewers[interviewer].name}
          avatar={props.interviewers[interviewer].avatar}
          setInterviewer={(id) => props.setInterviewer(id)}
          selected={props.interviewers[interviewer].id === props.interviewer}
          onChange={() => props.onChange(props.interviewers[interviewer].id)}
        />
      );
    }
  );
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{listOfInterviewers}</ul>
    </section>
  );
}
