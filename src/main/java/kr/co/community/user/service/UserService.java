package kr.co.community.user.service;


import kr.co.community.repository.vo.Account;

public interface UserService {

    int idCheck(String id);

    Account loginAccount(Account account);

}
