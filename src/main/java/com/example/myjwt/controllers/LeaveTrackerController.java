package com.example.myjwt.controllers;

import com.example.myjwt.models.Holiday;
import com.example.myjwt.payload.request.LeaveRequest;
import com.example.myjwt.payload.response.ApiResponse;
import com.example.myjwt.payload.response.LeaveResponse;
import com.example.myjwt.repo.HolidayRepository;
import com.example.myjwt.security.services.LeavesTrackerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/leaves")
public class LeaveTrackerController {

    @Autowired
    private LeavesTrackerService leavesTrackerService;
    @Autowired
    private HolidayRepository holidayRepository;

    @GetMapping("/getLeaveDetails/{year}")
    public ResponseEntity<?> getLeaveDetails(@PathVariable int year) {
        LeaveResponse leave = leavesTrackerService.getLeaveByAssociateId(year);
        return ResponseEntity.ok(leave);
    }

    @PutMapping("/setLeaveDetails/{year}")
    public ResponseEntity<?> setLeaveDetails(@RequestBody LeaveRequest leaveRequest, @PathVariable int year) {
        try {
            LeaveResponse leaveResponse = leavesTrackerService.updateLeaves(leaveRequest.getLeaveRequestParamsArrayList(), year);
            return ResponseEntity.ok(leaveResponse);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, e.getMessage()));
        }
    }

    @GetMapping("/getAllUserLeaveDetails/{year}/{lOB}/{serviceLine}")
    public ResponseEntity<?> getAllUserLeaveDetails(@PathVariable int year, @PathVariable String lOB, @PathVariable String serviceLine) {
        try {
            ArrayList<LeaveResponse> allUserLeaves = leavesTrackerService.getAllUserLeavesByLOBAndServiceLine(year, lOB, serviceLine);
            return ResponseEntity.ok(allUserLeaves);
        } catch (Exception e) {
            return ResponseEntity.status(404).body(new ApiResponse(false, e.getMessage()));
        }
    }

    @PostMapping("/setHoliday")
    public ResponseEntity<?> getHolidays(@Valid @RequestBody Holiday holiday){
        holiday.setCity(holiday.getCity().toLowerCase());
        holidayRepository.save(holiday);
        return ResponseEntity.ok(new ApiResponse(true,"Holiday saved successfully"));

    }

}
