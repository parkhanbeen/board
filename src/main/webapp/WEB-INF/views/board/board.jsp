<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
  
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<html>

<body class="hold-transition skin-blue sidebar-mini">
<div class="wrapper">

  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Page Board
        <small>CenTerLink Board</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Page</a></li>
        <li class="active">Board</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content container-fluid">
<div id="board_con">
   <div id="select_con">
    <select id="select_box" name="search">
        <option value="all"  seleted="seleted">통합검색</option>
        <option value="title" ${b.search eq "title" ? "selected" :""}>제목</option>
        <option value="a.name" ${b.search eq "a.name" ? "selected" :""}>작성자</option>
        <option value="content" ${b.search eq "content" ? "selected" :""}>내용</option>
    </select>
    <c:choose>
    <c:when test="${empty b.word }">
    <input id="word_content" type="text" name="word" placeholder="검색어를 입력하세요!"/>
    </c:when>
    <c:otherwise>
    <input id="word_content" type="text" name="word" placeholder="검색어를 입력하세요!" value="${b.word }" />
    </c:otherwise>
    </c:choose>
</div>

<div id="main_board">
    <table id="board_tb">
        <tr>
            <td style="width:10%;">글번호</td>
            <td>제목</td>
            <td>작성자</td>
            <td>내용</td> 
            <td>조회수</td>           
            <td>작성일</td>
        </tr>
        <c:if test="${not empty list  }">
        <c:forEach var="l" items="${list}"> 
            <tr>
                <td>${l.no}</td>
                <td><a data-no="${l.no}" data-pageno="${l.pageNo }" id="detail_btn" href="/board/detail.do?no=${l.no}&pageNo=${b.pageNo}">${l.title }</a></td>
                <td>${l.writer }</td>
                <td id="boardText">${l.content }</td>
                <td>${l.viewCnt }</td>
                <td><fmt:formatDate value="${l.createDate }" pattern="yyyy-MM-dd HH:mm:ss"/></td><input  type="hidden" name="pageNo">               
            </tr>
        </c:forEach>
        </c:if>
    </table>
    <div id="pagination_con">
    <div id="pageCount"><span>게시물 총 ${pageResult.count } 개</span></div>
    <div id="pageForm">
     <ul class="pagination" id="board_paging">
                <c:if test="${pageResult.count != 0 && not empty b.search}">
                  <c:if test="${pageResult.prev eq true}">
                    <li class="paginate_button previous" id="example2_previous">
                      <a href="list.do?pageNo=${pageResult.beginPage - 1}&search=${b.search}&word=${b.word}" aria-controls="example2" data-dt-idx="0" tabindex="0">Previous</a>
                    </li>
                    </c:if>
                    <c:forEach var="i" begin="${pageResult.beginPage}" end="${pageResult.endPage}">
                    <li class="paginate_button active">
                      <a class="pagenumber" href="list.do?pageNo=${i}&search=${b.search }&word=${b.word}">${i}</a>
                    </li>
                    </c:forEach>
                    <c:if test="${pageResult.next eq true}">
                    <li class="paginate_button next" id="example2_next">
                      <a href="list.do?pageNo=${pageResult.endPage + 1}&search=${b.search }&word=${b.word}" aria-controls="example2" data-dt-idx="7" tabindex="0">Next</a>
                    </li>
                    </c:if>
                    
                    </c:if>
                    <c:if test="${pageResult.count != 0 && empty b.search}">
                    <c:if test="${pageResult.prev eq true}">
                    <li class="paginate_button previous" id="example2_previous">
                      <a href="list.do?pageNo=${pageResult.beginPage - 1}&search=${b.search }&word=${b.word}" aria-controls="example2" data-dt-idx="0" tabindex="0">Previous</a>
                    </li>
                    </c:if>
                    <c:forEach var="i" begin="${pageResult.beginPage}" end="${pageResult.endPage}">
                    <li class="paginate_button active">
                      <a class="pagenumber" href="list.do?pageNo=${i}&search=${b.search }&word=${b.word}">${i}</a>
                    </li>
                    </c:forEach>
                    <c:if test="${pageResult.next eq true}">
                    <li class="paginate_button next" id="example2_next">
                      <a href="list.do?pageNo=${pageResult.endPage + 1}&search=${b.search }&word=${b.word}" aria-controls="example2" data-dt-idx="7" tabindex="0">Next</a>
                    </li>
                    </c:if>
                    </c:if>
                    </ul>
                    </div>
    <div id="result"></div>
</div>
    <div id="write_btn_div">
    <button id="write">글쓰기</button>
    </div>
</div>
    </section>
  </div>
  <div class="control-sidebar-bg"></div>
</div>
</body>
</html>