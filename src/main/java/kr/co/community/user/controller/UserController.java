package kr.co.community.user.controller;

import java.io.File;
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
import org.springframework.web.bind.annotation.*;

import com.google.gson.JsonObject;

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

	public String OS = System.getProperty("os.name").toLowerCase();

	public boolean isWindows() {
		return (OS.indexOf("win") >= 0);
	}

	public boolean isMac() {
		return (OS.indexOf("mac") >= 0);
	}


	// login 페이지 이동
	@GetMapping("login")
	public String loginForm(){
			return "login/login";  
		}
	
    //로그인
	@ResponseBody
	@PostMapping("login")
	public Boolean login(@RequestBody Account account, HttpServletRequest request, Model model) {
		Boolean result = true;
		HttpSession session = request.getSession();
		Account user = service.detailUsers(account.getId());
		
		if (user == null || passEncoder.matches(account.getPass(), user.getPass()) == false) {
			result = false;
		}else {
			session.setAttribute("account", user);			
		}
		return result;
	}
	
	//회원가입
	@SuppressWarnings("finally")
	@ResponseBody
	@PostMapping("register")
	public Boolean register(@RequestBody Account account, HttpServletRequest request, Model model) {
		account.setPass(passEncoder.encode(account.getPass()));
		Boolean result = true;
	    try {	    	
	    	service.registerAccount(account);  	
	    }catch (Exception e) {
			log.debug(e);
			result = false;
		}finally {
			return result;
		}
	}
	
	//회원 정보수정
	@SuppressWarnings("finally")
	@ResponseBody
	@PostMapping("{id}")
	public String updateUsers(@PathVariable("id") String id,Account account) throws Exception{
		String result = null;
		try {
			account.setId(id);
			if(account.getName() != null || account.getEmail() != null) {
				service.updateUsers(account);				
			}
			if(account.getAttach().isEmpty()) {
				log.info("파일 선택하지 않음 ");
			}else {
			String fileName = account.getNo() + ".jpg";
				if (isWindows()==true) {
					account.getAttach().transferTo(new File("c:/board/upload/profile/" + fileName));
				} else if (isMac()==true) {
					account.getAttach().transferTo(new File("/Users/board/upload/profile/" + fileName));
				}
			}
			result = "success";
		}catch (Exception e) {
			result = "fail";
			e.printStackTrace();
		}finally {
			return result;
		}
	}
	
	//회원 상세조회
	@ResponseBody
	@GetMapping("{id}")
	public Account detailUsers(@PathVariable("id") String id,HttpServletRequest request){
		HttpSession session = request.getSession();
		Account user = service.detailUsers(id);
		session.setAttribute("account", user);
		return user;
	}
	
	// 아이디 중복검사
	@ResponseBody
	@GetMapping("register/{id}")
	public int idCheck(@PathVariable("id") String id){
		return service.idCheck(id);
	}
	
	// 아이디 찾기
	@ResponseBody
	@PostMapping("id-inquiry")
	public Map<String,String> idInquiry(@RequestBody Account account){	
		Map<String,String> findId = new HashMap<>();
		findId.put("id",service.idInquiry(account));
		return findId;
	}
	
	// 임시비밀번호 발급
	@ResponseBody
	@PostMapping("pass-inquiry")
	public Map<String,String> passInquiry(@RequestBody Account account){
		Map<String,String> findPass = new HashMap<>();
		findPass.put("pass",service.passInquiry(account));
		return findPass;
	}
	
	// 로그아웃
	@DeleteMapping("logout")
	public void logout(HttpSession session) {
		try {
			service.logout(session);
		} catch (Exception e) {
			log.debug(e);
		}
	}
	
	// 비밀번호 변경
	@ResponseBody
	@PatchMapping(value = "{id}/password", produces = "application/text; charset=utf8")
	public String changePassword(@PathVariable("id") String id, @RequestBody Map<String, String> update) {
		
		String msg = null;
		String newPass = update.get("newPass");
		String oldPass = update.get("oldPass");
		
		Account account = service.detailUsers(id);
		
		JsonObject obj =new JsonObject();
		
		if (passEncoder.matches(newPass,account.getPass()) == false) {
			msg = "현재 비밀번호가 일치하지 않습니다.";
		}else if(passEncoder.matches(oldPass,account.getPass())){
			msg = "현재 비밀번호와 다른 새 비밀번호를 입력하세요.";
	    }else {
			account.setPass(oldPass);
			
			try {
				service.updatePassword(account);
				msg = "비빌번호가 변경되었습니다.";
			} catch (Exception e) {
				e.printStackTrace();
				msg = "비빌번호 변경에 실패하였습니다.";
			}
		}
		
		obj.addProperty("msg", msg);
		
		return obj.toString();
	}
	
	// 탈퇴
    @DeleteMapping("{id}")
    public void withdraw(@PathVariable("id") String id,HttpSession session) {
    	try {
			service.withdraw(id);
			service.logout(session);
		} catch (Exception e) {
			e.printStackTrace();
		}
    	
    	
    }
	
	

}
