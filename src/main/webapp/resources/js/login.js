let loginExit = false;
let registerExit = false;
let findExit = false;
const alphaDigit= 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
const regExp = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/; 
const special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi; 

$(document).on('click', '.openModal', (e) => {
	  forgot.openModal(e);     
});

$('.message a').click( () =>{
	  $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
	});

$(document).on("click", "#login_Btn", () => {
    login.validation();
    if(loginExit){
    	return;
    }
    login.login();
    
});

$(document).on('click', '#findId_btn' ,'#findPass_btn', () => {
	$('#find_result').css('display','none');
	login.findValid();
	 if(findExit){
	    	return;
	    }
});

$(document).on('keyup', ".login_txt", () => {
    login.hideMsg();
});

$(document).on("keyup", "#id_reg", () => {
	let idCh = $('#id_reg').val();
	register.IdCheck(idCh);
});

$(document).on("click", "#register_Btn", () => {
	if($('#result_reg_msg').find('p').css('color') == "rgb(253, 71, 43)"){
		swal($('#result_reg_msg').find('p').text());
		$('#id_reg').focus();
		return;
	}
	register.validation();
    if(registerExit){
    	return;
    }
    register.register();
    
});

let forgot = {
		openModal : (e) =>{
			if(e.target.id == 'forgotId_modal'){
			  $('.modal-title').text('Find ID');
			  $('.find_btn').attr('id','findId_btn');
			  $('#find_id').css('display','none');
			}else{
			  $('.modal-title').text('Find Password');
			  $('.find_btn').attr('id','findPass_btn');
			  $('#find_id').css('display','block');
			}
			$('#find_name').val('');
			$('#find_email').val('');
			$('#find_result').css('display','none');
			$('#myModal').modal('show');
			e.preventDefault();
		}
}

let register = {
		
		register :  () =>{
			let param = {
				id : $('#id_reg').val(),
				pass : $('#pass_reg').val(),
				name : $('#name_reg').val(),
				email : $('#email_reg').val()
			};

			$.ajax({
				type: "post",
				url: "/users/register",
				data: JSON.stringify(param),
				dataType: "json",
				contentType: 'application/json'
			}).done(function (result) {
				    if (result){
				    	 swal("회원가입에 성공하였습니다.");
				    	 $('#signIn_btn').trigger('click');
					}else{
						swal("회원가입에 실패하였습니다.");
						return;
					}
				});
		},
		
		validation : () =>{
			if(!$('#id_reg').val()){
				swal("아이디을 입력해주세요.");
				registerExit = true;
				$('#id_reg').focus();
				return;
			}	
			
		    if(!$('#pass_reg').val()){
		    	swal("비밀번호을 입력해주세요.");		
		    	registerExit = true;
		        $('#pass_reg').focus();
		    	return;
			}
		    if ($('#pass_reg').val().length < 4) {
		    	swal("비밀번호는 4자리 이상 입력하셔야 합니다.");
		    	$('#pass_reg').val('');
		        $('#pass_reg').focus();
		        registerExit = true;
		        return;
		        }
		    
		    if ($('#pass_reg').val().indexOf(" ") >= 0) {
		    	swal("비밀번호에는 공백이 들어가면 안됩니다.");
		    	$('#pass_reg').val('');
		        $('#pass_reg').focus();
		        registerExit = true;
		        return;
		        }
		    
		    for (i=0; i<$('#pass_reg').val().length; i++) {
		        if (alphaDigit.indexOf($('#pass_reg').val().substring(i, i+1)) < 0) {
		        swal("비밀번호는 영문과 숫자의 조합만 사용할 수 있습니다.");
		    	$('#pass_reg').val('');
		        $('#pass_reg').focus();
		        registerExit = true;
		        return;
		        } 
		      }
		    
		    if(!$('#name_reg').val()){
		    	swal("이름을 입력해주세요.");		
		    	registerExit = true;
		    	return;
			}
		    if(!$('#email_reg').val()){
		    	swal("이메일을 입력해주세요.");		
		    	registerExit = true;
		    	return;
			}else{
				 if(!regExp.test($('#email_reg').val())) { 
					 swal("이메일 주소가 유효하지 않습니다"); 
				      registerExit = true;
				      $('#email_reg').focus(); 
				      return; 
				   } 
			}
		    registerExit = false;
		},
		
		IdCheck : (id) => {
			let html = '';
			let pTag = '';
			
			$('#result_reg_msg').find('p').remove();
			
			if ($('#id_reg').val().length < 4 || $('#id_reg').val().length > 15){
				html = '<p style="color:#fd472b; font-size: 14px; font-weight:bold;">아이디는 4~15자 이내여야 합니다.<p>';
				$('.result_reg_msg').append(html);
				$('#result_reg_msg').css('display','block');
				$('#id_reg').focus();
				registerExit = true;
			    return;
			    }
			
			if ($('#id_reg').val().search(/\s/) != -1) {
			    html = '<p style="color:#fd472b; font-size: 14px; font-weight:bold;">아이디에는 공백이 들어가면 안됩니다.<p>';
				$('.result_reg_msg').append(html);
				$('#result_reg_msg').css('display','block');
				$('#id_reg').focus();
				registerExit = true;
			    return;
			    }
			
			if(special_pattern.test($('#id_reg').val()) == true) {
				html = '<p style="color:#fd472b; font-size: 14px; font-weight:bold;">아이디에 특수문자가 들어가면 안됩니다.<p>';
				$('.result_reg_msg').append(html);
				$('#result_reg_msg').css('display','block');
				$('#id_reg').focus();
				registerExit = true;
				return; 
				}
			
			for (i=0; i<$('#id_reg').val().length; i++) {
			      if (alphaDigit.indexOf($('#id_reg').val().substring(i, i+1)) == -1) {
			       html = '<p style="color:#fd472b; font-size: 14px; font-weight:bold;">아이디는 영문과 숫자의 조합만 사용할 수 있습니다.<p>';
					$('.result_reg_msg').append(html);
					$('#result_reg_msg').css('display','block');
					$('#id_reg').focus();
					registerExit = true;
			      return;
			      }
			    }
			
			$.ajax({
				url: "/users/register/" + id ,
			}).done(function (result) {
				if (result){
					 html = '<p style="color:#fd472b; font-size: 14px; font-weight:bold;">이미 사용중인 아이디 입니다.<p>';
				}else{
					 html = '<p style="color:#374850; font-size: 14px; font-weight:bold;">사용 가능한 아이디 입니다.<p>';
				}
				$('.result_reg_msg').append(html);
				$('#result_reg_msg').css('display','block');
				});
		}
};


let login = {
		
	findValid : () => {
		let url = '/users/id-inquiry'
		if($('.find_btn').attr('id')=='findPass_btn'){
			url = '/users/pass-inquiry'
			 if(!$('#find_id').val()){
			    	swal("아이디을 입력해주세요.");		
			    	findExit = true;
			    	return;
				}
		}
		
		 if(!$('#find_name').val()){
		    	swal("이름을 입력해주세요.");		
		    	findExit = true;
		    	return;
			}
		    if(!$('#find_email').val()){
		    	swal("이메일을 입력해주세요.");	
		    	findExit = true;
		    	return;
			}else{
				 if(!regExp.test($('#find_email').val())) { 
					 swal("이메일 주소가 유효하지 않습니다"); 
				      $('#find_email').focus(); 
				      findExit = true;
				      return; 
				   } 
			}
		    findExit = false;
		    login.findInquiry(url);
	},	
	findInquiry : (url) =>{
		$('#find_result').find('p').text('없는 정보입니다..');
		let param = {
				name:$('#find_name').val(),
				email:$('#find_email').val()
			};
		if(url == '/users/pass-inquiry'){
			param.id = $('#find_id').val();
		}
		$.ajax({
			type: "post",
			url: url,
			data: JSON.stringify(param),
			dataType: "json",
			contentType: 'application/json'
		}).done(function (result) {
			if(result.id){
				$('#find_result').find('p').text('아이디는 '+result.id + '입니다.');
			}else if(result.pass == 'success'){
				$('#find_result').find('p').text('이메일로 임시비밀번호를 발급하였습니다.');	
			}
			$('#find_result').css('display','block');
		});
		 
	},	
	
	login :  () => {
		let param = {
			id:$('#id_lg').val(),
			pass:$('#pass_lg').val()
		};
		$('#result_lg_msg').find('p').remove();
		
		$.ajax({
			type: "post",
			url: "/users/login",
			data: JSON.stringify(param),
			dataType: "json",
			contentType: 'application/json'
		}).done(function (result) {
			if (result){
			location.href="/board/list.do";
			}else{
				let html = '<p style="color:#fd472b; font-size: 14px; font-weight:bold">아이디 또는 비밀번호가 일치하지 않습니다 .<p>';
				$('.result_lg_msg').append(html);
				$('#result_lg_msg').css('display','block');
				return;
			}
		});
	},
	
	hideMsg : () =>{
		 if ( $('#result_msg').css('display') == "block" ){
			 $('#result_msg').css('display','none');
		 }

	},
	
	validation : () =>{
		if(!$('#id_lg').val()){
			swal("아이디을 입력해주세요.");
			loginExit = true;
			return;
		}
	    if(!$('#pass_lg').val()){
	    	swal("비밀번호을 입력해주세요.");		
	    	loginExit = true;
	    	return;
		}
	        loginExit = false;
	}
};