package kr.co.community.user.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.community.common.interceptor.CommonInterceptor;
import kr.co.community.repository.vo.Account;
import kr.co.community.user.service.UserService;

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
//		account.setPass(passEncoder.encode(account.getPass()));
		log.info(account.getPass());

		Boolean result = true;
		HttpSession session = request.getSession();
		Account user = service.loginAccount(account);
		
		log.info("사용자 암호화 비밀번호"+user.getPass());
		log.info("입력받은 비밀번호 비교" + passEncoder.matches(account.getPass(), user.getPass()));
		
		if (user == null || passEncoder.matches(account.getPass(), user.getPass()) == false) {
			result = false;
		}else {
			session.setAttribute("account", user);			
		}
		log.info(result);
		
		return result;
	}
	
	@ResponseBody
	@PostMapping("register")
	public Boolean register(@RequestBody Account account, HttpServletRequest request, Model model) {
		account.setPass(passEncoder.encode(account.getPass()));
		log.info(account.getName());
		log.info(account.getEmail());
		Boolean result = true;
	    try {	    	
	    	service.registerAccount(account);  	
	    	return result;
	    }catch (Exception e) {
			log.debug(e);
			result = false;
			return result;
		}
	}
	// 아이디 중복검사
	@ResponseBody
	@GetMapping("register/{id}")
	public int idCheck(@PathVariable("id") String id){	
		log.info(id);
		return service.idCheck(id);
	}
	
	@ResponseBody
	@PostMapping("id-inquiry")
	public Map<String,String> idInquiry(@RequestBody Account account){	
		log.info("name == "+account.getName());
		log.info("email == "+account.getEmail());
		log.info("??id = "+service.idInquiry(account));
		Map<String,String> findId = new HashMap<String,String>();
		findId.put("id",service.idInquiry(account));
		return findId;
	}
	

}
