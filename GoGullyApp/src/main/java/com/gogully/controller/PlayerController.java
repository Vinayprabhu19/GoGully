package com.gogully.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.gogully.repository.UserRepository;
import com.gogully.service.PlayerService;

@Controller
public class PlayerController {

	@Autowired
	private PlayerService playerService;
	
	@RequestMapping(value = "/api/getPlayers",method = RequestMethod.GET)
	public ResponseEntity<String> getPlayers(){
		return playerService.getPlayers();
	}
	
	@RequestMapping(value = "/api/addNewPlayer",method = RequestMethod.POST)
	public ResponseEntity<String> addNewPlayer(Principal principal,@RequestBody String requestString){
		return playerService.addNewPlayer(principal.getName(), requestString);
	}
}
