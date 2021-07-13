import React from "react";
import DayListItem from "components/DayListItem";
export default function DayList(props) {
  const dayArray = props.days.map((day, _index) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={props.day === day.name}
        setDay={props.setDay}
        days={props.days}
      />
    );
  });

  return <ul>{dayArray}</ul>;
}
