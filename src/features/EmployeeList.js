import { createSlice } from "@reduxjs/toolkit";

export const EmployeeListSlice = createSlice({
  name: "EmployeeList",
  initialState: {
    data: {
      body: { listEmployee: JSON.parse(localStorage.getItem("employees")) },
    },
  },
  reducers: {
    addEmployee: (state, employee) => {
      const employees = state.data.body.listEmployee;
      employees.push(employee.payload);
      localStorage.setItem("employees", JSON.stringify(employees));
    },
  },
});

const { actions, reducer } = EmployeeListSlice;
export const { addEmployee } = actions;
export default reducer;
