
<%@page import="com.fengwei.service.Jdbc"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="//apps.bdimg.com/libs/bootstrap/3.3.4/css/bootstrap.min.css">
<script src="https://cdn.staticfile.org/angular.js/1.4.6/angular.min.js"></script> 
</head>
<body ng-app="myApp" ng-controller="userCtrl">

<div class="container">

<h3>Users</h3>

<table class="table table-striped">
  <thead>
    <tr>
      <th>编辑</th>
      <th>名</th>
      <th>姓</th>
    </tr>
  </thead>
  <tbody>
    <tr ng-repeat="user in users">
      <td>
        <button class="btn" ng-click="editUser(user.id)">
          <span class="glyphicon glyphicon-pencil"></span>编辑
        </button>
      </td>
      <td>{{ user.fName }}</td>
      <td>{{ user.lName }}</td>
    </tr>
  </tbody>
</table>

<hr>
<button class="btn btn-success" ng-click="editUser('new')">
<span class="glyphicon glyphicon-user"></span>创建新用户
</button>
<hr>

<h3 ng-show="edit">创建新用户:</h3>
<h3 ng-hide="edit">编辑用户:</h3>

<form class="form-horizontal">
  <div class="form-group">
    <label class="col-sm-2 control-label">名:</label>
    <div class="col-sm-10">
    <input type="text" ng-model="fName" ng-disabled="!edit" placeholder="名">
    </div>
  </div> 
  <div class="form-group">
    <label class="col-sm-2 control-label">姓:</label>
    <div class="col-sm-10">
    <input type="text" ng-model="lName" ng-disabled="!edit" placeholder="姓">
    </div>
  </div>
  <div class="form-group">
    <label class="col-sm-2 control-label">密码:</label>
    <div class="col-sm-10">
    <input type="password" ng-model="passw1" placeholder="密码">
    </div>
  </div>
  <div class="form-group">
    <label class="col-sm-2 control-label">重复密码:</label>
    <div class="col-sm-10">
    <input type="password" ng-model="passw2" placeholder="重复密码">
    </div>
  </div>
</form>

<hr>
<button class="btn btn-success" ng-disabled="error || incomplete">
<span class="glyphicon glyphicon-save"></span>修改
</button>

</div>

<script src="../js/myUsers.js"></script>

<!-- <script>
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.firstName= "John";
    $scope.lastName= "Doe";
});
</script> -->


    
    <div class="ibm-common-overlay ibm-overlay-alt-two"  data-widget="overlay" id="reject">
      <p>
        Are you sure the record you're looking for is not found on the list and you want to Create a new CMR?  
      </p>
      <br>
      <input type="button" id='createCMRBtn1' label="Yes, Create CMR" onClick="createRecord(false)" highlight="true" />
      <input type="button" label="No, continue searching" onClick="continueSearch('reject')" />
    </div>

    <div class="ibm-common-overlay ibm-overlay-alt-two"  data-widget="overlay" id="accept">
      <p> 
        The selected record's data will be loaded onto your current request. Proceed?
      </p>
      <br>
      <input type="button" label="Yes, import data" onClick="doSelectRecord()" highlight="true" />
      <input type="button" label="No, continue searching" onClick="continueSearch('accept')" />
    </div>

    <div class="ibm-common-overlay ibm-overlay-alt-two"  data-widget="overlay" id="noresult">
      <p>
        There were no results in the search. Do you want to Create a new CMR or continue searching?
      </p>
      <br>
      <input type="button" id='createCMRBtn2' label="Create CMR" onClick="createRecord(false)" highlight="true" />
      <input type="button" label="Continue searching" onClick="continueSearch('noresult')" />
    </div>
    
    <div class="ibm-common-overlay ibm-overlay-alt-two"  data-widget="overlay" id="cmrnotavailable">
      <p>
        This CMR is not available in this tool yet.  Please check back in a few hours. However, you can use this CMR number in orders and pricing requests.
      </p>
      <br>
      <input type="button" label="Continue searching" onClick="continueSearch('noresult')" highlight="true"/>
    </div>




    
</body>
</html>
