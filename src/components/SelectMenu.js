import { createElement } from "react";
import { states } from "./../utils/states";

export default function SelectMenu() {
  return (
    <>
      {states.map((state, index) => {
        const option = createElement(
          "option",
          {
            value: state.abbreviation,
            key: index,
          },
          state.name
        );
        return option;
      })}
    </>
  );
}
