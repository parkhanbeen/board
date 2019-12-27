// board---

$(document).ready(function(){
	$('.summernote').summernote({
		placeholder: 'Write contents',
        height: 400,
        minHeight: null,             // set minimum height of editor
        maxHeight: null,             // set maximum height of editor
      });
});

/* jshint esversion: 6 */
var word;
var search;
 $("#write").click(function(){
	 location.href="/board/writeForm.do"; 
 });
 
 $("#word_content").keyup(function () {
	    console.log($(this).val());
	    var resultVal = "";
	    var paging = "";
	    var date = new Date();
	    search = $("#select_box").val();
	    word = $(this).val();
	    $("#board_tb > tbody > tr:gt(0)").remove();
	    $("#board_paging").remove();
	    
	    $.ajax({
	        type:"post",
	        url: "/board/search.do",
	        data: { "search": search, "word": word },
	        dataType: "json",
	        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	        success: function (result) {	            
	            $("#board_tb > tbody > tr:gt(0)").remove();
	            $("#board_none").remove();
	            $("#pageCount").find("span").remove();
	            if(result.list.length > 0){
	                for(let b of result.list) {
	                	resultVal += "<tr><td>" + b.no + "</td><td><a data-pageno='" + b.pageNo + "' data-no='" + b.no + "' id='detail_btn' href='/board/detail.do?no="+b.no + "&pageNo="+b.pageNo+"&search="+search+"&word="+word+"'>" + b.title + "</a></td>"; 
		                   resultVal += "<td>" + b.writer + "</td><td>" + b.content + "</td><td>" + b.viewCnt + "</td>";
		                   resultVal += "<td>" + new Date(b.createDate).format("yyyy-MM-dd hh:mm:ss") + "</td></tr>";
		            }
	                $("#pageCount").html("<span>게시물 총 " + result.pageResult.count + "개</span");
	                if(result.pageResult.count !=0){
	                paging += "<ul class='pagination' id='board_paging'>";
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
	                paging += "</ul>"
	            $("#board_tb").append(resultVal);
	            $("#pagination_con").append(paging);    
	            } else {
	            	resultVal += "<div id='board_none'><span id='none_text'>검색한 게시물이 없습니다.</span></div>"
	            $("#result").html(resultVal);
	            }	           
	        }
	    })
	});
 
 Date.prototype.format = function(f) {
	    if (!this.valueOf()) return " ";
	 
	    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
	    var d = this;
	     
	    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
	        switch ($1) {
	            case "yyyy": return d.getFullYear();
	            case "yy": return (d.getFullYear() % 1000).zf(2);
	            case "MM": return (d.getMonth() + 1).zf(2);
	            case "dd": return d.getDate().zf(2);
	            case "E": return weekName[d.getDay()];
	            case "HH": return d.getHours().zf(2);
	            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
	            case "mm": return d.getMinutes().zf(2);
	            case "ss": return d.getSeconds().zf(2);
	            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
	            default: return $1;
	        }
	    });
	};
	 
	String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
	String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
	Number.prototype.zf = function(len){return this.toString().zf(len);};



//  write---
  $(document).on("click", "#write_btn", function () {
	    if (!$("#wt_title").val()) {
	    	swal("제목을 입력해주세요.");
	        return false;
	    } else if (!$("#wt_writer").val()) {
	    	swal("작성자을 입력해주세요.");
	        return false;
	    } else if (!$("#wt_content").val()) {
	    	swal("내용을 입력해주세요.");
	        return false;
	    } else {
	        $("#write_form_sb").submit();
	    }
	})
	$("#write_btn_can").click(function(){
		location.href="/board/list.do"; 
	});
  
  
  // detail---
  
  $(document).on("click", "#detail_list_btn", function () {
		var url = "/board/list.do?pageNo="+ $(this).data("pageno");
		if(!!$(this).data("search")){
			url += "&search=" + $(this).data("search") + "&word=" + $(this).data("word");
		}
		location.href = url;

	});
	$(document).on("click", "#detail_update_btn", function () {
		location.href="/board/updateForm.do?no=" + $(this).data("no") +  "&pageNo=" + $("#detail_list_btn").data("pageno") + "&search=" + $("#detail_list_btn").data("search") + "&word=" + $("#detail_list_btn").data("word"); ; 
	});
	$(document).on("click", "#detail_delete_btn", function () {
		location.href="/board/delete.do?no=" + $("#detail_update_btn").data("no") + "&pageNo=" + $(this).data("pageno") ; 
	});
	
	
	// 게시글 클릭시 조회수 증가
	$(document).on("click","#detail_btn" , function(){
		$.ajax({
			url: "/board/viewCnt/" + $(this).data("no") ,
			type:"Get"
		});
	});

	
	// update---
	$("#update_btn").click(function () {
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
