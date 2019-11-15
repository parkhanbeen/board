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
        Page Board/Detail
        <small>CenTerLink Board</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Page</a></li>
        <li class="active">Detail</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content container-fluid">

     <div id="detail_con">
    <table id="detail_table">
        <tr>
            <td>글번호:</td>
            <td>${board.no }</td>
        </tr>
        <tr>
            <td>제목:</td>
            <td>${board.title }</td>
        </tr>
        <tr>
            <td>작성자:</td>
            <td>${board.writer }</td>
        </tr>
        <tr>
            <td>내용:</td>
            <td>${board.content }</td>
        </tr>
        <tr>
            <td>작성일:</td>
            <td><fmt:formatDate value="${board.createDate }" pattern="yyyy-MM-dd HH:mm:ss"/></td>
        </tr>
        
    </table>
     <button data-no="${board.no }" class="detail_btn" id="detail_update_btn">수정</button>
     <button class="detail_btn" id="detail_delete_btn">삭제</button>
     <button data-pageNo="${b.pageNo }" data-search="${b.search }" data-word="${b.word }" class="detail_btn" id="detail_list_btn">목록</button>
</div>

    </section>
  </div>
  <div class="control-sidebar-bg"></div>
</div>

</body>
</html>