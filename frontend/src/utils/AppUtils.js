import { ACCESS_TOKEN } from "../common/constants";
import { API_URL } from "../common/constants";

const request = (options) => {
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append(
      "Authorization",
      "Bearer " + localStorage.getItem(ACCESS_TOKEN)
    );
  }

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then((response) =>
    response.json().then((json) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
  );
};

export function apiGetCurrentUser() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: API_URL + "/user/me",
    method: "GET",
  });
}

export function apiLogin(loginRequest) {
  return request({
    url: API_URL + "/auth/signin",
    method: "POST",
    body: JSON.stringify(loginRequest),
  });
}

export function apiGetAssignmentReportNames() {
  return request({
    url: API_URL + "/data/getAssignmentReports/"  ,

    method: "GET",
  });
}


export function apiGetAllSkillFamily() {
  return request({
    url: API_URL + "/forms/getAllSkillFamilies",
    method: "GET",
  });
}

export function apiGetAssignmentReportStat(reportID, paramId , serviceLine) {
  return request({
    url:
      API_URL +
      "/stat/getReportData/"+serviceLine+"?reportID=" +
      reportID +
      "&paramId=" +
      paramId,
    method: "GET",
  });
}

export function apiGetAllProfiles() {
  return request({
    url: API_URL + "/data/getAllProfilesFromServer",
    method: "GET",
  });
}

export function apiGetBillablePlan(selPractice, selLOB) {
  return request({
    url:
      API_URL +
      "/data/apiGetBillablePlan?selPractice=" +
      selPractice +
      "&selLOB=" +
      selLOB,
    method: "GET",
  });
}

export function apiGetFilteredBillablePlan(
  selPractice,
  categoryId,
  grade,
  location
) {
  return request({
    url:
      API_URL +
      "/data/filteredbillableplans?selPractice=" +
      selPractice +
      "&categoryId=" +
      categoryId +
      "&grade=" +
      grade +
      "&location=" +
      location,
    method: "GET",
  });
}

export function apiEvalautionResults() {
  return request({
    url: API_URL + "/data/getAllEvaluationResults",
    method: "GET",
  });
}

export function apiProfileRejectionCategories() {
  return request({
    url: API_URL + "/data/getAllEvaluationResultCategory",
    method: "GET",
  });
}

export function apiGetProfileInfo(profileId) {
  return request({
    url: API_URL + "/data/getProfileInfo?profileId=" + profileId,
    method: "GET",
  });
}

export function apiAddProfileFeedback(createProfileFeedback) {
  return request({
    url: API_URL + "/forms/addProfilefeedback",
    method: "POST",
    body: JSON.stringify(createProfileFeedback),
  });
}

export function apiGetAssignmentReport(reportID, paramId) {
  return request({
    url:
      API_URL +
      "/data/getAssignmentReport?reportID=" +
      reportID +
      "&paramId=" +
      paramId,
    method: "GET",
  });
}

export function apiGetBillableCategories() {
  return request({
    url: API_URL + "/data/apiGetBillableCategories",
    method: "GET",
  });
}

export function apiGetPracticeList() {
  return request({
    url: API_URL + "/data/apiGetPracticeList",
    method: "GET",
  });
}

export function apiGetLOBList() {
  return request({
    url: API_URL + "/data/apiGetLOBList",
    method: "GET",
  });
}

export function apiAddBillabilityPlan(objBillabilityPlan) {
  return request({
    url: API_URL + "/forms/addbillabilityplan",
    method: "POST",
    body: JSON.stringify(objBillabilityPlan),
  });
}

export function apiGetBillabilityReportData(selPractice) {
  return request({
    url: API_URL + "/report/apiGetBillableReport?selPractice=" + selPractice,
    method: "GET",
  });
}

export function apiGetAssociateBillabilityHistory(associateId) {
  return request({
    url: API_URL + "/data/apiGetBillablePlanHistory?associateId=" + associateId,
    method: "GET",
  });
}

export function getAllServiceLines() {
  return request({
    url: API_URL + "/getAllServiceLines",
    method: "GET",
  });
}

export function getAllDrives() {
  return request({
    url: API_URL + "/getAllDrives",
    method: "GET",
  });
}

export function getAllPanelists() {
  return request({
    url: API_URL + "/panelists",
    method: "GET",
  });
}

export function getAllAssociates(selServiceLine, selLOB) {
  return request({
    url: API_URL + `/allAssociates/${selServiceLine}/${selLOB}`,
    method: "GET",
  });
}

export function getDriveById(driveId) {
  return request({
    url: API_URL + `/drive/${driveId}`,
    method: "GET",
  });
}

export function createInterviewDrive(interviewDriveObj) {
  return request({
    url: API_URL + "/create-interview-drive",
    method: "POST",
    body: JSON.stringify(interviewDriveObj),
  });
}

export function addPanelistToDrive(panelistObj) {
  return request({
    url: API_URL + "/add-panelist",
    method: "POST",
    body: JSON.stringify(panelistObj),
  });
}

export function registerPanelist(panelistObj) {
  return request({
    url: API_URL + "/register-panelist",
    method: "POST",
    body: JSON.stringify(panelistObj),
  });
}

export function updatePanelistOfDrive(panelistObj) {
  console.log(panelistObj);
  return request({
    url: API_URL + "/updatePanelist",
    method: "PUT",
    body: JSON.stringify(panelistObj),
  });
}

export function getDrivePanelist(driveId) {
  return request({
    url: API_URL + `/getAllPanelist/${driveId}`,
    method: "GET",
  });
}

export function getDrivePanelistById(penalistId) {
  return request({
    url: API_URL + `/getPenalistByid/${penalistId}`,
    method: "GET",
  });
}

export function deleteDrivePanelistById(driveId, penalistId) {
  return request({
    url: API_URL + `/deletePanelist/${driveId}/${penalistId}`,
    method: "DELETE",
  });
}

export function getCalendarView(serviceLine) {
  return request({
    url: API_URL + `/calendar-view/${serviceLine}`,
    method: "GET",
  });
}

export function getPanelistForDate(serviceLine, driveDate) {
  return request({
    url: API_URL + `/panelist-calendar-view/${serviceLine}/${driveDate}`,
    method: "GET",
  });
}

export function getScheduledPanelistForDate(driveDate) {
  return request({
    url: API_URL + `/scheduled-panelist/${driveDate}`,
    method: "GET",
  });
}

export function getNotScheduledPanelistForDate(driveDate) {
  return request({
    url: API_URL + `/not-scheduled-panelist/${driveDate}`,
    method: "GET",
  });
}

export function apiGetLeaves(year) {
  return request({
    url: API_URL + "/leaves/getLeaveDetails/"+year,
    method: "GET",
  });
}

export function apiSetLeaves(objLeaves,year) {
  return request({
    url: API_URL + "/leaves/setLeaveDetails/"+year,
    method: "PUT",
    body: JSON.stringify(objLeaves),
  });
}

export function apiGetAllUserLeaves(year,LOB,serviceLine) {
  return request({
    url: API_URL + "/leaves/getAllUserLeaveDetails/"+year+"/"+LOB+"/"+serviceLine,
    method: "GET",
  });
}