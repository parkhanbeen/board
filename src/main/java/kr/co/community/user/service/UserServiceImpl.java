package kr.co.community.user.service;

import kr.co.community.repository.mapper.UserMapper;
import kr.co.community.repository.vo.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserMapper mapper;


    @Override
    public int idCheck(String id) {
        return mapper.idCheck(id);
    }

    @Override
    public Account loginAccount(Account account) {
        return mapper.loginAccount(account);
    }

	@Override
	public void registerAccount(Account account) throws Exception{
		 mapper.registerAccount(account);
	}

	@Override
	public String idInquiry(Account account) {
		return mapper.idInquiry(account);
	}
}
