package kr.co.community.repository.mapper;

import kr.co.community.repository.vo.Account;

public interface UserMapper {
    int idCheck(String id);

    Account loginAccount(Account account);
    
    void registerAccount(Account account);

}
