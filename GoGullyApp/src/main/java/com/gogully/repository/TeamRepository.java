package com.gogully.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.gogully.model.Team;
import com.gogully.model.UserDetails;

import beans.TeamPlayer;

public interface TeamRepository extends CrudRepository<Team, Integer> {
	
	public Team findByTeamName(String teamName);
	
	@Query(value="select name,role,user_name as userName,u.user_id as userId from plays_for as p inner join public.user_details  as u\r\n"
			+ "on u.user_id = p.user_id\r\n"
			+ "where team_id=?1",nativeQuery = true)
	public List<TeamPlayer> getTeamPlayers(long teamId);

	public Team findByTeamId(long teamId);
}
