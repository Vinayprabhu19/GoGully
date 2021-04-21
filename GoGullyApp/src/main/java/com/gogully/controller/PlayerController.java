package com.gogully.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
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
}
