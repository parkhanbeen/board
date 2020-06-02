$(document).on('click', '#myPage_btn', (e) => {
	$("#modal").removeClass().addClass("one");
    $("body").css("overflow", "hidden");
	$("html").css("overflow", "hidden");
	setTimeout(() => {
		$("#board_paging").find('.active').attr('class','paginate_button').addClass("pagination_li");		
	}, 700);

});

$(".close").click(function(){
	  $("#modal").addClass("out");
//	  $("body").css("overflow", "auto");
//	  $("html").css("overflow", "auto");
	  $(".modal-bg").css("overflow", "scroll");
	  setTimeout(() => {
		  $("#board_paging").find('.pagination_li').addClass('active');		
	}, 700);
});

// 모달 

var myPage = {
		
}