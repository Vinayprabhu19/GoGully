package com.gogully.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity(name = "plays_for")
public class PlaysFor {

	@Id
	@Column
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long playsFoId; 
	
	
	@Column
	private long teamId;
	
	@Column 
	private long userId;
	
	@Column(length = 2)
	private String role;

	public long getTeamId() {
		return teamId;
	}

	public void setTeamId(long teamId) {
		this.teamId = teamId;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public long getPlaysFoId() {
		return playsFoId;
	}

	public void setPlaysFoId(long playsFoId) {
		this.playsFoId = playsFoId;
	}
	
}
