import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { useState } from "react";
export default function EmployeeList() {
  const employeeList = useSelector(
    (state) => state.employee.data.body.listEmployee
  );
  const [searchTerm, setSearchTerm] = useState("");
  function handleChange(event) {
    setSearchTerm(event.target.value);
  }
  const columns = [
    { name: "First Name", selector: (row) => row.firstName, sortable: true },
    { name: "Last Name", selector: (row) => row.lastName, sortable: true },
    { name: "Start Date", selector: (row) => row.startDate, sortable: true },
    { name: "Department", selector: (row) => row.department, sortable: true },
    {
      name: "Date of Birth",
      selector: (row) => row.dateOfBirth,
      sortable: true,
    },
    { name: "Street", selector: (row) => row.street, sortable: true },
    { name: "City", selector: (row) => row.city, sortable: true },
    { name: "State", selector: (row) => row.state, sortable: true },
    { name: "Zip Code", selector: (row) => row.zipCode, sortable: true },
  ];

  return (
    <>
      <div id="employee-div" className="container">
        <h1>Current Employees</h1>
        {employeeList ? (
          <div style={{ width: "80%" }}>
            <div
              id="employee-table_filter"
              class="dataTables_filter"
              bis_skin_checked="1"
            >
              <label>
                Search:
                <input
                  type="search"
                  class=""
                  style={{ marginLeft: "10px" }}
                  placeholder=""
                  aria-controls="employee-table"
                  onChange={handleChange}
                />
              </label>
            </div>
            <DataTable
              columns={columns}
              pagination
              data={employeeList.filter((item) => {
                if (searchTerm === "") {
                  return item;
                } else {
                  let tmp = [];
                  Object.values(item).forEach((elt) => {
                    if (elt.toLowerCase().includes(searchTerm.toLowerCase())) {
                      tmp.push(item);
                    }
                  });
                  if (tmp.length !== 0) {
                    return tmp;
                  }
                }
              })}
            />
          </div>
        ) : (
          "No Data"
        )}

        <Link to="/">Home</Link>
      </div>
    </>
  );
}
