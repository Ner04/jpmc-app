import React, { useEffect, useState } from "react";
import { apiGetLeaves } from "../../utils/AppUtils";
import LeaveTable from "./LeaveTable"
import "../../css/leavetracker.css";
import "../../css/general.css";
import Select from "react-select";
function Leave() {
  const [leavesData, setLeavesData] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());
  useEffect(() => {
    apiGetLeaves(year).then((data) => {
      console.log(data);
      setLeavesData(data);
    });
  }, [year]);

  const selectYear = [
    { value: new Date().getFullYear(), label: new Date().getFullYear() },
    { value: new Date().getFullYear() + 1, label: new Date().getFullYear() + 1 },
    { value: new Date().getFullYear() + 2, label: new Date().getFullYear() + 2 },
    { value: new Date().getFullYear() + 3, label: new Date().getFullYear() + 3 },
    { value: new Date().getFullYear() + 4, label: new Date().getFullYear() + 4 }
  ]


  return (
    <div className="leaveTrackerContainer">
      <span className="developedby">
        Developed by: Sagar (2130352), Vikas (2097601), Shubham (2113068)
      </span>
      {leavesData && (
        <div className="leaveTrackerHeader">
          <div className="formheading">
            Employee : {leavesData.fullName}({leavesData.associateId})
          </div>
          <div className="leavesYear">
            <td>
              <label className="formheading">Year :</label>
            </td>
            <td>

              {year && (

                <Select
                  defaultValue={{ label: year, value: year }}
                  name="year"
                  options={selectYear}
                  className="yearDropDown"
                  onChange={(e) => {
                    const { name, value } = e;
                    setYear(value);
                  }}
                >
                </Select>
              )}
            </td>
          </div>
        </div>
      )}
      {leavesData && (
        <LeaveTable data={leavesData.monthStatusPOJOS} year={year}></LeaveTable>
      )}
    </div>
  );
}

export default Leave;
