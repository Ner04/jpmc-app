package com.example.myjwt.payload.request;

import javax.persistence.Transient;

import lombok.Data;

@Data
public class PasswordRequest {
	
	private String password;
	@Transient
	private String confPassword;
	private String email;
}
