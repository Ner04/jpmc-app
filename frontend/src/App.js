import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import AuthService from "./services/auth.service";
import Layout from "./structure/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./general/Home";
import Test from "./general/Test";
import Profile from "./general/Profile";
import { APP_NAME } from "./common/constants";
import { Outlet } from "react-router-dom";
import Header from "./structure/Header";
import Navbar from "./structure/Navbar";
// import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";
import MultilevelMenu from "./structure/MultilevelMenu";
import { menuData } from "./menuItems";
import Logout from "./auth/Logout";
import UploadAssignment from "./forms/uploadassignment";
import InternalProfile from "./forms/profiles/internalprofile";
import AllProfiles from "./reports/ProfileList";
import ProfileFeedback from "./forms/profiles/feedback";
import ExternalProfile from "./forms/profiles/externalprofile";
import PyramidByProject from "./reports/PyramidByProject";
import PyramidByLOB from "./reports/PyramidByLOB";
import PyramidByPractice from "./reports/PyramidByPractice";
import BillabilityReport from "./reports/billabilityreport";
import PrivateRoute from "./common/PrivateRoute";
import PublicRoute from "./common/PublicRoute";
import BillabilityPlan from "./forms/billability/BillabilityPlan";
import FilteredBillabilityPlan from "./forms/billability/FilteredBillabilityPlan";
import BillabilityPlanHistory from "./forms/billability/BillabilityPlanHistory";
import InterviewDriveList from "./drives/InterviewDriveList";
import InterviewDriveForm from "./drives/InterviewDriveForm";
import PanelNomineeForm from "./drives/PanelNomineeForm";
import DrivePanelists from "./drives/DrivePanelists";
import AllPanelists from "./drives/AllPanelists";
import AllAssociates from "./drives/AllAssociates";
import EditPanelistForm from "./drives/EditPanelistForm";
import Calendar from "./drives/CalendarView/Calendar";
import RegisterPanelist from "./drives/RegisterPanelist";
import OnDatePanelist from "./drives/OnDatePanelist";
import Leave from "./forms/leave/Leave";
import AdminLeavesPanel from "./reports/AdminLeavesPanel"
import ForgetPassword from "./auth/ForgetPassword";
import UpdatePassword from "./auth/UpdatePassword";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  return (
    <div className="App">
      <MultilevelMenu data={menuData} currentUser={currentUser} />

      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <PublicRoute user={currentUser}>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/ui/login"
            element={
              <PublicRoute user={currentUser}>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/register"
            element={
              <PublicRoute user={currentUser}>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/update-password"
            element={
              <PublicRoute user={currentUser}>
                <UpdatePassword />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="forget-password"
            element={
              <PublicRoute user={currentUser}>
                <ForgetPassword />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/ui/leaves/adminPanel"
            element={
              <PrivateRoute user={currentUser}>
                <AdminLeavesPanel />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/leaves/userPanel"
            element={
              <PrivateRoute user={currentUser}>
                <Leave />
              </PrivateRoute>
            }
          />

          <Route
            exact
            path="/ui/home"
            element={
              <PrivateRoute user={currentUser}>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/test"
            element={
              <PrivateRoute user={currentUser}>
                <Test />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/logout"
            element={
              <PrivateRoute user={currentUser}>
                <Logout />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/profiles/internalprofile"
            element={
              <PrivateRoute user={currentUser}>
                <InternalProfile />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/profiles/externalprofile"
            element={
              <PrivateRoute user={currentUser}>
                <ExternalProfile />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/forms/uploadAssignment"
            element={
              <PrivateRoute user={currentUser}>
                <UploadAssignment />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/data/getAllProfiles"
            element={<AllProfiles />}
          />
          <Route
            exact
            path="/ui/forms/feedback/:profileId"
            element={
              <PrivateRoute user={currentUser}>
                <ProfileFeedback />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/report/pyramidbyprojects"
            element={
              <PrivateRoute user={currentUser}>
                <PyramidByProject />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/report/pyramidbylob"
            element={
              <PrivateRoute user={currentUser}>
                <PyramidByLOB />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/report/pyramidbypractice"
            element={
              <PrivateRoute user={currentUser}>
                <PyramidByPractice />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/forms/billability/billableplans"
            element={
              <PrivateRoute user={currentUser}>
                <BillabilityPlan />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/forms/billability/filteredbillableplans/:selPractice/:categoryId/:grade/:location/"
            element={
              <PrivateRoute user={currentUser}>
                <FilteredBillabilityPlan />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/report/billability/billableplanhistory/:associateId/:associateName/"
            element={
              <PrivateRoute user={currentUser}>
                <BillabilityPlanHistory />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ui/report/billabilityreport"
            element={
              <PrivateRoute user={currentUser}>
                <BillabilityReport />
              </PrivateRoute>
            }
          />
          <Route
            path="/ui/reports/interview/alldrives"
            element={
              <PrivateRoute user={currentUser}>
                <InterviewDriveList />
              </PrivateRoute>
            }
          />
          <Route
            path="/ui/forms/interview/newdrive"
            element={
              <PrivateRoute user={currentUser}>
                <InterviewDriveForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/ui/forms/interview/registerpanelist"
            element={
              <PrivateRoute user={currentUser}>
                <RegisterPanelist />
              </PrivateRoute>
            }
          />
          <Route
            path="/ui/add-panelist/:driveId"
            element={
              <PrivateRoute user={currentUser}>
                <PanelNomineeForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/ui/panelists/:driveId"
            element={
              <PrivateRoute user={currentUser}>
                <DrivePanelists />
              </PrivateRoute>
            }
          />
          <Route
            path="/ui/panelists/:driveId/:panelistId"
            element={
              <PrivateRoute user={currentUser}>
                <EditPanelistForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/ui/drive/allPanelists"
            element={
              <PrivateRoute user={currentUser}>
                <AllPanelists />
              </PrivateRoute>
            }
          />
          <Route
            path="/ui/drive/allAssociates"
            element={
              <PrivateRoute user={currentUser}>
                <AllAssociates />
              </PrivateRoute>
            }
          />
          <Route
            path="/ui/drive/calendarView"
            element={
              <PrivateRoute user={currentUser}>
                <Calendar />
              </PrivateRoute>
            }
          />
          <Route
            path="/ui/drive/calendarView/panelist"
            element={
              <PrivateRoute user={currentUser}>
                <OnDatePanelist />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="*"
            element={
              <PublicRoute user={currentUser}>
                <Login />
              </PublicRoute>
            }
          />
        </Routes>
      </div>

      {/* <AuthVerify logOut={logOut}/> */}
    </div>
  );
};

export default App;
