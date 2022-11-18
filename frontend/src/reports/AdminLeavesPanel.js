import React, { useState, useEffect } from "react";
import { apiGetAllUserLeaves } from "../utils/AppUtils";
import AdminLeavesTable from "../forms/leave/AdminLeavesTable";
import "../css/leavetracker.css";
import Select from "react-select";


function AdminLeavesPanel() {
  const [associateData, setAssociateData] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const [LOB, setLOB] = useState("CT");
  const [serviceLine, setServiceLine] = useState("ADM")
  useEffect(() => {
    apiGetAllUserLeaves(year, LOB, serviceLine).then((data) => {
      // console.log(data);
      setAssociateData(data);
    }).catch((err) => {
      console.log(err)
      setAssociateData(null)
    });
  }, [year, LOB, serviceLine]);

  const selectYear = [
    { value: new Date().getFullYear(), label: new Date().getFullYear() },
    { value: new Date().getFullYear() + 1, label: new Date().getFullYear() + 1 },
    { value: new Date().getFullYear() + 2, label: new Date().getFullYear() + 2 },
    { value: new Date().getFullYear() + 3, label: new Date().getFullYear() + 3 },
    { value: new Date().getFullYear() + 4, label: new Date().getFullYear() + 4 }
  ]

  const selectLOB = [
    { value: "AM", label: "AM" },
    { value: "CB", label: "CB" },
    { value: "CCB", label: "CCB" },
    { value: "CIB - BT", label: "CIB - BT" },
    { value: "CIB - CMS", label: "CIB - CMS" },
    { value: "CIB - Digital", label: "CIB - Digital" },
    { value: "CIB - MI", label: "CIB - MI" },
    { value: "CIB - Tavisca", label: "CIB - Tavisca" },
    { value: "CT", label: "CT" },
    { value: "CyberSecurity", label: "CyberSecurity" },
    { value: "GTI", label: "GTI" },
    { value: "PMO", label: "PMO" }
  ]

  const selectServiceLine = [
    { value: "ADM", label: "ADM" },
    { value: "BFS", label: "BFS" },
    { value: "Corp Sec", label: "Corp Sec" },
    { value: "EAS-PEGA", label: "EAS-PEGA" },
    { value: "ISG", label: "ISG" },
    { value: "PMOSS", label: "PMOSS" },
    { value: "EAS-IPM", label: "EAS-IPM" },
    { value: "EAS-MSD", label: "EAS-MSD" },
    { value: "EAS-OSP", label: "EAS-OSP" },
    { value: "EAS-PS", label: "EAS-PS" },
    { value: "CDB - AIA", label: "CDB-AIA" },
    { value: "CDB - INT", label: "CDB-INT" },
    { value: "CDB - IOT", label: "CDB-IOT" },
    { value: "CDBDX", label: "CDBDX" },
    { value: "CDB-Ops", label: "CDB-Ops" },
    { value: "CDE", label: "CDE" },
    { value: "CDE - SoftVision", label: "CDE - SoftVision" },
    { value: "CIS", label: "CIS" },
    { value: "Consulting", label: "Consulting" },
    { value: "Contino", label: "Contino" },
    { value: "CDE", label: "CDE" },
    { value: "IPA Consulting", label: "IPA Consulting" },
    { value: "QE&A", label: "QE&A" },
    { value: "Softvision", label: "Softvision" },
    
  ]
  

  return (
    <div>
      <span className="developedby">Developed by Sagar(2130352),Vikas(2097601),Shubham(2113068)</span>
      <div>
        <div
          className="leaveTrackerHeader"
          style={{ justifyContent: "flex-start" }}
        >
          <label className="formheading">
            Year :
          </label>
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
          &nbsp;
          &nbsp;&nbsp;
          <label className="formheading">
            LOB :
          </label>
          <Select
            defaultValue={{ label: LOB, value: LOB }}
            options={selectLOB}
            name="lob"
            className="yearDropDown"
            onChange={(e) => {
              const { name, value } = e;
              setLOB(value);
            }}
          >

          </Select>
          &nbsp;   &nbsp;   &nbsp;
          <label className="formheading">
            Service LIne :
          </label>
          <Select
            defaultValue={{ label: serviceLine, value: serviceLine }}
            name="serviceLine"
            className="yearDropDown"
            options={selectServiceLine}
            onChange={(e) => {
              const { name, value } = e;
              setServiceLine(value);
            }}
          >
          </Select>
        </div>
        {associateData && <AdminLeavesTable data={associateData} year={year} LOB={LOB} serviceLine={serviceLine}></AdminLeavesTable>}
      </div>

    </div>
  );
}

export default AdminLeavesPanel;
