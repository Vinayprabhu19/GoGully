package com.gogully.service;

import java.util.Date;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.gogully.model.UserDetails;
import com.gogully.repository.UserRepository;
import com.gogully.utils.GenericUtils;

@Service
public class PlayerService {

	
	@Autowired
	private UserRepository userRepository;
	
	public ResponseEntity<String> getPlayers(){
		JSONArray players = new JSONArray();
		
		for(UserDetails u: userRepository.findAll()) {
			JSONObject p = new JSONObject();
			p.put("name",u.getName());
			p.put("userName",u.getUserName());
			char gender=u.getGender();
			p.put("gender",GenericUtils.getGender(gender));
			if(u.getDob()!=null) {
				int age = (new Date()).getYear()- u.getDob().getYear();
				p.put("age",age);
			}
			else {
				p.put("age","");
			}
			p.put("exists",u.isActive()?"Yes":"No");
			p.put("userId",u.getUserId());
			players.put(p);
		}
		
		return new ResponseEntity<String>(players.toString(),HttpStatus.OK);
	}
	
	
}
