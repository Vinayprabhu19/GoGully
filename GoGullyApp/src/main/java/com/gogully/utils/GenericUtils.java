package com.gogully.utils;

import java.sql.Date;

public class GenericUtils {

	
	public static Date getCurrentSQLDate() {
		java.util.Date utilDate= new java.util.Date();
		java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());
		return sqlDate;
	}
}
