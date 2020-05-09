package kr.co.community.user.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("users")
public class UserController {
	
	
	// login
	    @GetMapping("login")
		public String login(){
			
			return "login/login";  
		}	

}
