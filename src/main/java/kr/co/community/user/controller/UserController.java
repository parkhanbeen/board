package kr.co.community.user.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import kr.co.community.common.interceptor.CommonInterceptor;
import kr.co.community.repository.vo.Account;
import kr.co.community.user.service.UserService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("users")
public class UserController {
	
	protected Log log = LogFactory.getLog(CommonInterceptor.class);
	
	@Autowired
	private UserService service;

	@Autowired
	BCryptPasswordEncoder passEncoder;


	// login 페이지 이동
	@GetMapping("login")
	public String loginForm(){
			return "login/login";  
		}

	@PostMapping("login")
	@ResponseBody
	public boolean login(@RequestBody Account account, HttpServletRequest request, Model model) {
		log.info(account.getPassword());
		account.setPassword(passEncoder.encode(account.getPassword()));
		log.info(account.getPassword());

		boolean result = true;
		HttpSession session = request.getSession();
		Account user = service.loginAccount(account);
		session.setAttribute("account", user);

		if (session == null) {
			result = false;
		}

		return result;


	}

}
