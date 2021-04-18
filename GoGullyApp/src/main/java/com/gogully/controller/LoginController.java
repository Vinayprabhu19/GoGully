package com.gogully.controller;

import java.io.IOException;
import java.security.Principal;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.gogully.config.SecurityService;
import com.gogully.model.UserDetails;
import com.gogully.repository.UserRepository;
import com.gogully.utils.GenericUtils;
import com.gogully.utils.PasswordUtils;

@Controller
public class LoginController {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private SecurityService securityService;

	@GetMapping({"/Login","/Register"})
    public String showLoginForm(Model model) {
         
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication instanceof AnonymousAuthenticationToken) {
            return "index.html";
        }
        
 
        return "redirect:/";
    }
	
	
	@CrossOrigin(origins = "*")
	@RequestMapping(value = "/api/register", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> registerUser(@RequestBody String requestString) {
		JSONObject request = new JSONObject(requestString);
		String message = "";
		JSONObject obj = new JSONObject();
		String userName = request.getString("username").toLowerCase().trim();
		String name = request.getString("name");
		String password = request.getString("password");
		String passwordRepeat = request.getString("passwordRepeat");
		String dob = request.getString("dob");
		String email = request.getString("email").toLowerCase();
		String passRegex = "^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\\-__+.]){0,}).{8,}$";
		String emailRegex = "[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?";
		char gender = request.getString("gender").charAt(0);
		UserDetails existingUser = userRepository.findByEmail(email);
		if (!password.equals(passwordRepeat)) {
			message = "Passwords don't match";
		} else if (userName.length() < 7 | userName.length()>25) {
			message = "Username should be 7 - 25 characters";
		} else if (!userName.matches("[A-Za-z0-9]+") ) {
			message = "Username cannot contain special characters and space";
		} 
		else if(!name.matches("[A-Za-z ]+")) {
			message = "Name cannot contain special characters or numbers";
		}
		else if (!email.matches(emailRegex)) {
			message = "Please enter a valid email";
		} else if (existingUser != null) {
			message = "Email already exists";
		} else if (!password.matches(passRegex)) {
			message = "Please enter strong password - Min 8 characters with atleast one uppercase,lowercase,digit and special charcter";
		} else {
			try {
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
				java.util.Date langDate = sdf.parse(dob);
				java.sql.Date sqlDate = new java.sql.Date(langDate.getTime());
				String salt = PasswordUtils.getSalt(30);
				String securePassword = PasswordUtils.generateSecurePassword(password, salt);
				UserDetails user = new UserDetails();
				user.setUserName(userName);
				user.setDob(sqlDate);
				user.setName(name);
				user.setGender(gender);
				user.setPassword(securePassword);
				user.setSalt(salt);
				user.setEmail(email);
				user.setActive(true);
				user.setCreatedOn(GenericUtils.getCurrentSQLDate());
				userRepository.save(user);
				message = "User added";
				obj.put("message", message);
				return new ResponseEntity<String>(obj.toString(), HttpStatus.OK);

			} catch (ParseException e) {
				e.printStackTrace();
				message = "Invalid Date";
			}
		}
		obj.put("message", message);
		return new ResponseEntity<String>(obj.toString(), HttpStatus.BAD_REQUEST);

	}
	
	@CrossOrigin(origins = "*")
	@RequestMapping(value = "/api/root", method = RequestMethod.GET)
	public String rootUser(Principal principal) {
		System.out.println(principal);
		return principal.getName();
	}
	
	@CrossOrigin(origins = "*")
	@RequestMapping(value = "/api/login", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> loginUser(HttpServletRequest request,HttpServletResponse response, @RequestBody String requestString) {
		System.out.println("login");
		JSONObject req= new JSONObject(requestString);
		String message = "";
		JSONObject obj = new JSONObject();
		String userName = req.getString("username").toLowerCase().trim();
		String password = req.getString("password");
		
		UserDetails user=userRepository.findByUserName(userName);
		if(user==null) {
			System.out.println("not exists");
			obj.put("message", "User doesn't exist");
			return new ResponseEntity<String>(obj.toString(), HttpStatus.BAD_REQUEST);
		}

		Boolean check = PasswordUtils.verifyUserPassword(password, user.getPassword(), user.getSalt());
		if(!check) {
			obj.put("message", "Invalid password");
			
			return new ResponseEntity<String>(obj.toString(), HttpStatus.BAD_REQUEST);
		}
		else {
			obj.put("message", "Valid User");
			try {
				securityService.autologin(user.getUserName(), password,request);
			} catch (IOException e) {
				return new ResponseEntity<String>(obj.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
			}
			return new ResponseEntity<String>(obj.toString(), HttpStatus.OK);
		}
	}
}
