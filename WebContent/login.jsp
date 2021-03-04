<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="utf-8"%>
<%
request.setCharacterEncoding("UTF-8");
String username= request.getParameter("username");//获取username值
String password = request.getParameter("password");//获取password值
if("admin".equals(username)&&"admin".equals(password)){
    session.setAttribute("username", username);//在会话中保留username值供之后的页面调用
    request.getRequestDispatcher("basic.jsp").forward(request, response);//请求转发
}else{
    response.sendRedirect("search.jsp");//重定向请求
}
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>login</title>
</head>
<body>


login page
<%-- <jsp:include page="../WEB-INF/jsp/easyui/basic.jsp"/> --%>
<%-- <jsp:include page="search.jsp"/> --%>
<input type="text" ng-show=true ng-click="login">login</input>

</body>
</html>
