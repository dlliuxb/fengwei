<%@page import="com.fengwei.service.Jdbc"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="//apps.bdimg.com/libs/bootstrap/3.3.4/css/bootstrap.min.css">
<script src="https://cdn.staticfile.org/angular.js/1.4.6/angular.min.js"></script> 
<script src="js/controller_fengWeiMiaoShu.js"></script>
</head>
<body ng-app="myApp" ng-controller="fengWeiMiaoShuCtrl">
<div class="container" style="height: 140px;background-color: #5cb85c">
	 <div class="row">
	 	<div class="col-md-2" style="width:140px; height:135px;">
	 		<img src="image/logo.jpg" class="img-circle"  width="100%" height="100%">
	 	</div>
	 	<div class="col-md-9">
	 		<div style="float: center;margin-top: 3%;">
            	<h1 class="text-center">水产风味数据库</h1>
            	<h3 class="text-center">Aquaculture Flavor database</h3></strong>
            </div>
	 	</div>
	 	<div class="col-md-1">
	 		<div id="login" style="padding-bottom: 16%;">
                <button type="button" ng-click="!$scope.aadmin" ng-show = "!$scope.aadmin" >管理员登录</button>
                <button type="button" ng-click="!$scope.aadmin" ng-show = "$scope.aadmin">退出管理界面
            </div>
	 	</div>
	 </div>
</div>

<div class="container">
	<ul class="nav nav-pills">
	  <li class="active"><a href="#">风味描述词</a></li>
	  <li><a href="#">阈值</a></li>
	</ul>
</div>

<div class="container">
</div>

<div class="container">
<h3>风味描述词</h3>
<table class="table table-striped">
  <thead>
    <tr>
      <th>No (序号)</th>
      <th>CAS (化合物的CAS号)</th>
      <th>FEMA NO (FEMA编号)</th>
      <th>Compound (化合物名称)</th>
      <th>Synonyms (同义词/代名词)</th>
      <th>Formula (分子式)</th>
      <th>RI-n (非极性保留指数)</th>
      <th>RI-p (极性保留指数)</th>
      <th>Category (来源类别)</th>
      <th>Origin (来源-原料)</th>
      <th>Flavor description (风味描述)</th>
      <th>Ref (参考文献)</th>
    </tr>
  </thead>
  <tbody>
    <tr ng-repeat="fengWeiMiaoShu in fengWeiMiaoShuModel">
      <td>
        <button class="btn" ng-click="editFengWeiMiaoShu(fengWeiMiaoShu.id)">
          <span class="glyphicon glyphicon-pencil"></span>编辑
        </button>
      </td>
      <td>{{ fengWeiMiaoShu.no }}</td>
      <td>{{ fengWeiMiaoShu.cas }}</td>
      <td>{{ fengWeiMiaoShu.femaNo }}</td>
      <td>{{ fengWeiMiaoShu.compound }}</td>
      <td>{{ fengWeiMiaoShu.synonyms }}</td>
      <td>{{ fengWeiMiaoShu.formula }}</td>
      <td>{{ fengWeiMiaoShu.riN }}</td>
      <td>{{ fengWeiMiaoShu.riP }}</td>
      <td>{{ fengWeiMiaoShu.category }}</td>
      <td>{{ fengWeiMiaoShu.origin }}</td>
      <td>{{ fengWeiMiaoShu.flavorDesc }}</td>
      <td>{{ fengWeiMiaoShu.ref }}</td>
    </tr>
  </tbody>
</table>

<hr>
<button class="btn btn-success" ng-click="editFengWeiMiaoShu('new')">
<span class="glyphicon glyphicon-user"></span>创建新风味描述词
</button>
<hr>

<h3 ng-show="edit">创建新风味描述词:</h3>
<h3 ng-hide="edit">编辑风味描述词:</h3>

<form class="form-horizontal">
  <div class="form-group">
    <label class="col-sm-2 control-label">No (序号):</label>
    <div class="col-sm-10">
    <input type="text" ng-model="no" ng-disabled="!edit" placeholder="No (序号)">
    </div>
  </div> 
  <div class="form-group">
    <label class="col-sm-2 control-label">CAS (化合物的CAS号):</label>
    <div class="col-sm-10">
    <input type="text" ng-model="cas" ng-disabled="!edit" placeholder="CAS (化合物的CAS号)">
    </div>
  </div>
  <div class="form-group">
    <label class="col-sm-2 control-label">FEMA No (FEMA编号):</label>
    <div class="col-sm-10">
    <input type="text" ng-model="femaNo" ng-disabled="!edit" placeholder="FEMA No (FEMA编号)">
    </div>
  </div> 
  <div class="form-group">
    <label class="col-sm-2 control-label">Compound (化合物名称):</label>
    <div class="col-sm-10">
    <input type="text" ng-model="compound" ng-disabled="!edit" placeholder="Compound (化合物名称)">
    </div>
  </div>
  <div class="form-group">
    <label class="col-sm-2 control-label">Synonyms (同义词/代名词):</label>
    <div class="col-sm-10">
    <input type="text" ng-model="synonyms" ng-disabled="!edit" placeholder="Synonyms (同义词/代名词)">
    </div>
  </div> 
  <div class="form-group">
    <label class="col-sm-2 control-label">Formula (分子式):</label>
    <div class="col-sm-10">
    <input type="text" ng-model="formula" ng-disabled="!edit" placeholder="Formula (分子式)">
    </div>
  </div>
  <div class="form-group">
    <label class="col-sm-2 control-label">RI-n (非极性保留指数):</label>
    <div class="col-sm-10">
    <input type="text" ng-model="riN" ng-disabled="!edit" placeholder="RI-n (非极性保留指数)">
    </div>
  </div> 
  <div class="form-group">
    <label class="col-sm-2 control-label">RI-p (极性保留指数):</label>
    <div class="col-sm-10">
    <input type="text" ng-model="riP" ng-disabled="!edit" placeholder="RI-p (极性保留指数)">
    </div>
  </div>
  <div class="form-group">
    <label class="col-sm-2 control-label">Category (来源类别):</label>
    <div class="col-sm-10">
    <input type="text" ng-model="category" ng-disabled="!edit" placeholder="Category (来源类别)">
    </div>
  </div> 
  <div class="form-group">
    <label class="col-sm-2 control-label">Origin (来源-原料):</label>
    <div class="col-sm-10">
    <input type="text" ng-model="origin" ng-disabled="!edit" placeholder="Origin (来源-原料)">
    </div>
  </div>
  <div class="form-group">
    <label class="col-sm-2 control-label">Flavor description (风味描述):</label>
    <div class="col-sm-10">
    <input type="text" ng-model="flavorDesc" ng-disabled="!edit" placeholder="Flavor description (风味描述)">
    </div>
  </div> 
  <div class="form-group">
    <label class="col-sm-2 control-label">Ref (参考文献):</label>
    <div class="col-sm-10">
    <input type="text" ng-model="ref" ng-disabled="!edit" placeholder="Ref (参考文献)">
    </div>
  </div>
</form>

<hr>
<button class="btn btn-success" ng-disabled="error || incomplete">
<span class="glyphicon glyphicon-save"></span>修改
</button>

</div>

<div class="container" style="height: 20px;background-color: #5cb85c">
<span >Copyright © 2021-20030 大连工业大学 版权所有</span></div>
 
    <div class="ibm-common-overlay ibm-overlay-alt-two"  data-widget="overlay" id="reject">
      <p>
        Are you sure the record you're looking for is not found on the list and you want to Create a new CMR?  
      </p>
      <br>
      <input type="button" id='createCMRBtn1' label="Yes, Create CMR" onClick="createRecord(false)" highlight="true" />
      <input type="button" label="No, continue searching" onClick="continueSearch('reject')" />
    </div>

</body>
</html>
