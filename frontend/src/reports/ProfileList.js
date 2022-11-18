import React, { useState, useEffect } from "react";
import DataService from "../services/data.service";
import Button from "react-validation/build/button";
import "../css/profilelist.css";
import { UI_URL } from "../common/constants";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
const ProfileList = () => {
  const [profilesData, setProfilesData] = useState([]);
  const [hadRecords, setHasRecords] = useState(false);
  const [feedbackContent, setFeedbackContent] = useState("");

  useEffect(() => {
    DataService.getAllProfiles().then(
      (response) => {
        setProfilesData(response);
        setHasRecords(response.length > 0);
      },
      (error) => {
        const _content =
          (error.response && error.response) ||
          error.message ||
          error.toString();
      }
    );
  }, []);

  const downloadResume = index => e => {
    const linkSource = `data:application/pdf;base64,${profilesData[index].data}`;
    const link = document.createElement("a");
    link.href = linkSource;
    link.download = "resume";
    link.click();
  };
  

  const renderTableData = () => {
    return profilesData.map((profile, index) => {
      let onsiteFlag = profile.isOnsite ? "Yes" : "";
      let internalFlag = profile.isInternal ? "Yes" : "";
      let isProfileAvailable = profile.data ? true : false;

      const renderProfileLink = () => {
        return (
          <button onClick={downloadResume(index)} className="btn btn-primary">
            profile
          </button>
        );

      };
      /*----------------------------------------------------------*/
      const renderFeedback = () => {
        return profile.feedbacks.map((feedback, index) => {
          return (
            <div>
              <p> {feedback.evaluationDate + ": " + feedback.result.result}</p>
            </div>
          );
        }); //ends return loop
      };
      /*****888888888888888888888888888888888888888888888888888888888888 */
      

      return (

        
        <tr key={profile.id} className="profilerow">
          <td className="tdcentercontent">{index + 1}</td>
          <td className="tdleftcontent">{profile.associateId}</td>
          <td className="tdleftcontent">{profile.candidateId}</td>
          <td className="tdleftcontent">
            <Link to={UI_URL + "forms/feedback/" + profile.id}>
              {profile.fullName}
            </Link>
          </td>
          <td className="tdleftcontent">{profile.email}</td>
          <td className="tdleftcontent">{profile.phone}</td>
          <td className="tdleftcontent">{profile.city}</td>
          <td className="tdcentercontent">{onsiteFlag}</td>
          <td className="tdcentercontent">{internalFlag}</td>
          <td className="tdleftcontent">{profile.entryDate}</td>
          <td className="tdleftcontent">{profile.skill.skillName}</td>

          <td className="tdleftcontent">{renderFeedback()}</td>
          {isProfileAvailable && <td className="tdcentercontent">{renderProfileLink()}</td>}
        </tr>
      );
    });
  };

  return (
    <div>
      <label className="formheading">Profiles</label> 
      <br></br>
        <div className="main">

          <div className="search">
            <TextField
              id="outlined-basic"
              variant="outlined"
              fullWidth
              label="Associate ID"
            />
          </div>
          {/* <{profile.associateId} /> */}
        </div>
    
      <table className="gdvheader" width="100%">
        <tbody>
          <tr>
            <th key="0">S. No</th>
            <th key="1" className="tdleftcontent">
              Associate ID
            </th>
            <th key="2" className="tdleftcontent">
              Candidate ID
            </th>
            <th key="3" className="tdleftcontent">
              Full Name
            </th>
            <th key="4" className="tdleftcontent">
              Email
            </th>
            <th key="5" className="tdleftcontent">
              Phone
            </th>
            <th key="6" className="tdleftcontent">
              City
            </th>
            <th key="7" className="tdcentercontent">
              Is Onsite
            </th>
            <th key="8" className="tdcentercontent">
              Is Internal
            </th>
            <th key="9" className="tdleftcontent">
              Entry Date
            </th>
            <th key="10" className="tdleftcontent">
              Skill Family
            </th>
            <th key="11" className="tdleftcontent">
              Feedback
            </th>
            <th key="12" className="tdleftcontent">
              Profile
            </th>
          </tr>
          {renderTableData()}
        </tbody>
      </table>
    </div>
  );
};

export default ProfileList;
