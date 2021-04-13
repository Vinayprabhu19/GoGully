package com.gogully.repository;

import org.springframework.data.repository.CrudRepository;

import com.gogully.model.UserDetails;

public interface UserRepository extends CrudRepository<UserDetails, Integer> {
	
	UserDetails findByEmail(String email);

	UserDetails findByUserName(String userName);
}
