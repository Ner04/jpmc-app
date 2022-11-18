package com.example.myjwt.repo;

import com.example.myjwt.models.Leave;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Optional;

@Repository
public interface LeavesRepository extends JpaRepository<Leave, Long> {

    Optional<ArrayList<Leave>> findByUserIdAndYear(long associateId, int year);

}
