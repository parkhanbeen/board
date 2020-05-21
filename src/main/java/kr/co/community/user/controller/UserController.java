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

	@ResponseBody
	@PostMapping("login")
	public Boolean login(@RequestBody Account account, HttpServletRequest request, Model model) {
		log.info(account.getPass());
		account.setPass(passEncoder.encode(account.getPass()));
		log.info(account.getPass());

		Boolean result = true;
		HttpSession session = request.getSession();
		Account user = service.loginAccount(account);
		session.setAttribute("account", user);

		if (user == null) {
			result = false;
		}
		log.info(result);
		
		return result;
	}

}
