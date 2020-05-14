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
    
    
});