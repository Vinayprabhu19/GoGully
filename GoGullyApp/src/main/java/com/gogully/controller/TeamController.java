package com.gogully.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.gogully.model.Team;
import com.gogully.model.UserDetails;
import com.gogully.repository.TeamRepository;
import com.gogully.repository.UserRepository;
import com.gogully.service.TeamService;

@Controller
public class TeamController {

	@Autowired
	private TeamService teamService;
	
	@Autowired
	private TeamRepository teamRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@RequestMapping(value = "/api/addTeam",method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> addTeam(Principal user,@RequestBody String requestString){
		return teamService.addTeam(requestString,user.getName());
	}
	
	@RequestMapping(value = "/api/getTeams",method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> getTeams(Principal user){
		return teamService.getTeams(user.getName());
	}
	
//	@GetMapping("/EditTeam/{teamId}")
//    public String showLoginForm(Model model,Principal principal,@PathVariable String teamId) {
//		long id=0;
//		System.out.println("teamID"+teamId);
//		try {
//			id=Long.parseLong(teamId);
//		} catch (NumberFormatException e) {
//			e.printStackTrace();
//			return "redirect:/404";
//		}
//        Team team =  teamRepository.findByTeamId(id);
//        if(team==null) {
//        	System.out.println("null"+id);
//        	return "redirect:/404";
//        }
//        UserDetails user= userRepository.findByUserName(principal.getName());
//        if(team.getCreatedBy() == user.getUserId())
//        	return "/EditTeam/"+teamId;
//        return "redirect:/Unauthorised";
//    }
	
}
