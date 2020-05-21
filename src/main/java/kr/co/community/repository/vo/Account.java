package kr.co.community.repository.vo;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class Account {
	private int no;
	private String id;
	private String password;
	private String name;
	private String email;
	private String resignation;
	public int getNo() {
		return no;
	}	
	public void setNo(int no) {
		this.no = no;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getResignation() {
		return resignation;
	}
	public void setResignation(String resignation) {
		this.resignation = resignation;
	}
	


}
