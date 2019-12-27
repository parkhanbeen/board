<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<html>
<%-- <%@ include file="../include/head.jsp" %> --%>
<body class="hold-transition skin-blue sidebar-mini">
<div class="wrapper">
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Page Board/update
        <small>CenTerLink Board</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Page</a></li>
        <li class="active">Update</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content container-fluid">

     <div id="update_con">
    <form id="update_sb" action="/board/update.do" method="post">
        <input type="hidden" name="no" value="${board.no }" />
        <table id="update_table">
            <tr>
                <td>글번호</td>
                <td>${board.no }</td>
            </tr>
            <tr>
                <td>작성자</td>
                <td>${board.writer }</td>
            </tr>
            <tr>
                <td>제목</td>
                <td><input id="update_title" class="update_content" type="text" name="title" placeholder="${board.title }" /></td>
            </tr>
            <tr>
                <td>내용</td>
                <td id="update_content_td">
                    
                    <%-- <input id="update_content" class="update_content" type="text" name="content" placeholder="${board.content }" />   --%>   
                    <textarea style="resize: none;" class="summernote" id="update_content"  name="content" data-content="${board.content }"></textarea>              
                </td>
            </tr>
            <tr>
                <td>작성일</td>
                <td><fmt:formatDate value="${board.createDate }" pattern="yyyy-MM-dd HH:mm:ss"/></td>
            </tr>

        </table>
        <button class="update_btn" id="update_btn" type="button">수정</button>
    </form>
     <button data-pageno="${b.pageNo }" data-word="${b.word }" data-search="${b.search }" data-no="${board.no }" id="update_btn_cancel" class="update_btn">취소</button>
</div>

    </section>
  </div>
  <div class="control-sidebar-bg"></div>
</div>
</body>
</html>