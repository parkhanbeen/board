package kr.co.community.user.service;


import javax.servlet.http.HttpSession;

import kr.co.community.repository.vo.Account;

public interface UserService {
	
	String passInquiry(Account account);
	
	String idInquiry(Account account);

    int idCheck(String id);

    Account detailUsers(String id);
    
    void registerAccount(Account account) throws Exception;
    
    void logout(HttpSession session) throws Exception;

    void updateUsers(Account account) throws Exception;
    
    void updatePassword(Account account) throws Exception;

}
