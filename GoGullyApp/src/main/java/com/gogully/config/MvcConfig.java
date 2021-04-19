package com.gogully.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class MvcConfig implements WebMvcConfigurer  {

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {

		registry.addResourceHandler("/static/**").addResourceLocations("/WEB-INF/view/frontend/build/static/");
		registry.addResourceHandler("/*.js").addResourceLocations("/WEB-INF/view/frontend/build/");
		registry.addResourceHandler("/*.json").addResourceLocations("/WEB-INF/view/frontend/build/");
		registry.addResourceHandler("/*.ico").addResourceLocations("/WEB-INF/view/frontend/build/");
		registry.addResourceHandler("/index.html").addResourceLocations("/WEB-INF/view/frontend/build/index.html");

	}

	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/Register").setViewName("/index.html");
		registry.addViewController("/Login").setViewName("/index.html");
		registry.addViewController("/Home").setViewName("/index.html");
		registry.addViewController("/Teams").setViewName("/index.html");
		registry.addViewController("/CreateTeam").setViewName("/index.html");
		registry.addViewController("/404").setViewName("/index.html");
		registry.addViewController("/Unauthorised").setViewName("/index.html");
		registry.addViewController("/EditTeam/*").setViewName("/index.html");
	}

	

}