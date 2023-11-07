import { createElement } from "react";
import Select from "react-select";

export default function SelectMenu(props) {
  let { id, onChangeHandler, options } = props;

  return (
    <>
      <Select
        inputId={id}
        isSearchable={false}
        options={options}
        defaultValue={options[0]}
        onChange={(choice) => {
          onChangeHandler(choice.value);
          console.log(choice.value);
        }}
      ></Select>
    </>
  );
}
