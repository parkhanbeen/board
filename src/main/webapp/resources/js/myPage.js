let userName;
let userEmail;
let modifyInfoExit = false;
let globalImg;
let changePassExit;
const alphaDigits= 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
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
		$('.proImg').attr('src', '/local_images/'+$('#img_modify').data('no')+'.jpg?'+ Math.random());
	}, 50);	
	
	
});

$(document).on('click','#modifyCancle_btn',()=>{
	myPage.changInfoProcess();
	myPage.imgReset();
	$('#userName').empty().text(userName);
	$('#userEmail').empty().text(userEmail);
});

//비밀번호 변경
$(document).on('click','#modifyPass_btn',()=>{
	myPage.changePasswordForm();
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
	     $('#myPageForm').show();
		 $('#passwordForm').hide();
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
	 },
	 changePasswordForm : () =>{
		 $('#myPageForm').hide();
		 $('#passwordForm').show();
		 
		 $(document).on('click','#passChangeCancle_btn',()=>{
				myPage.changInfoProcess();
				myPage.imgReset();
				
				$('.passwordInput').val('');
		});
		 
		 $(document).on('click','#passChange_btn',()=>{
				myPage.changePassword();
		});
	 },
	 changePassword : () =>{
		 
		 let passInputId = ['currentPass','resetpass','confirmResetpass']
		 for(let i=0;i<3;i++){
			 myPage.passValidate(passInputId[i]);
			 if(changePassExit){
				 return;
			 }
		 }
		 
		 if(!$('#'+passInputId[1]).val() == $('#'+passInputId[2]).val()){
			 swal('새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.');	
			 return;
		 }
		 
		 let chPassParam = {'newPass' : $('#'+passInputId[0]).val(),
				            'oldPass' : $('#'+passInputId[2]).val()
		                   }
		 
		 $.ajax({  
				url: '/users/' + $('#userId').text() + '/password',
				type:'patch',
				data: JSON.stringify(chPassParam),
				dataType : 'json',
				contentType: 'application/json'
			}).done(function (result) {
				swal(result.msg);
			});
		 setTimeout(() => {
			 $('#passChangeCancle_btn').trigger('click');			
		}, 500);
		 
	 },
	 passValidate : (password) =>{
		 if(!$('#'+password).val()){
		    	swal($('#'+password).attr('placeholder'));		
		    	changePassExit = true;
		    	$('#'+password).focus();
		    	return;
			}
		    if ($('#'+password).val().length < 4) {
		    	swal("비밀번호는 4자리 이상 입력하셔야 합니다.");
		    	$('#'+password).val('');
		    	$('#'+password).focus();
		    	changePassExit = true;
		        return;
		        }
		    
		    if ($('#'+password).val().indexOf(" ") >= 0) {
		    	swal("비밀번호에는 공백이 들어가면 안됩니다.");
		    	$('#'+password).val('');
		        $('#'+password).focus();
		        changePassExit = true;
		        return;
		        }
		    
		    for (i=0; i<$('#'+password).val().length; i++) {
		        if (alphaDigits.indexOf($('#'+password).val().substring(i, i+1)) < 0) {
		        swal('비밀번호는 영문과 숫자의 조합만 사용할 수 있습니다.');
		    	$('#'+password).val('');
		        $('#'+password).focus();
		        changePassExit = true;
		        return;
		        } 
		      }
		    
		    changePassExit = false;
	 }
	 
}



