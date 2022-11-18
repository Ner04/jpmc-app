import React, { useEffect, useState } from "react";
import { apiSetLeaves } from "../../utils/AppUtils";

function LeaveTable({ data, year }) {
  const [leaveRequests, setLeavesRequest] = useState([]);
  const [leaveData, setLeaveData] = useState(data);

  useEffect(() => {
    setLeaveData(data);
    setLeavesRequest([]);
  }, [data]);

  const handleChange = (e) => {
    const { name, id, value } = e.target;
    var data = leaveData;
    const month = e.target.getAttribute("month");
    data[month].statusArrayList[id - 1] = value;
    console.log(data[month]);
    setLeaveData(data);
    // console.log(e.target.getAttribute("month"));
    setLeavesRequest((prev) => [
      ...prev,

      {
        month: name,
        day: id,
        status: value,
        year: year,
      },
    ]);
  };

  const handleSaveChanges = () => {
    apiSetLeaves({ leaveRequestParamsArrayList: leaveRequests }, year).then(
      (data) => {
        alert("Your changes have been saved successfully");
        setLeavesRequest([]);
        setLeaveData(data.monthStatusPOJOS);
      }
    );
  };

  return (
    <div className="leaveTrackerTableContainer">
      <table className="leaveTrackerTable">
        <tr>
          <th className="task">Days of month</th>
          <th className="task">Total working days</th>
          <th className="task">1</th>
          <th className="task">2</th>
          <th className="task">3</th>
          <th className="task">4</th>
          <th className="task">5</th>
          <th className="task">6</th>
          <th className="task">7</th>
          <th className="task">8</th>
          <th className="task">9</th>
          <th className="task">10</th>
          <th className="task">11</th>
          <th className="task">12</th>
          <th className="task">13</th>
          <th className="task">14</th>
          <th className="task">15</th>
          <th className="task">16</th>
          <th className="task">17</th>
          <th className="task">18</th>
          <th className="task">19</th>
          <th className="task">20</th>
          <th className="task">21</th>
          <th className="task">22</th>
          <th className="task">23</th>
          <th className="task">24</th>
          <th className="task">25</th>
          <th className="task">26</th>
          <th className="task">27</th>
          <th className="task">28</th>
          <th className="task">29</th>
          <th className="task">30</th>
          <th className="task">31</th>
        </tr>
        {leaveData.map((monthData, ind) => {
          return (
            <tr key={ind} className={ind % 2 == 0 ? "yellow" : "green"}>
              <td className="leaveTrackerMonth">{monthData.month}</td>
              <td className="workingdayscol">
                {" "}
                {
                  monthData.statusArrayList.filter((status) => status == "W")
                    .length
                }
              </td>
              {monthData.statusArrayList.map((status, index) => {
                return (
                  <td key={index} className={"leaveTrackerStatusSelection"}>
                    <select
                      name={monthData.month}
                      id={index + 1}
                      value={status}
                      month={ind}
                      disabled={status === "H"}
                      onChange={handleChange}
                      className={"leaveTableCell" + " noDrop " + status}
                      onMouseEnter={(e) => {
                        e.target.className = "leaveTableCell ";
                      }}
                      onMouseLeave={(e) => {
                        e.target.className =
                          "leaveTableCell" + " noDrop " + status;
                      }}
                    >
                      <option value="L">L</option>
                      <option value="W">W</option>
                      {status === "H" && <option value="H">H</option>}
                    </select>
                  </td>
                );
              })}
              {monthData.statusArrayList.length + 1 <= 31 && (
                <td className="leaveTrackerStatusSelection"></td>
              )}
              {monthData.statusArrayList.length + 2 <= 31 && (
                <td className="leaveTrackerStatusSelection"></td>
              )}
              {monthData.statusArrayList.length + 3 <= 31 && (
                <td className="leaveTrackerStatusSelection"></td>
              )}
            </tr>
          );
        })}
      </table>

      <button className="leavesTrackerSaveButton" onClick={handleSaveChanges}>
        Save Changes
      </button>
    </div>
  );
}

export default LeaveTable;
