package kr.co.community.repository.vo;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class Account {
	private int no;
	private String id;
	private String pass;
	private String name;
	private String email;
	private String resignation;
	private Date createDate;
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
	public String getPass() {
		return pass;
	}
	public void setPass(String pass) {
		this.pass = pass;
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
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}	
	


}
