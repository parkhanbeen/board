var loginExit = false;
$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

$(document).on("click", "#login_Btn", () => {
    login.validation();
    if(loginExit){
    	return;
    }
    login.login();
    
});

$(document).on("keyup", ".login_txt", () => {
    login.hideMsg();
});

let login = {
	login : function () {
		let param = {
			id:$('#id_lg').val(),
			pass:$('#pass_lg').val()
		};
		$('#result_msg').find('p').remove();
		
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
				var html = '<p style="color:#fd472b; font-size: 14px; font-weight:bold">아이디 또는 비밀번호가 일치하지 않습니다 .<p>';
//				swal("아이디 또는 비밀번호가 일치하지 않습니다 .");
				$('.result_msg').append(html);
				$('#result_msg').css('display','block');
				return;
			}
		});
	},
	hideMsg : function(){
		 if ( $('#result_msg').css('display') == "block" ){
			 $('#result_msg').css('display','none');
		 }

	},
	validation : function(){
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