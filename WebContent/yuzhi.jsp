<%@page import="com.fengwei.service.Jdbc"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>阈值 - 水产风味数据库</title>
<link rel="stylesheet" href="//apps.bdimg.com/libs/bootstrap/3.3.4/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://cdn.staticfile.org/jquery/2.1.1/jquery.min.js"></script>
<script src="https://cdn.staticfile.org/angular.js/1.4.6/angular.min.js"></script>
<script src="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="js/controller_yuZhi.js"></script>
</head>
<body ng-app="myApp" ng-controller="yuZhiCtrl">
<div class="container" style="height: 140px;background-color: rgb(224, 236, 255)">
	 <div class="row">
	 	<div class="col-md-2" style="width:155px; height:135px;">
	 		<img src="image/logo.jpg" class="img-circle"  width="100%" height="100%">
	 	</div>
	 	<div class="col-md-9">
	 		<div style="float: center;margin-top: 3%;">
            	<h1 class="text-center">水产风味数据库</h1>
            	<h3 class="text-center">Aquaculture Flavor database</h3></strong>
            </div>
	 	</div>
	 	<div class="col-md-1">
	 		<div id="login" style="float: center;padding-bottom: 16%;margin-top: 75%;">
                <button type="button" id="login"  data-toggle="modal" data-target="#adminLogin" ng-show = "!admin" >管理员登录</button>
                <button type="button" id="logout" ng-click="admin = false" ng-show = "admin">退出管理界面</button>
            </div>
	 	</div>
	 </div>
</div>
<br>

<div class="container">
	<ul class="nav nav-pills">
	  <li ><a href="fengwei.jsp">风味描述词</a></li>
	  <li class="active"><a href="#">阈值</a></li>
	</ul>
</div>
<br>

<div class="container">
<label id="msg" style="color: red;"></label>
</div>

<div class="container" style="height: 80px;background-color: rgb(224, 236, 255)">
	<form class="form-inline" role="form" style="float: center;margin-top: 2%;">
		<div class="form-group">
			<label class="sr-only" for="cas">CAS (化合物的CAS号)</label>
			<input type="text" class="form-control" id="cas" 
			   placeholder="CAS (化合物的CAS号)" length='35%' ng-model="search.cas">
		</div>
		<div class="form-group">
			<label class="sr-only" for="compound">Compound (化合物名称及同义词)</label>
			<input type="text" class="form-control" id="compound" 
			   placeholder="Compound (化合物及同义词)" length='35%' ng-model="search.compound">
		</div>
		<button type="search" class="btn btn-default" ng-click="execSearch()">搜索</button>
	</form>
</div>

<div class="container">

<div id="searchResult">

<table class="table table-striped table-bordered" class="table table-striped table-bordered" style="width:100%" data-widget="datatable"
            data-searching="true" data-info="true" data-ordering="true" data-paging="true" data-scrollaxis="x">
  <thead>
    <tr>
   	  <th ng-show="admin"></th>
      <th ng-click="col='yuzhiId';desc=!desc">No (序号)</th>
      <th ng-click="col='cas';desc=!desc">CAS (化合物的CAS号)</th>
      <th ng-click="col='compound';desc=!desc">Compound (化合物名称)</th>
      <th ng-click="col='thredW';desc=!desc">Thred-w(mg/kg) (化合物在水里的阈值)</th>
      <th ng-click="col='definition1';desc=!desc">Definition(d/r) (检测/识别)</th>
      <th ng-click="col='ref1';desc=!desc">Ref (参考文献)</th>
      <th ng-click="col='thredA';desc=!desc">Thred-a(mg/m3) (化合物在空气里的阈值)</th>
      <th ng-click="col='definition2';desc=!desc">Definition(d/r) (检测/识别)</th>
      <th ng-click="col='ref2';desc=!desc">Ref (参考文献)</th>
      <th ng-click="col='thredO';desc=!desc">Thred-other(mg/kg) (化合物在其他介质里的阈值)</th>
      <th ng-click="col='definition3';desc=!desc">Definition(d/r) (检测/识别)</th>
      <th ng-click="col='ref3';desc=!desc">Ref (参考文献)</th>
    </tr>
  </thead>
  <tbody>
    <tr ng-repeat="yuZhi in yuZhiModel">
      <td>
        <button class="btn" ng-click="editYuZhi(yuZhi.yuzhiId)" ng-show="admin">
          <span class="glyphicon glyphicon-pencil"></span>编辑
        </button>
        <button class="btn" ng-show="admin" data-toggle="modal" data-target="#deleteConfirm" ng-click="values(yuZhi.yuzhiId)">
          <span class="	glyphicon glyphicon-remove"></span>删除
        </button>
      </td ng-show="admin">
      <td>{{ yuZhi.yuzhiId }}</td>
      <td>{{ yuZhi.cas }}</td>
      <td>{{ yuZhi.compound }}</td>
      <td>{{ yuZhi.thredW }}</td>
      <td>{{ yuZhi.definition1 }}</td>
      <td>{{ yuZhi.ref1 }}</td>
      <td>{{ yuZhi.thredA }}</td>
      <td>{{ yuZhi.definition2 }}</td>
      <td>{{ yuZhi.ref2 }}</td>
      <td>{{ yuZhi.thredO }}</td>
      <td>{{ yuZhi.definition3 }}</td>
      <td>{{ yuZhi.ref3 }}</td>
    </tr>
  </tbody>
</table>
</div>

<div id="adminForm" ng-show="admin">
<hr>
<button class="btn " ng-click="editYuZhi('new')" style="color: #fff;background-color: #337ab7">
<span class="glyphicon glyphicon-user"></span>创建阈值
</button>
<hr>

<h3 ng-show="!edit ">创建阈值:</h3>
<h3 ng-show="edit ">编辑阈值:</h3>

<form class="form-horizontal">
  <div class="form-group">
    <label class="col-sm-2 control-label">No (序号):</label>
    <div class="col-sm-10">
    <input type="text" ng-model="yuzhiId" ng-disabled="true" placeholder="No (序号)">
    </div>
  </div> 
  <div class="form-group">
    <label class="col-sm-2 control-label">CAS (化合物的CAS号):</label>
    <div class="col-sm-10">
    <input type="text" ng-model="cas" ng-disabled="false" placeholder="CAS (化合物的CAS号)">
    </div>
  </div>
  <div class="form-group">
    <label class="col-sm-2 control-label">Compound (化合物名称):</label>
    <div class="col-sm-10">
    <input type="text" ng-model="compound" ng-disabled="false" placeholder="Compound (化合物名称)">
    </div>
  </div> 
  <div class="form-group">
    <label class="col-sm-2 control-label">Thred-w(mg/kg) (化合物在水里的阈值):</label>
    <div class="col-sm-10">
    <input type="text" ng-model="thredW" ng-disabled="false" placeholder="Thred-w(mg/kg) (化合物在水里的阈值)">
    </div>
  </div>
  <div class="form-group">
    <label class="col-sm-2 control-label">Definition(d/r) (检测/识别):</label>
    <div class="col-sm-10">
    <input type="text" ng-model="definition1" ng-disabled="false" placeholder="Definition(d/r) (检测/识别)">
    </div>
  </div> 
  <div class="form-group">
    <label class="col-sm-2 control-label">Ref (参考文献):</label>
    <div class="col-sm-10">
    <input type="text" ng-model="ref1" ng-disabled="false" placeholder="Ref (参考文献)">
    </div>
  </div>
  <div class="form-group">
    <label class="col-sm-2 control-label">Thred-a(mg/m3) (化合物在空气里的阈值):</label>
    <div class="col-sm-10">
    <input type="text" ng-model="thredA" ng-disabled="false" placeholder="Thred-a(mg/m3) (化合物在空气里的阈值)">
    </div>
  </div> 
  <div class="form-group">
    <label class="col-sm-2 control-label">Definition(d/r) (检测/识别):</label>
    <div class="col-sm-10">
    <input type="text" ng-model="definition2" ng-disabled="false" placeholder="Definition(d/r) (检测/识别)">
    </div>
  </div>
  <div class="form-group">
    <label class="col-sm-2 control-label">Ref (参考文献):</label>
    <div class="col-sm-10">
    <input type="text" ng-model="ref2" ng-disabled="false" placeholder="Ref (参考文献)">
    </div>
  </div> 
  <div class="form-group">
    <label class="col-sm-2 control-label">Thred-other(mg/kg) (化合物在其他介质里的阈值):</label>
    <div class="col-sm-10">
    <input type="text" ng-model="thredO" ng-disabled="false" placeholder="Thred-other(mg/kg) (化合物在其他介质里的阈值)">
    </div>
  </div>
  <div class="form-group">
    <label class="col-sm-2 control-label">Definition(d/r) (检测/识别):</label>
    <div class="col-sm-10">
    <input type="text" ng-model="definition3" ng-disabled="false" placeholder="Definition(d/r) (检测/识别)">
    </div>
  </div> 
  <div class="form-group">
    <label class="col-sm-2 control-label">Ref (参考文献):</label>
    <div class="col-sm-10">
    <input type="text" ng-model="ref3" ng-disabled="false" placeholder="Ref (参考文献)">
    </div>
  </div>
</form>

<hr >
<button class="btn " style="color: #fff;background-color: #337ab7" ng-click="preExecCreateUpdate()">
<span class="glyphicon glyphicon-save"></span>提交
</button>
<br><br>

</div>
</div>

<div class="modal fade" id="adminLogin" tabindex="-1" role="dialog" aria-labelledby="adminLoginLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="adminLoginLabel">
					登录
				</h4>
			</div>
			<div class="modal-body">
			    <form id="login">
				<input type="text" ng-model="user" >用户名
				<input type="password" ng-model="password" autocomplete="off">密码
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-primary" ng-click="login(username, password)">
					登录
				</button>
				<button type="button" class="btn btn-default" data-dismiss="modal">取消
				</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>

<div class="modal fade" id="deleteConfirm" tabindex="-1" role="dialog" aria-labelledby="deleteConfirmLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="deleteConfirmLabel">
					注意
				</h4>
			</div>
			<div class="modal-body">
				确定要删除这条记录？
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">取消
				</button>
				<button type="button" class="btn btn-primary" ng-click="preExecDelete()">
					确认
				</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>

<div class="container text-center" style="margin-bottom:0;height: 70px;background-color: rgb(224, 236, 255)">
<br><span >Copyright © 2021-20030 大连工业大学 版权所有</span></div>

</body>
</html>
