package com.gogully.config;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gogully.repository.UserRepository;

@Service
public class SecurityService implements UserDetailsService{
	
	
	@Autowired
	private Securityhandler authenticationSuccessHandler;
	
	@Autowired
	private UserDetailsService userDetailsService;
		
	@Autowired
	private UserRepository userRepository;
	
	private static final Logger logger = LoggerFactory.getLogger(SecurityService.class);

	public String findLoggedInUsername() {
		Object userDetails = SecurityContextHolder.getContext().getAuthentication().getDetails();
		if (userDetails instanceof UserDetails) {
			return ((UserDetails) userDetails).getUsername();
		}
		return null;
	}

	public void autologin(String username, String password,HttpServletRequest req) throws IOException{
		System.out.println("autologin");
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		
		UserDetails userDetails = userDetailsService.loadUserByUsername(username);
		Authentication authentication  = new UsernamePasswordAuthenticationToken(
				userDetails, passwordEncoder.encode(password), userDetails.getAuthorities());

//		authenticationManager.authenticate(usernamePasswordAuthenticationToken);
		if (authentication.isAuthenticated()) {
			SecurityContext sc = SecurityContextHolder.getContext();
		    sc.setAuthentication(authentication);
		    HttpSession session = req.getSession(true);
		    session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, sc);
		}
	}
	

	@Override
	@Transactional(readOnly = true)
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		com.gogully.model.UserDetails user = userRepository.findByUserName(username);
		if(user==null) {
			throw new UsernameNotFoundException("Username not found");
		}
		Set grantedAuthorities = new HashSet<>();
		grantedAuthorities.add(new SimpleGrantedAuthority("User"));
		return new org.springframework.security.core.userdetails.User(user.getUserName(), user.getPassword(),grantedAuthorities);
	}
}