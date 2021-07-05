import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayClass = classNames("day-list", {
    "day-list__item": true,
    "day-list__item--selected": props.selected === true,
    "day-list__item--full": props.spot === 0,
  });

  return (
    <li className={dayClass} onClick={props.onClick}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{props.spots}</h3>
    </li>
  );
}
