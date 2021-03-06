import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

//get the specfic list of interviewers for the selected day

export default function InterviewerListItem(props) {
  const interviewClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  return (
    <li
      className={interviewClass}
      onClick={() => props.setInterviewer(props.id)}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      <h3>{props.selected && props.name}</h3>
    </li>
  );
}
