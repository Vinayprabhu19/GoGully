package com.gogully.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.gogully.model.PlaysFor;

import beans.TeamInfo;

public interface PlaysForRepository extends CrudRepository<PlaysFor, Long> {
	
	@Query(value = "select t.team_id as teamId,team_name as teamName,location,count(user_id) as players, true as owner from plays_for as p\r\n"
			+ "right outer join team as t on\r\n"
			+ "p.team_id=t.team_id\r\n"
			+ "where created_by=?1\r\n"
			+ "group by t.team_id,team_name,location\r\n"
			+ "\r\n"
			+ "UNION\r\n"
			+ "\r\n"
			+ "select t.team_id as teamId,team_name as teamName,location,count(user_id) as players,false as owner from plays_for as p\r\n"
			+ "inner join team as t on\r\n"
			+ "p.team_id=t.team_id\r\n"
			+ "where t.team_id in (select team_id from plays_for where user_id=?1)\r\n"
			+ "and t.team_id not in (select team_id from team where created_by=?1)\r\n"
			+ "group by t.team_id,team_name,location",nativeQuery = true)
     public List<TeamInfo> findTeamsOfPlayer(long userId);
}
