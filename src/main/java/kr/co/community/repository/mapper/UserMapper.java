package kr.co.community.repository.mapper;

import kr.co.community.repository.vo.Account;

public interface UserMapper {
	
	
	void updatePass(Account account);
	
	int passInquiry(Account account);
	
	String idInquiry(Account account);
	
    int idCheck(String id);

    Account detailUsers(String id);
    
    void registerAccount(Account account);

    void updateUsers(Account account);

}
