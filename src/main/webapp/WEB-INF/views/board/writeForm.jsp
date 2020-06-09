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
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Page Board/Write
        <small>CenTerLink Board</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Page</a></li>
        <li class="active">Write</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content container-fluid">

     <div id="write_con">
    <form id="write_form_sb" action="/board/write.do" method="post">
        <div id="write_main">
            <div class="write_grop">
                <span class="write_ft">제목</span>
                <input id="wt_title" type="text" name="title" />
            </div>
            <div class="write_grop">
                <span class="write_ft">내용</span>
                     <textarea style="resize: none;" class="summernote" id="wt_content"  name="content"></textarea>

            </div>
        </div>
        <div>
            <button id="write_btn" class="write_btn" type="button">등록</button>
       </div>
       <div id="footer"></div>
    </form>
            <button id="write_btn_can" class="write_btn">취소</button>
</div>

    </section>
  </div>

  <div class="control-sidebar-bg"></div>
</div>

</body>
</html>