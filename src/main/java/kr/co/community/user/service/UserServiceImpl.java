package kr.co.community.user.service;

import kr.co.community.common.interceptor.CommonInterceptor;
import kr.co.community.repository.mapper.UserMapper;
import kr.co.community.repository.vo.Account;

import java.util.UUID;

import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{
	
	protected Log log = LogFactory.getLog(CommonInterceptor.class);
	
	@Autowired
	BCryptPasswordEncoder passEncoder;

    @Autowired
    private UserMapper mapper;
    
    @Autowired
	private JavaMailSender mailSender;


    @Override
    public int idCheck(String id) {
        return mapper.idCheck(id);
    }


	@Override
	public void registerAccount(Account account) throws Exception{
		 mapper.registerAccount(account);
	}

	@Override
	public String idInquiry(Account account) {
		return mapper.idInquiry(account);
	}

	@Override
	public String passInquiry(Account account) {
		
		String uuid = UUID.randomUUID().toString().split("-")[0];
		String cd = "success";
		try {
			account.setNo(mapper.passInquiry(account));
			account.setPass(passEncoder.encode(uuid));
			if(account.getNo() > 0) {
				mapper.updatePass(account);			
			
			String setfrom = "parkhanbeen";
			String tomail = account.getEmail();
			String title =  "BOARD 임시비밀번호 입니다";
			String content = "<h2>안녕하세요."+account.getName()+"님</h2> <h3>BOARD 임시비밀번호는  "+ uuid +"입니다</h3>";
				   content += "\r<h3>임시번호로 로그인 후 비밀번호를 변경해 주세요.</h3>";

		
			MimeMessage message = mailSender.createMimeMessage();
			MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8");

			messageHelper.setFrom(setfrom); // 보내는사람 생략하면 정상작동을 안함
			messageHelper.setTo(tomail); // 받는사람 이메일
			messageHelper.setSubject(title); // 메일제목은 생략이 가능하다
			messageHelper.setText(content,true); // 메일 내용

			mailSender.send(message);
			
			}else {
				cd = "fail";
			}
			
		}catch (Exception e) {
			cd = "fail";
			log.debug(e);
		}
		return cd;
	}

	@Override
	public void logout(HttpSession session) throws Exception {
		session.invalidate();
	}

	@Override
	public void updateUsers(Account account) throws Exception {
		mapper.updateUsers(account);
	}

	@Override
	public Account detailUsers(String id) {
		return mapper.detailUsers(id);
	}


	@Override
	public void updatePassword(Account account) throws Exception {
		account.setPass(passEncoder.encode(account.getPass()));
		mapper.updatePass(account);
	}


}
