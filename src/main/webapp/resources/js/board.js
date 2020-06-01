// board---
$(document).ready(()=>{
	const height = 400;
	const minHeight = null;
	const manHeight = null;
	$('#wt_content').summernote({
		placeholder : 'write_content',
		height: height,
	    minHeight: minHeight,             // set minimum height of editor
	    maxHeight: manHeight             // set maximum height of editor
		});
	$('#update_content').summernote({
		placeholder : $("#update_content").data("content"),
		height: height,
	    minHeight: minHeight,             // set minimum height of editor
	    maxHeight: manHeight             // set maximum height of editor
	    });
	$('.summernote').summernote({
	    height: height,
		minHeight: minHeight,             // set minimum height of editor
		maxHeight: manHeight             // set maximum height of editor
	    });
	Date.prototype.format = function(f) {
		const MM = this.getMonth() + 1; // getMonth() is zero-based
		const dd = this.getDate();
		const HH = this.getHours();
		const mm = this.getMinutes();
		const ss = this.getSeconds();

		return [this.getFullYear() + '-',
			(MM>9 ? '' : '0') + MM + '-',
			(dd>9 ? '' : '0') + dd + ' ',
			(HH>9 ? '' : '0') + HH + ':',
			(mm>9 ? '' : '0') + mm + ':',
			(ss>9 ? '' : '0') + ss
		].join('');
	};

    
});

let word;
let search;
$("#write").click(()=>{location.href="/board/writeForm.do";});

 $("#word_content").keyup(function(){
	 let resultVal = "";
	 let paging = "";
	 var date = new Date();
	 search = $("#select_box").val();
	 word = $(this).val();
	    $("#board_tb > tbody > tr:gt(0)").remove();
	    $("#board_paging").remove();
	    
	    $.ajax({
	        url: '/board/search.do',
	        data: { "search": search, "word": word },
	        success: function (result) {
	            $("#board_tb > tbody > tr:gt(0)").remove();
	            $("#board_none").remove();
	            $("#pageCount").find("span").remove();
	            $(".pagination").remove();
	            if(result.list.length > 0){
	                for(let b of result.list) {
	                	resultVal += "<tr><td>" + b.no + "</td><td><a data-pageno='" + b.pageNo + "' data-no='" + b.no + "' id='detail_btn' href='/board/detail.do?no="+b.no + "&pageNo="+b.pageNo+"&search="+search+"&word="+word+"'>" + b.title + "</a></td>"; 
		                   resultVal += "<td>" + b.writer + "</td><td>" + b.content + "</td><td>" + b.viewCnt + "</td>";
		                   resultVal += "<td>" + new Date(b.createDate).format(); + "</td></tr>";

		            }
	                $("#pageCount").html("<span>게시물 총 " + result.pageResult.count + " 개</span");
	                if(result.pageResult.count !=0){
	                paging += "<div id='pageForm'><ul class='pagination' id='board_paging'>";
	                    if(result.pageResult.prev){
	                    	paging += "<li class='paginate_button previous' id='example2_previous'>";
	                    	paging += "<a href='list.do?pageNo="+ (result.pageResult.beginPage -1) + "&search="+search+"&word="+word+"'aria-controls='example2' data-dt-idx='0' tabindex='0'>Previous</a></li>";
	                    }
	                 for(var i = result.pageResult.beginPage; i<=result.pageResult.endPage; i++ ) {
	                	    paging += "<li class='paginate_button active'>";
	                	    paging += "<a href='list.do?pageNo=" + i +"&search="+search+"&word="+word+"'>"+i+"</a></li>";
	                }
	                 if(result.pageResult.next){
	                	    paging += "<li class='paginate_button next' id='example2_next'>";
	                    	paging += "<a href='list.do?pageNo="+ (result.pageResult.endPage +1) + "&search="+search+"&word="+word+"'aria-controls='example2' data-dt-idx='7' tabindex='0'>Next</a></li>";	                    	
	                 }
	                }
	                paging += "</ul></div>"
	            $("#board_tb").append(resultVal);
	            $("#pagination_con").append(paging);    
	            } else {
	            	resultVal += "<div id='board_none'><span id='none_text'>검색한 게시물이 없습니다.</span></div>"
	            $("#result").html(resultVal);
	            }	           
	        }
	    })
	});
	 
	String.prototype.string = function(len) {
		let s = '', i = 0;
		while (i++ < len) { s += this; } return s;
		};
	String.prototype.zf = len =>  "0".string(len - this.length) + this;
	Number.prototype.zf = len=>  this.toString().zf(len);



//  write---
  $(document).on("click", "#write_btn", () => {
	    if (!$("#wt_title").val()) {
	    	swal("제목을 입력해주세요.");
	        return false;
	    } else if (!$("#wt_content").val()) {
	    	swal("내용을 입력해주세요.");
	        return false;
	    } else {
	        $("#write_form_sb").submit();
	    }
	})
	$("#write_btn_can").click(() => {location.href="/board/list.do";});
  
  // detail---
  
  $(document).on("click", "#detail_list_btn", function()  {
	  let url = "/board/list.do?pageNo=" + $(this).data("pageno");
	  if(!!$(this).data("search")){
			url += "&search=" + $(this).data("search") + "&word=" + $(this).data("word");
		}
	  $('#select_box').val($(this).data("search"));
		location.href = url;
	});
	$(document).on("click", "#detail_update_btn", function() {
		location.href="/board/updateForm.do?no=" + $(this).data("no") +  "&pageNo=" + $("#detail_list_btn").data("pageno") + "&search=" + $("#detail_list_btn").data("search") + "&word=" + $("#detail_list_btn").data("word");
	});
	$(document).on("click", "#detail_delete_btn", ()=> {
		location.href="/board/delete.do?no=" + $("#detail_update_btn").data("no") + "&pageNo=" + $(this).data("pageno") ; 
	});
	
	
	// 게시글 클릭시 조회수 증가
	$(document).on("click","#detail_btn" ,function(){
		$.ajax({
			url: "/board/viewCnt/" + $(this).data("no") ,
			type:"Get"
		});
	});

	
	// update---
	$("#update_btn").click(()=> {
	    if (!$("#update_title").val()) {
	        $("#update_title").val($("#update_title").attr("placeholder"));
	    }
	    if (!$("#update_content").val()) {
	        $("#update_content").val($("#update_content").attr("placeholder"));
	    }
	    $("#update_sb").submit();
	});
	$("#update_btn_cancel").click(function(){
		location.href="/board/detail.do?no=" + $(this).data("no") + "&pageNo=" + $(this).data("pageno") + "&search=" + $(this).data("search") + "&word=" + $(this).data("word"); 
	});
