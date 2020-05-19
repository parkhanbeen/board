$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

$(document).on("click", "#login_Btn", () => {
	if(!$('#id_lg').val()){
		swal("아이디을 입력해주세요.");
		return false;
	}
    if(!$('#password_lg').val()){
    	swal("비밀번호을 입력해주세요.");		
    	return false;
	}
    login.login();
    
});

let login = {
	login : function () {
		console.log($('#id_lg').val());
		console.log($('#password_lg').val());


		let param = {
			id:$('#id_lg').val(),
			password:$('#password_lg').val()
		};

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
				swal("아이디 또는 비밀번호가 일치하지 않습니다 .")
				return;
			}
		});
	}
};