package kr.co.community.user.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import kr.co.community.common.interceptor.CommonInterceptor;
import kr.co.community.repository.vo.Account;
import kr.co.community.user.service.UserService;

@Controller
@RequestMapping("users")
public class UserController {
	
	protected Log log = LogFactory.getLog(CommonInterceptor.class);
	
	@Autowired
	private UserService service;


	// login 페이지 이동
	    @GetMapping("login")
		public String loginForm(){
			return "login/login";  
		}	
	    
	    @PostMapping("login") 
	    public String login(@RequestBody Account account) {
	    	log.info(account);
	    	return "board/list.tiles";
	    }

}
