package com.gogully.utils;

import java.sql.Date;

public class GenericUtils {

	
	public static Date getCurrentSQLDate() {
		java.util.Date utilDate= new java.util.Date();
		java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());
		return sqlDate;
	}
	
	public static String getGender(char g) {
		if(g=='M')
			return "Male";
		else if(g=='F')
			return "Female";
		else 
			return "Other";
	}
}
