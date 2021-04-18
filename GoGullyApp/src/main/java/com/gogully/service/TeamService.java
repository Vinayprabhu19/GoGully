package com.gogully.service;

import java.security.Principal;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.gogully.model.PlaysFor;
import com.gogully.model.Team;
import com.gogully.model.UserDetails;
import com.gogully.repository.PlaysForRepository;
import com.gogully.repository.TeamRepository;
import com.gogully.repository.UserRepository;
import com.gogully.utils.GenericUtils;

import beans.TeamInfo;
import beans.TeamPlayer;

@Service
public class TeamService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private TeamRepository teamRepository;
	
	@Autowired
	private PlaysForRepository playForRepository;
	
	public ResponseEntity<String> addTeam(String requestString,String userName){
		JSONObject response= new JSONObject();
		String message;
		UserDetails user = userRepository.findByUserName(userName);
		JSONObject request = new JSONObject(requestString);
		String teamName= request.getString("teamName");
		String location = request.getString("location");
		boolean playIn=request.getBoolean("playIn");
		Team team;
		team=teamRepository.findByTeamName(teamName);
		if(team!=null) {
			message="Team name already exists. Choose an unique name";
			response.put("message", message);
			return new ResponseEntity<String>(response.toString(),HttpStatus.BAD_REQUEST);
		}
		team= new Team();
		team.setTeamName(teamName);
		team.setLocation(location);
		team.setCreatedBy(user.getUserId());
		team.setCreatedOn(GenericUtils.getCurrentSQLDate());
		teamRepository.save(team);
		if(playIn) {
			PlaysFor playFor = new PlaysFor();
			playFor.setTeamId(team.getTeamId());
			playFor.setUserId(user.getUserId());
			playFor.setRole("C");
			playForRepository.save(playFor);
		}
		message="Added Team";
		response.put("message", message);
		return new ResponseEntity<String>(response.toString(),HttpStatus.OK);
		
	}
	
	public ResponseEntity<String> getTeams(String userName){
		JSONObject response= new JSONObject();
		String message;
		UserDetails user = userRepository.findByUserName(userName);
		List<TeamInfo> teams = playForRepository.findTeamsOfPlayer(user.getUserId());
		JSONArray playerTeams=new JSONArray();
		for(TeamInfo t : teams) {
			JSONObject obj = new JSONObject();
			obj.put("teamId", t.getTeamId());
			obj.put("teamName", t.getTeamName());
			obj.put("location", t.getLocation());
			obj.put("owner", t.getOwner());
			obj.put("playerCount", t.getPlayers());
			List<TeamPlayer> teamPlayers = teamRepository.getTeamPlayers(t.getTeamId());
			JSONArray players = new JSONArray();
			for(TeamPlayer tp:teamPlayers) {
				JSONObject player= new JSONObject();
				player.put("userId", tp.getUserId());
				player.put("userName", tp.getUserName());
				player.put("role", tp.getRole());
				player.put("name", tp.getName());
				players.put(player);
			}
			obj.put("players", players);
			playerTeams.put(obj);
		}
		return new ResponseEntity<String>(playerTeams.toString(),HttpStatus.OK);
	}
}
