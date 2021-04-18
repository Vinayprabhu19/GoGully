package com.gogully.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.gogully.service.TeamService;

@RestController
public class TeamController {

	@Autowired
	private TeamService teamService;
	
	@RequestMapping(value = "/api/addTeam",method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> addTeam(Principal user,@RequestBody String requestString){
		return teamService.addTeam(requestString,user.getName());
	}
	
	@RequestMapping(value = "/api/getTeams",method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> getTeams(Principal user){
		return teamService.getTeams(user.getName());
	}
	
	
	
}
