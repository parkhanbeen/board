<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<!DOCTYPE html>

<html>
<head>
	<tiles:insertAttribute name="head"/>
</head>
<body class="hold-transition sidebar-mini">
    <tiles:insertAttribute name="main_header"/>
	<tiles:insertAttribute name="left_column"/>
	<tiles:insertAttribute name="content"/>
	<tiles:insertAttribute name="main_footer"/>
	<tiles:insertAttribute name="plugin_js"/>
</body>
</html>