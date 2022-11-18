import {
    createInterviewDrive,
    addPanelistToDrive,
    getDrivePanelist,
    getDriveById,
    getAllPanelists,
    getAllAssociates,
    updatePanelistOfDrive,
    getDrivePanelistById,
    deleteDrivePanelistById,
    registerPanelist,
    getCalendarView,
    getPanelistForDate,
    getScheduledPanelistForDate,
    getNotScheduledPanelistForDate
} from "../utils/AppUtils";

const newDrive = (interviewDriveObj) => {
    return createInterviewDrive(interviewDriveObj);
}

const getInterviewDriveById = (driveId) => {
    return getDriveById(driveId);
}

const addPanelist = (panelistObj) => {
    return addPanelistToDrive(panelistObj);
}

const registerPanelistt = (panelistObj) => {
    return registerPanelist(panelistObj);
}

const getDrivePanelists = (driveId) => {
    return getDrivePanelist(driveId);
}

const getAllPanelist = () => {
    return getAllPanelists();
}

const getAllAssociate = (selServiceLine, selLOB) => {
    return getAllAssociates(selServiceLine, selLOB);
}

const updatePanelist = (panelistObj) => {
    return updatePanelistOfDrive(panelistObj);
}

const getPanelistById = (panelistId) => {
    return getDrivePanelistById(panelistId);
}

const deletePanelistById = (driveId, penalistId) => {
    return deleteDrivePanelistById(driveId, penalistId);
}

const getCalenderViewForDrivePanelist = (serviceLine) => {
    return getCalendarView(serviceLine);
}

const getPanelistForADate = (serviceLine, driveDate) => {
    return getPanelistForDate(serviceLine, driveDate);
}

const getPanelistNotScheduledForADate = (driveDate) => {
    return getNotScheduledPanelistForDate(driveDate);
}

const getPanelistScheduledForADate = (driveDate) => {
    return getScheduledPanelistForDate(driveDate);
}

const InterviewDriveService = {
    newDrive,
    addPanelist,
    getDrivePanelists,
    getInterviewDriveById,
    getAllPanelist,
    getAllAssociate,
    updatePanelist,
    getPanelistById,
    deletePanelistById,
    registerPanelistt,
    getCalenderViewForDrivePanelist,
    getPanelistForADate,
    getPanelistNotScheduledForADate,
    getPanelistScheduledForADate
};

export default InterviewDriveService;
