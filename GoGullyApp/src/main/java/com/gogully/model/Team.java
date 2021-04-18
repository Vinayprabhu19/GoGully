package com.gogully.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.sun.istack.NotNull;
import com.sun.istack.Nullable;

@Entity(name="Team")
public class Team {
	
	@Id
	@NotNull
	@Column
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long teamId;
	
	@Column(name = "teamName",unique = true)
	@Nullable
	private String teamName;
	
	@Column
	private String location;
		
	@Column
	private long createdBy;
	
	@Column
	private Date createdOn;

	public long getTeamId() {
		return teamId;
	}

	public void setTeamId(long teamId) {
		this.teamId = teamId;
	}

	public String getTeamName() {
		return teamName;
	}

	public void setTeamName(String teamName) {
		this.teamName = teamName;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public long getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(long createdBy) {
		this.createdBy = createdBy;
	}

	public Date getCreatedOn() {
		return createdOn;
	}

	public void setCreatedOn(Date createdOn) {
		this.createdOn = createdOn;
	}

}
