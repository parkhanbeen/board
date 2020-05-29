package kr.co.community.user.service;


import kr.co.community.repository.vo.Account;

public interface UserService {
	
	String passInquiry(Account account);
	
	String idInquiry(Account account);

    int idCheck(String id);

    Account loginAccount(Account account);
    
    void registerAccount(Account account) throws Exception;

}
