let userName;
let userEmail;
let modifyInfoExit = false;
let globalImg;
const regExpEmail = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/; 


$(document).on('click', '#myPage_btn', (e) => {
	$('#modal').removeClass().addClass('one');
    $('body').css('overflow', 'hidden');
	$('html').css('overflow', 'hidden');
	myPage.changInfoProcess();
	myPage.imgReset();
	setTimeout(() => {
		$('#board_paging').find('.active').attr('class','paginate_button').addClass('pagination_li');
	}, 700);

});

$('.close').click(()=>{
	  $('#modal').addClass('out');
	  $('.modal-bg').css('overflow', 'scroll');
	  setTimeout(() => {
		  $('#board_paging').find('.pagination_li').addClass('active');
	}, 700);
	  $('#userName').empty().text(userName);
	  $('#userEmail').empty().text(userEmail);
});

// 모달 


$('#img_modify').click(()=>{
	if($('#modify_btn').css('display') =='none'){
		$('#user_imgUpload').trigger('click');
	}
});

function readURL(input) {
	if (input.files && input.files[0]) {
		let reader = new FileReader();
		reader.onload = function(e) {
			globalImg = e.target.result;
			$('#img_modify').attr('src', e.target.result);
		}
		reader.readAsDataURL(input.files[0]);
	}
}

//$('#user_imgUpload').change(function() {
//	readURL(this);
//});

$(document).on('change','#user_imgUpload',function(){
	readURL(this);
});

$(document).on('click','#modify_btn',()=>{
	myPage.changInfoForm();
});

// mypage 수정완료 클릭
$(document).on('click','#modifySuccess_btn',()=>{
	myPage.changInfoValid();
	if(modifyInfoExit){
		return;
	}
	
	let form = new FormData($("#userForm")[0]);
	
	form.append('no',$('#img_modify').data("no"));
	form.append('name',$('#userInputName').val() == '' ? userName : $('#userInputName').val());
	form.append('email',$('#userInputEmail').val() == '' ? userEmail : $('#userInputEmail').val());
	
	$('.proImg').attr('src', globalImg);
	
	$.ajax({
		url: '/users/' + $('#userId').text(),
		type:'post',
		data: form,
		enctype: 'multipart/form-data',
	    processData: false,
	    contentType: false,
	    cache: false,
	    async: false
	}).done(function (result) {
		if(result=='success'){
			swal('수정되었습니다.');
			let userDt = myPage.selectDetail();
			userName = userDt.name;
			userEmail = userDt.email;
			myPage.changInfoProcess();
			$('.disName').empty().text(userName);
			$('#userName').empty().text(userName);
			$('#userEmail').empty().text(userEmail);
					
		}else{
			swal('수정중 오류발생');
		}
		
	});
	
	setTimeout(() => {
		$('.proImg').attr('src', '/local_images/'+$('#img_modify').data('no')+'.jpg?');
	}, 50);	
	
	
});

$(document).on('click','#modifyCancle_btn',()=>{
	myPage.changInfoProcess();
	myPage.imgReset();
	$('#userName').empty().text(userName);
	$('#userEmail').empty().text(userEmail);
});

$(document).on('click','#modifyPass_btn',()=>{
	
});

$('#img_modify')
.on('dragover', dragOver)
.on('dragleave', dragOver)
.on('drop', uploadFiles);

function dragOver(e){
  e.stopPropagation();
  e.preventDefault();
  if (e.type == 'dragover') {
      $(e.target).css({
          'background-color': 'black',
          'outline-offset': '-20px'
      });
  } else {
      $(e.target).css({
          'background-color': 'gray',
          'outline-offset': '-10px'
      });
  }
}

function uploadFiles(e) {
  e.stopPropagation();
  e.preventDefault();
  dragOver(e);

  e.dataTransfer = e.originalEvent.dataTransfer;
  let files = e.target.files || e.dataTransfer.files;
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

let myPage = {
		
	changInfoForm : () =>{
	    userName = $('#userName').text() == ''? $('#userName').find('input').attr('placeholder') : $('#userName').text();
	    userEmail = $('#userEmail').text() == ''? $('#userEmail').find('input').attr('placeholder') : $('#userEmail').text();
		
	     $("#userName").text('');
	     $("#userName").append('<input id="userInputName" type="text" placeholder="'+userName+'">');
	     
	     $("#userEmail").text('');
	     $("#userEmail").append('<input id="userInputEmail" type="text" placeholder="'+userEmail+'">');
	     
	     $('#img_modify').addClass('img_modify');
	     $('#modifySuccess_btn').show();
	     $('#modifyCancle_btn').show();
	     $('#modify_btn').hide();
	     $('#modifyPass_btn').hide();
	 },
	 
	 changInfoValid : () =>{
		 
		 if($('#userEmail').find('input').val()){
			 if(!regExpEmail.test($("#userEmail").find('input').val())) { 
				 swal('이메일 주소가 유효하지 않습니다');
				 $('#userEmail').focus(); 
				 modifyInfoExit = true;
				 return; 
			 } 		    	  			 
		 }
			
		  modifyInfoExit = false;
	 },
	 changInfoProcess : () =>{
		 
		 $('#img_modify').removeClass('img_modify');
		 $('#modify_btn').show();
		 $('#modifyPass_btn').show();
		 $('#modifySuccess_btn').hide();
	     $('#modifyCancle_btn').hide();
	 },
	 imgReset : () =>{
		 $('#img_modify').attr('src', '/local_images/'+$('#img_modify').data("no")+'.jpg');		 
	 },
	 selectDetail : () =>{
		 let value = '';
		 $.ajax({
				url: '/users/' + $('#userId').text(),
				type:'get',
				async: false
			}).done(function (result) {
				value = result
			});
				return value;		 
	 }
}



