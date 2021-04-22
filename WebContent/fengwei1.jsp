<%@page import="com.fengwei.service.Jdbc"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>风味描述词 - 水产风味数据库</title>
<link rel="stylesheet" href="//apps.bdimg.com/libs/bootstrap/3.3.4/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://cdn.staticfile.org/jquery/2.1.1/jquery.min.js"></script>
<script src="https://cdn.staticfile.org/angular.js/1.4.6/angular.min.js"></script>
<script src="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="js/controller_fengWeiMiaoShu1.js"></script>
</head>
<body ng-app="myApp" ng-controller="fengWeiMiaoShuCtrl">
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
	  <li class="active"><a href="#">风味描述词</a></li>
	  <li><a href="yuzhi.jsp">阈值</a></li>
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
		<div class="form-group">
			<label class="sr-only" for="formula">Formula (分子式)</label>
			<input type="text" class="form-control" id="formula" 
			   placeholder="Formula (分子式)" length='35%' ng-model="search.formula">
		</div>
		<div class="form-group">
			<label class="sr-only" for="category">Category (来源类别)</label>
			<input type="text" class="form-control" id="category" 
			   placeholder="Category (来源类别)" length='35%' ng-model="search.category">
		</div>
		<button type="search" class="btn btn-default" ng-click="execSearch()">搜索</button>
	</form>
</div>

<div class="container">

<div class="col-md-12" style="border:1px solid #ddd;width:100%" id="searchResult">
<br>
<div class="col-md-12">
<table id="fengweiresults" class="table table-striped table-bordered" style="width:100%; table-layout: fixed;" data-widget="datatable"
            data-searching="true" data-info="true" data-ordering="true" data-paging="true" data-scrollaxis="x">
  <thead>
    <tr>
   	  <th ng-show="admin"></th>
      <th ng-click="col='fengweiId';desc=!desc">No (序号)</th>
      <th ng-click="col='cas';desc=!desc">CAS (化合物的CAS号)</th>
      <th ng-click="col='femaNo';desc=!desc">FEMA NO (FEMA编号)</th>
      <th ng-click="col='compound';desc=!desc">Compound (化合物名称)</th>
      <th ng-click="col='synonyms';desc=!desc">Synonyms (同义词/代名词)</th>
      <th ng-click="col='formula';desc=!desc">Formula (分子式)</th>
      <th ng-click="col='rin';desc=!desc">RI-n (非极性保留指数)</th>
      <th ng-click="col='rip';desc=!desc">RI-p (极性保留指数)</th>
      <th ng-click="col='category';desc=!desc">Category (来源类别)</th>
      <th ng-click="col='origin';desc=!desc">Origin (来源-原料)</th>
      <th ng-click="col='flavorDesc';desc=!desc">Flavor description (风味描述)</th>
      <th>Ref (参考文献)</th>
    </tr>
  </thead>
  <tbody>
    <tr ng-repeat="fengWeiMiaoShu in fengWeiMiaoShuModel|orderBy:col:desc" >
      <td ng-show="admin">
        <button class="btn" ng-click="editFengWeiMiaoShu(fengWeiMiaoShu.fengweiId)" ng-show="admin">
          <span class="glyphicon glyphicon-pencil"></span>编辑
        </button>
        <button class="btn" ng-show="admin" data-toggle="modal" data-target="#deleteConfirm" ng-click="values(fengWeiMiaoShu.fengweiId)">
          <span class="	glyphicon glyphicon-remove"></span>删除
        </button>
      </td>
      <td style="overflow:hidden;text-overflow:ellipsis;nowrap=false;word-break: break-all; "><div style='height:120px; overflow-y: auto;'>{{ fengWeiMiaoShu.fengweiId }}</div></td>
      <td style="overflow:hidden;text-overflow:ellipsis;nowrap=false;word-break: break-all; "><div style='height:120px; overflow-y: auto;'>{{ fengWeiMiaoShu.cas }}</div></td>
      <td style="overflow:hidden;text-overflow:ellipsis;nowrap=false;word-break: break-all; "><div style='height:120px; overflow-y: auto;'>{{ fengWeiMiaoShu.femaNo }}</div></td>
      <td style="overflow:hidden;text-overflow:ellipsis;nowrap=false;word-break: break-all; "><div style='height:120px; overflow-y: auto;'>{{ fengWeiMiaoShu.compound }}</div></td>
      <td style="overflow:hidden;text-overflow:ellipsis;nowrap=false;word-break: break-all; "><div style='height:120px; overflow-y: auto;'>{{ fengWeiMiaoShu.synonyms }}</div></td>
      <td style="overflow:hidden;text-overflow:ellipsis;nowrap=false;word-break: break-all; "><div style='height:120px; overflow-y: auto;'>{{ fengWeiMiaoShu.formula }}</div></td>
      <td style="overflow:hidden;text-overflow:ellipsis;nowrap=false;word-break: break-all; "><div style='height:120px; overflow-y: auto;'>{{ fengWeiMiaoShu.rin }}</div></td>
      <td style="overflow:hidden;text-overflow:ellipsis;nowrap=false;word-break: break-all; "><div style='height:120px; overflow-y: auto;'>{{ fengWeiMiaoShu.rip }}</div></td>
      <td style="overflow:hidden;text-overflow:ellipsis;nowrap=false;word-break: break-all; "><div style='height:120px; overflow-y: auto;'>{{ fengWeiMiaoShu.category }}</div></td>
      <td style="overflow:hidden;text-overflow:ellipsis;nowrap=false;word-break: break-all; "><div style='height:120px; overflow-y: auto;'>{{ fengWeiMiaoShu.origin }}</div></td>
      <td style="overflow:hidden;text-overflow:ellipsis;nowrap=false;word-break: break-all; "><div style='height:120px; overflow-y: auto;'>{{ fengWeiMiaoShu.flavorDesc }}</div></td>
      <td style="overflow:hidden;text-overflow:ellipsis;nowrap=false;word-break: break-all; "><div style='height:120px; overflow-y: auto;'>{{ fengWeiMiaoShu.ref }}</div></td>
    </tr>
  </tbody>
</table>
</div>

<div ng-show="fengWeiMiaoShuModel.length>0">
	<table width="100%" >
		<tr>
			<td width="30%" align="left">{{ pageOption.currentPageStart }}-{{ pageOption.currentPageEnd }} of {{ pageOption.total }} items</td>
			<td align="center">
				<span>25</span>
				<span>|</span>
				<span>50</span>
				<span>|</span>
				<span>100</span>
			</td>
			<td width="30%" align="right">
			  <nav aria-label="Page navigation">
				<ul class="pagination">
					<li><a href="#" ng-onClick="pageOption.currentPage=1">&laquo;</a></li>
					<li ng-show="pageOption.currentPage>2"><a href="#" ng-onClick="pageOption.currentPage-=2">{{ pageOption.currentPage -2}}</a></li>
					<li ng-show="pageOption.currentPage>1"><a href="#" ng-onClick="pageOption.currentPage-=1">{{ pageOption.currentPage -1 }}</a></li>
					<li class="active"><a href="#">{{ pageOption.currentPage }}</a></li>
					<li ng-show="pageOption.currentPage+1<pageOption.total/pageOption.pageSize"><a href="#" ng-onClick="pageOption.currentPage+=1">{{ pageOption.currentPage +1 }}</a></li>
					<li ng-show="pageOption.currentPage+2<pageOption.total/pageOption.pageSize"><a href="#" ng-onClick="pageOption.currentPage+=2">{{ pageOption.currentPage +2 }}</a></li>
					<li><a href="#" ng-onClick="pageOption.currentPage=pageOption.total/pageOption.pageSize">&raquo;</a></li>
				</ul>
			  </nav>
			</td>
		</tr>
	</table>
</div>

</div>

<div id="adminForm" ng-show="admin">
<hr>
<button class="btn " ng-click="editFengWeiMiaoShu('new')" style="color: #fff;background-color: #337ab7">
<span class="glyphicon glyphicon-user"></span>创建新风味描述词
</button>
<hr>

<h3 ng-show="!edit ">创建新风味描述词:</h3>
<h3 ng-show="edit ">编辑风味描述词:</h3>

<form class="form-horizontal" >
  <div class="form-group">
    <label class="col-sm-2 control-label">No (序号):</label>
    <div class="col-sm-10">
    <input type="text" ng-model="fengweiId" ng-disabled="true" placeholder="No (序号)">
    </div>
  </div> 
  <div class="form-group">
    <label class="col-sm-2 control-label">CAS (化合物的CAS号):</label>
    <div class="col-sm-10">
    <input type="text" ng-model="cas" name="cas" placeholder="CAS (化合物的CAS号)" required>
    <span style="color:red" ng-show="$scope.cas.$dirty && $scope.cas.$invalid">
	<span ng-show="$scope.user.$error.required">CAS是必须的。</span>
	</span>
    </div>
  </div>
  <div class="form-group">
    <label class="col-sm-2 control-label">FEMA No (FEMA编号):</label>
    <div class="col-sm-10">
    <input type="text" ng-model="femaNo" ng-disabled="false" placeholder="FEMA No (FEMA编号)">
    </div>
  </div> 
  <div class="form-group">
    <label class="col-sm-2 control-label">Compound (化合物名称):</label>
    <div class="col-sm-10">
    <input type="text" ng-model="compound" ng-disabled="false" placeholder="Compound (化合物名称)">
    </div>
  </div>
  <div class="form-group">
    <label class="col-sm-2 control-label">Synonyms (同义词/代名词):</label>
    <div class="col-sm-10">
    <input type="text" ng-model="synonyms" ng-disabled="false" placeholder="Synonyms (同义词/代名词)">
    </div>
  </div> 
  <div class="form-group">
    <label class="col-sm-2 control-label">Formula (分子式):</label>
    <div class="col-sm-10">
    <input type="text" ng-model="formula" ng-disabled="false" placeholder="Formula (分子式)">
    </div>
  </div>
  <div class="form-group">
    <label class="col-sm-2 control-label">RI-n (非极性保留指数):</label>
    <div class="col-sm-10">
    <input type="text" ng-model="rin" ng-disabled="false" placeholder="RI-n (非极性保留指数)">
    </div>
  </div> 
  <div class="form-group">
    <label class="col-sm-2 control-label">RI-p (极性保留指数):</label>
    <div class="col-sm-10">
    <input type="text" ng-model="rip" ng-disabled="false" placeholder="RI-p (极性保留指数)">
    </div>
  </div>
  <div class="form-group">
    <label class="col-sm-2 control-label">Category (来源类别):</label>
    <div class="col-sm-10">
    <input type="text" ng-model="category" ng-disabled="false" placeholder="Category (来源类别)">
    </div>
  </div> 
  <div class="form-group">
    <label class="col-sm-2 control-label">Origin (来源-原料):</label>
    <div class="col-sm-10">
    <input type="text" ng-model="origin" ng-disabled="false" placeholder="Origin (来源-原料)">
    </div>
  </div>
  <div class="form-group">
    <label class="col-sm-2 control-label">Flavor description (风味描述):</label>
    <div class="col-sm-10">
    <input type="text" ng-model="flavorDesc" ng-disabled="false" placeholder="Flavor description (风味描述)">
    </div>
  </div> 
  <div class="form-group">
    <label class="col-sm-2 control-label">Ref (参考文献):</label>
    <div class="col-sm-10">
    <input type="text" ng-model="ref" ng-disabled="false" placeholder="Ref (参考文献)">
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
