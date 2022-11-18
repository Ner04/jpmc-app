import React, { useState, useEffect } from "react";

function AdminLeavesTable({ data, year, LOB, serviceLine }) {
  var dates = [];
  // console.log(year)

  const [yearStatus, setYearStatus] = useState(year);
  const isLeap =
    yearStatus % 400 === 0 || (yearStatus % 4 === 0 && yearStatus % 100 !== 0)
      ? 1
      : 0;
  const [status, setStatus] = useState(data);
  var startDate = new Date(yearStatus, 0, 1);
  for (let i = 1; i <= 365 + isLeap; i++) {
    let temp =
      "" +
      startDate.getDate() +
      "/" +
      (startDate.getMonth() + 1) +
      "/" +
      startDate.getFullYear();
    dates.push(temp);
    startDate.setDate(startDate.getDate() + 1);
  }

  useEffect(() => {
    setStatus(data);
    setYearStatus(year);
  }, [data]);

  //get month and year
  const getMonth = (str) => {
    var arr = str.split("/");
    return parseInt(arr[1]);
  };
  console.log(status)
  return (
    <div>
      <table className="leaveTrackerTable">
        <tr>
          <th className="purpleT" style={{fontWeight:"bold",fontSize:"1rem"}}>Employee/Date</th>
          <th className="yellowT adminTableHeader">Year</th>
          <th className="purpleT adminTableHeader">January</th>
          <th className="yellowT adminTableHeader">February</th>
          <th className="purpleT adminTableHeader">March</th>
          <th className="yellowT adminTableHeader">April</th>
          <th className="purpleT adminTableHeader">May</th>
          <th className="yellowT adminTableHeader">June</th>
          <th className="purpleT adminTableHeader">July</th>
          <th className="yellowT adminTableHeader">August</th>
          <th className="purpleT adminTableHeader">September</th>
          <th className="yellowT adminTableHeader">October</th>
          <th className="purpleT adminTableHeader">November</th>
          <th className="yellowT adminTableHeader">December</th>
          {dates.map((dat) => {
            return (
              <th
                className={
                  "verticalText adminTableheader " +
                  (getMonth(dat) % 2 === 1 ? "purpleT" : "yellowT")
                }
                style={{ writingMode:" vertical-lr"}}
              >
                {dat}
              </th>
            );
          })}
        </tr>
        {status.map((emp, index) => {
          return (
            <tr>
              <td className="purpleT">{emp.fullName + "(" + emp.associateId + ")"}</td>
              <td className="yellowT">
                {emp.monthStatusPOJOS.reduce((total, month, ind) => {
                  return (
                    month.statusArrayList.filter((status, i) => status == "W")
                      .length + total
                  );
                }, 0)}
              </td>
              {emp.monthStatusPOJOS.map((month, ind) => {
                return (
                  <td className={ind % 2 === 0 ? "purpleT" : "yellowT"}>
                    {
                      month.statusArrayList.filter((status, i) => status == "W")
                        .length
                    }
                  </td>
                );
              })}
              {emp.monthStatusPOJOS.map((month, ind) => {
                return month.statusArrayList.map((status, i) => {
                  return (
                    <td
                      className={
                        ind % 2 == 0 ? "purpleT small" : "yellowT small"
                      }
                    >
                      {status}
                    </td>
                  );
                });
              })}
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default AdminLeavesTable;
