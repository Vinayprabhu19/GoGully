package com.gogully.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
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
import com.gogully.utils.PasswordUtils;

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
	
	public ResponseEntity<String> addNewPlayer(String createdBy,String requestString){
		JSONObject request= new JSONObject(requestString);
		JSONObject response = new JSONObject();
		String message="";
		String name = request.getString("name");
		String dob = request.getString("dob");
		String email = request.getString("email").toLowerCase();
		String emailRegex = "[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?";
		char gender = request.getString("gender").charAt(0);
		UserDetails existingUser = userRepository.findByEmail(email);
		if(!name.matches("[A-Za-z ]+")) {
			message = "Name cannot contain special characters or numbers";
		}
		else if (!email.matches(emailRegex)) {
			message = "Please enter a valid email";
		} else if (existingUser != null) {
			message = "Email already exists";
		} else {
			try {
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
				java.util.Date langDate = sdf.parse(dob);
				java.sql.Date sqlDate = new java.sql.Date(langDate.getTime());
				UserDetails user = new UserDetails();
				user.setDob(sqlDate);
				user.setName(name);
				user.setGender(gender);
				user.setEmail(email);
				user.setActive(false);
				user.setCreatedOn(GenericUtils.getCurrentSQLDate());
				user.setAddedBy(createdBy);
				userRepository.save(user);
				message = "User added";
				response.put("message", message);
				return new ResponseEntity<String>(response.toString(), HttpStatus.OK);

			} catch (ParseException e) {
				e.printStackTrace();
				message = "Invalid Date";
			}
		}
		
		return new ResponseEntity<String>(response.toString(),HttpStatus.BAD_REQUEST);
		
	}
	
}
