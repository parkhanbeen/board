let userName;
let userEmail;
let modifyInfoExit = false;
const regExpEmail = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/; 


$(document).on('click', '#myPage_btn', (e) => {
	$("#modal").removeClass().addClass("one");
    $("body").css("overflow", "hidden");
	$("html").css("overflow", "hidden");
	myPage.changInfoCancle();
	setTimeout(() => {
		$("#board_paging").find('.active').attr('class','paginate_button').addClass("pagination_li");		
	}, 700);

});

$(".close").click(()=>{
	  $("#modal").addClass("out");
//	  $("body").css("overflow", "auto");
//	  $("html").css("overflow", "auto");
	  $(".modal-bg").css("overflow", "scroll");
	  setTimeout(() => {
		  $("#board_paging").find('.pagination_li').addClass('active');		
	}, 700);
	  $("#userName").empty().text(userName);
	  $("#userEmail").empty().text(userEmail);
});

// 모달 


$('#img_modify').click(()=>{
	if($('#modify_btn').css('display') =='none'){
		$('#user_imgUpload').trigger('click');	
	}
});		


$(document).on('click','#modify_btn',()=>{
	myPage.changInfoForm();
});

$(document).on('click','#modifySuccess_btn',()=>{
	myPage.changInfoValid();
	if(modifyInfoExit){
		return;
	}
});

$(document).on('click','#modifyCancle_btn',()=>{
	myPage.changInfoCancle();
	$("#userName").empty().text(userName);
	$("#userEmail").empty().text(userEmail);
});

$(document).on('click','#modifyPass_btn',()=>{
	
});

$('#img_modify')
.on("dragover", dragOver)
.on("dragleave", dragOver)
.on("drop", uploadFiles);

function dragOver(e){
  e.stopPropagation();
  e.preventDefault();
  if (e.type == "dragover") {
      $(e.target).css({
          "background-color": "black",
          "outline-offset": "-20px"
      });
  } else {
      $(e.target).css({
          "background-color": "gray",
          "outline-offset": "-10px"
      });
  }
}

function uploadFiles(e) {
  e.stopPropagation();
  e.preventDefault();
  dragOver(e);

  e.dataTransfer = e.originalEvent.dataTransfer;
  var files = e.target.files || e.dataTransfer.files;
  if (files.length > 1) {
      alert('하나만 올려라.');
      return;
  }
  if (files[0].type.match(/image.*/)) {
              $(e.target).css({
          "background-image": "url(" + window.URL.createObjectURL(files[0]) + ")",
          "outline": "none",
          "background-size": "100% 100%"          
      });
      $(e.target).attr({
    	  "src":"url(" + window.URL.createObjectURL(files[0]) + ")"      
      });
  }else{
    alert('이미지가 아닙니다.');
    return;
  }
}

var myPage = {
		
	changInfoForm : () =>{
	    userName = $("#userName").text() == ''? $("#userName").find('input').attr('placeholder') : $("#userName").text();
	    userEmail = $("#userEmail").text() == ''? $("#userEmail").find('input').attr('placeholder') : $("#userEmail").text();
		
	     $("#userName").text('');
	     $("#userName").append('<input type="text" placeholder="'+userName+'">');
	     
	     $("#userEmail").text('');
	     $("#userEmail").append('<input type="text" placeholder="'+userEmail+'">');
	     
	     $("#img_modify").addClass("img_modify");
	     $("#modifySuccess_btn").show();
	     $("#modifyCancle_btn").show();
	     $("#modify_btn").hide();
	     $("#modifyPass_btn").hide();
	 },
	 
	 changInfoValid : () =>{
		 
		 if($("#userEmail").find('input').val()){
			 if(!regExpEmail.test($("#userEmail").find('input').val())) { 
				 swal("이메일 주소가 유효하지 않습니다"); 
				 $('#userEmail').focus(); 
				 modifyInfoExit = true;
				 return; 
			 } 		    	  			 
		 }
			
		  modifyInfoExit = false;
	 },
	 changInfoCancle : () =>{
		 $("#img_modify").removeClass("img_modify");
		 $("#modify_btn").show();
		 $("#modifyPass_btn").show();
		 $("#modifySuccess_btn").hide();
	     $("#modifyCancle_btn").hide();
		 
	 }
}



