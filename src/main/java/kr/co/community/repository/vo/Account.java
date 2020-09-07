package kr.co.community.repository.vo;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import org.springframework.web.multipart.MultipartFile;


@Getter
@Setter
@ToString
public class Account {
	private int no;
	private String id;
	private String pass;
	private String name;
	private String email;
	private String resignation;
	private Date createDate;
	private MultipartFile attach;
	

}
