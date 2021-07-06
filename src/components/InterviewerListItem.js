import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
  const interviewClass = classNames("interviewers", {
    "interviewers__item--selected": props.selected,
    // "interviewers__item--selected-image": props.selected
  });
  const interviewImageClass = classNames("interviewers__item-image", {
    "interviewers__item-image--selected-image": props.selected,
  });
  return (
    <li className={interviewClass} onClick={props.setInterviewer}>
      <img
        className={interviewImageClass}
        src="https://i.imgur.com/LpaY82x.png"
        alt="Sylvia Palmer"
      />
      Sylvia Palmer
    </li>
  );
}
