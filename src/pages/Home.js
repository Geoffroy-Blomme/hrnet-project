import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import SelectMenu from "../components/SelectMenu";
import { useDispatch } from "react-redux";
import { addEmployee } from "../features/EmployeeList";
import Modal from "../components/Modal";
import { DatePicker } from "oc-gb-date-picker";
import { states } from "./../utils/states";

export default function Home() {
  const [modalIsHidden, setModalIsHidden] = useState(true);
  const [startDateIsHidden, setStartDateIsHidden] = useState(true);
  const dispatch = useDispatch();
  const birthDateId = "birth-date";
  const startDateId = "start-date";
  const dateMenu = useRef(null);
  const stateSelectOptions = states.map((state, index) => {
    return { label: state.name, value: state.abbreviation };
  });
  const stateSelectId = "state";
  const [stateSelectValue, setStateSelectValue] = useState(
    states[0].abbreviation
  );

  const departmentSelectOptions = [
    { value: "Sales", label: "Sales" },
    { value: "Marketing", label: "Marketing" },
    { value: "Engineering", label: "Engineering" },
    { value: "Human Resources", label: "Human Resources" },
    { value: "Legal", label: "Legal" },
  ];

  const departmentSelectId = "department";
  const [departmentSelectValue, setDepartmentSelectValue] = useState(
    departmentSelectOptions[0].label
  );

  const setStartDateIsHiddenToTrue = (e) => {
    if (
      dateMenu.current &&
      startDateIsHidden &&
      !dateMenu.current.contains(e.target)
    ) {
      setStartDateIsHidden(true);
    }
  };
  document.addEventListener("mousedown", setStartDateIsHiddenToTrue);
  const setModalIsHiddenToTrue = () => {
    setModalIsHidden(true);
  };
  const body = document.body;

  if (!modalIsHidden) {
    body.style.overflow = "hidden";
  } else {
    body.style.overflow = "initial";
  }
  function saveEmployee() {
    const firstName = document.getElementById("first-name");
    const lastName = document.getElementById("last-name");
    const dateOfBirth = document.getElementById(`${birthDateId}`);
    const startDate = document.getElementById(`${startDateId}`);
    const street = document.getElementById("street");
    const city = document.getElementById("city");
    const zipCode = document.getElementById("zip-code");

    const employee = {
      firstName: firstName.value,
      lastName: lastName.value,
      dateOfBirth: dateOfBirth.value,
      startDate: startDate.value,
      department: departmentSelectValue,
      street: street.value,
      city: city.value,
      state: stateSelectValue,
      zipCode: zipCode.value,
    };
    dispatch(addEmployee(employee));
    setModalIsHidden(false);
  }

  return (
    <>
      <div className="title">
        <h1>HRnet</h1>
      </div>
      <div className="container">
        <Link to="/employee-list">View Current Employees</Link>
        <h2>Create Employee</h2>
        <form action="#" id="create-employee" style={{ marginBottom: "20px" }}>
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" />

          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" />

          <label htmlFor="date-of-birth">Date of Birth</label>
          <DatePicker id={birthDateId} yearsForward={2}></DatePicker>
          <label htmlFor="start-date">Start Date</label>

          <DatePicker id={startDateId}></DatePicker>
          <fieldset
            className="address"
            style={{ padding: "10px 80px 10px 20px" }}
          >
            <legend>Address</legend>

            <label htmlFor="street">Street</label>
            <input id="street" type="text" />

            <label htmlFor="city">City</label>
            <input id="city" type="text" />

            <label htmlFor="state">State</label>
            <SelectMenu
              id={stateSelectId}
              onChangeHandler={setStateSelectValue}
              options={stateSelectOptions}
            ></SelectMenu>

            <label htmlFor="zip-code">Zip Code</label>
            <input id="zip-code" type="number" />
          </fieldset>

          <label htmlFor="department">Department</label>
          <SelectMenu
            id={departmentSelectId}
            onChangeHandler={setDepartmentSelectValue}
            options={departmentSelectOptions}
          ></SelectMenu>
        </form>

        <button onClick={saveEmployee}>Save</button>
      </div>
      <Modal
        isHidden={modalIsHidden}
        setModalIsHiddenToTrue={setModalIsHiddenToTrue}
      ></Modal>
    </>
  );
}
