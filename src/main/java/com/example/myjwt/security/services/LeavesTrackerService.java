package com.example.myjwt.security.services;

import com.example.myjwt.models.*;
import com.example.myjwt.models.enm.ECalenderMonth;
import com.example.myjwt.models.enm.ELeaveStatus;
import com.example.myjwt.payload.LeaveRequestParams;
import com.example.myjwt.payload.MonthStatusPOJO;
import com.example.myjwt.payload.response.LeaveResponse;
import com.example.myjwt.repo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class LeavesTrackerService {

    @Autowired
    private LeavesRepository leavesRepository;

    @Autowired
    private AssignmentUserRepository assignmentUserRepository;

    @Autowired
    private AssignmentReportRepository assignmentReportRepository;
    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private HolidayRepository holidayRepository;

    @Autowired
    private UserRepository userRepository;

    public LeaveResponse getLeaveByAssociateId(int year) {
        User user = customUserDetailsService.loadUserFromContext();
        Optional<AssignmentUser> assignmentUser = assignmentUserRepository.findByAssociateID(Long.valueOf(user.getUserName()));
        Optional<ArrayList<Leave>> byAssociateIdAndYear = leavesRepository.findByUserIdAndYear(user.getId(), year);
        LeaveResponse leaveResponse = getDefaultLeaveResponse(year);
        if (byAssociateIdAndYear.isPresent()) {
            leaveResponse = getLeaveResponse(byAssociateIdAndYear.get(), year);
        }
        leaveResponse.setAssociateId(user.getId());
        leaveResponse.setFullName(user.getUserName());
        if (assignmentUser.isPresent()) {
            return setHolidays(year, leaveResponse, assignmentUser.get().getCity());
        }

        return leaveResponse;
    }

    public LeaveResponse getLeaveByAssociateId(Long associateId, int year) {
        User user = customUserDetailsService.getUserById(associateId);
        Optional<AssignmentUser> assignmentUser = assignmentUserRepository.findByAssociateID(Long.valueOf(user.getUserName()));
        Optional<ArrayList<Leave>> byAssociateIdAndYear = leavesRepository.findByUserIdAndYear(associateId, year);
        LeaveResponse leaveResponse = getDefaultLeaveResponse(year);
        if (byAssociateIdAndYear.isPresent()) {
            leaveResponse = getLeaveResponse(byAssociateIdAndYear.get(), year);
        }
        leaveResponse.setAssociateId(user.getId());
        leaveResponse.setFullName(user.getUserName());
        if (assignmentUser.isPresent()) {
            return setHolidays(year, leaveResponse, assignmentUser.get().getCity());
        }
        return leaveResponse;
    }

    public LeaveResponse getDefaultLeaveResponse(int year) {
        LeaveResponse leaveResponse = new LeaveResponse();
        leaveResponse.setYear(year);
        leaveResponse.setSuccess(true);
        ArrayList<MonthStatusPOJO> statusPOJOS = new ArrayList<>();
        statusPOJOS.add(new MonthStatusPOJO(ECalenderMonth.JANUARY, year));
        statusPOJOS.add(new MonthStatusPOJO(ECalenderMonth.FEBRUARY, year));
        statusPOJOS.add(new MonthStatusPOJO(ECalenderMonth.MARCH, year));
        statusPOJOS.add(new MonthStatusPOJO(ECalenderMonth.APRIL, year));
        statusPOJOS.add(new MonthStatusPOJO(ECalenderMonth.MAY, year));
        statusPOJOS.add(new MonthStatusPOJO(ECalenderMonth.JUNE, year));
        statusPOJOS.add(new MonthStatusPOJO(ECalenderMonth.JULY, year));
        statusPOJOS.add(new MonthStatusPOJO(ECalenderMonth.AUGUST, year));
        statusPOJOS.add(new MonthStatusPOJO(ECalenderMonth.SEPTEMBER, year));
        statusPOJOS.add(new MonthStatusPOJO(ECalenderMonth.OCTOBER, year));
        statusPOJOS.add(new MonthStatusPOJO(ECalenderMonth.NOVEMBER, year));
        statusPOJOS.add(new MonthStatusPOJO(ECalenderMonth.DECEMBER, year));
        leaveResponse.setMonthStatusPOJOS(statusPOJOS);
        return leaveResponse;
    }

    public LeaveResponse getLeaveResponse(ArrayList<Leave> leaves, int year) {
        LeaveResponse leaveResponse = getDefaultLeaveResponse(year);
        for (Leave i : leaves) {
            leaveResponse.getMonthStatusPOJOS().get(i.getMonth().ordinal()).getStatusArrayList().set(i.getDay() - 1, i.getStatus());
        }
        return leaveResponse;
    }

    public LeaveResponse setHolidays(int year, LeaveResponse leaveResponse, String city) {
        Optional<ArrayList<Holiday>> holidayList = holidayRepository.findByYearAndCity(year, city.toLowerCase());
        if(holidayList.isPresent())
        for (Holiday i : holidayList.get()) {
            leaveResponse.getMonthStatusPOJOS().get(i.getMonth().ordinal()).getStatusArrayList().set(i.getDay() - 1, ELeaveStatus.H);
        }
        return leaveResponse;
    }

    public LeaveResponse updateLeaves(ArrayList<LeaveRequestParams> leaveRequestParams, int year) {
        User user = customUserDetailsService.loadUserFromContext();
        ArrayList<Leave> temp = new ArrayList<>();
        for (LeaveRequestParams i : leaveRequestParams) {
            Leave leave = new Leave();
            leave.setYear(year);
            leave.setDay(i.getDay());
            leave.setMonth(i.getMonth());
            leave.setStatus(i.getStatus());
            leave.setUser(user);
            temp.add(leave);
        }
        leavesRepository.saveAll(temp);
        LeaveResponse leaveResponse = getLeaveByAssociateId(year);
        return leaveResponse;
    }
    //Admin User
//    public ArrayList<LeaveResponse> getAllUserLeaves(int year) {
//        ArrayList<User> users = customUserDetailsService.loadAllUsers();
//        ArrayList<LeaveResponse> leaveResponses = new ArrayList<>();
//        for (User u : users) {
//            LeaveResponse leaveByAssociateId = getLeaveByAssociateId(u.getId(), year);
//            leaveResponses.add(leaveByAssociateId);
//        }
//        return leaveResponses;
//    }

    public ArrayList<LeaveResponse> getAllUserLeavesByLOBAndServiceLine(int year, String lOB, String serviceLine) throws Exception {
        AssignmentReport report = assignmentReportRepository.findFirstByOrderByIdDesc().orElseThrow(
				() ->  new Exception("No assignment users found"));
        List<AssignmentUser> assignmentUsers = assignmentUserRepository.findByAssignmentReportAndServiceLineAndLOB(report, serviceLine, lOB);
        List<User> users = new ArrayList<>();
        for (AssignmentUser i : assignmentUsers) {
            Optional<User> user = userRepository.findByUserName(String.valueOf(i.getAssociateID()));
            if (user.isPresent()) {
                users.add(user.get());
            }
        }
        ArrayList<LeaveResponse> leaveResponses = new ArrayList<>();
        for (User u : users) {
            LeaveResponse leaveByAssociateId = getLeaveByAssociateId(u.getId(), year);
            leaveResponses.add(leaveByAssociateId);
        }
        if (leaveResponses.size() == 0)
            throw new Exception("No Users found for the filter");
        return leaveResponses;
    }

}
