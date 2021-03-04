angular.module('myApp', []).controller('yuZhiCtrl', [
    '$scope',
    '$compile',
    '$http',
    '$timeout',
    function($scope, $compile, $http, $timeout) {
	$scope.yuzhiId = '';
	$scope.cas = '';
	$scope.compound = '';
	$scope.thredW = '';
	$scope.definition1 = '';
	$scope.ref1 = '';
	$scope.thredA = '';
	$scope.definition2 = '';
	$scope.ref2 = '';
	$scope.thredO = '';
	$scope.definition3 = '';
	$scope.ref3 = '';
	$scope.admin = false;
	$scope.yuZhiModel = [
	];
	$scope.desc = 0;
	$scope.edit = false;
	$scope.error = true;
	$scope.incomplete = false; 
	$scope.editYuZhi = function(id) {
  		if (id == 'new') {
    		$scope.edit = false;
    		$scope.incomplete = true;
    		$scope.yuzhiId = '';
			$scope.cas = '';
			$scope.compound = '';
			$scope.thredW = '';
			$scope.definition1 = '';
			$scope.ref1 = '';
			$scope.thredA = '';
			$scope.definition2 = '';
			$scope.ref2 = '';
			$scope.thredO = '';
			$scope.definition3 = '';
			$scope.ref3 = '';
    	} else {
    		$scope.edit = true;
			console.log($scope);
    		$scope.yuzhiId = $scope.yuZhiModel[id-1].yuzhiId;
			$scope.cas = $scope.yuZhiModel[id-1].cas;
			$scope.compound = $scope.yuZhiModel[id-1].compound;
			$scope.thredW = $scope.yuZhiModel[id-1].thredW;
			$scope.definition1 = $scope.yuZhiModel[id-1].definition1;
			$scope.ref1 = $scope.yuZhiModel[id-1].ref1;
			$scope.thredA = $scope.yuZhiModel[id-1].thredA;
			$scope.definition2 = $scope.yuZhiModel[id-1].definition2;
			$scope.ref2 = $scope.yuZhiModel[id-1].ref2;
			$scope.thredO = $scope.yuZhiModel[id-1].thredO;
			$scope.definition3 = $scope.yuZhiModel[id-1].definition3;
			$scope.ref3 = $scope.yuZhiModel[id-1].ref3;
  		}
	};

	$scope.$watch('passw1',function() {$scope.test();});
	$scope.$watch('passw2',function() {$scope.test();});
	$scope.$watch('fName',function() {$scope.test();});
	$scope.$watch('lName',function() {$scope.test();});

	$scope.test = function() {
		if ('1'=='0') {
			$scope.error = true;
			alert("CAS已存在");
		}
	};

	$scope.execSearch = function() {
		console.log("execSearch...");
        var params = {};
        for ( var prop in $scope.search) {
          if ($scope.search.hasOwnProperty(prop)) {
            console.log(' - ' + prop + ' =' + $scope.search[prop]);
            if ($scope.search[prop]) {
              params[prop] = $scope.search[prop];
            }
          }
        }
		params.process = 'SEARCH';
		params.entityType = 'yuZhi';
		console.log(params);
        $http({
          url : 'process',
          method : 'POST',
          params : params
        }).then(function(response) {
          console.log('search - success');
			if (response.data.success) {
                  var results = response.data.data;
				  console.log(results);
                  $scope.yuZhiModel = results;
				  if (results && results.length == 0) {
					$('#msg').html("返回0条结果");
				  } else {
					$('#msg').html("");
				  }
			} else {
				$('#msg').html("搜索失败，请过后再试或联系管理员");
			}
        }, function(response) {
          console.log('search - error');
          console.log(response);
		  $('#msg').html("搜索失败，请过后再试或联系管理员");
		  return;
        });
      };

	$scope.preExecCreateUpdate = function() {
		var ok = $scope.validateOnCreUpd();
		if (ok) {
			$scope.execCreateUpdate();
		} else {
			alert("请检查输入");
		}
	}

	$scope.execCreateUpdate = function() {
		console.log("execCreateUpdate...");
        var params = {};
		params.YUZHI_ID = $scope.yuzhiId;
        params.CAS = $scope.cas;
        params.COMPOUND = $scope.compound;
        params.THRED_W = $scope.thredW;
        params.DEFINITION1 = $scope.definition1;
        params.REF1 = $scope.ref1;
        params.THRED_A = $scope.thredA;
        params.DEFINITION2 = $scope.definition2;
        params.REF2 = $scope.ref2;
        params.THRED_OTHER = $scope.thredO;
        params.DEFINITION3 = $scope.definition3;
        params.REF3 = $scope.ref3;
		if ($scope.yuzhiId && $scope.yuzhiId != '') {
			params.process = 'UPDATE';
		} else {
			params.process = 'INSERT';
		}
		params.entityType = 'yuZhi';
		console.log(params);
        $http({
          url : 'process',
          method : 'POST',
          params : params
        }).then(function(response) {
          console.log('search - success');
			if (response.data.success) {
				$('#msg').html("操作成功");
                alert("操作成功");
			} else {
				var msg = response.data.msg;
				$('#msg').html(msg);
				alert(msg);
				return;
			}
        }, function(response) {
          console.log('search - error');
		  $('#msg').html("操作失败，请过后再试或联系管理员");
		  alert("操作失败，请过后再试或联系管理员");
		  return;
        });
      };

	$scope.validateOnCreUpd = function() {
		if ($scope.cas == null || $scope.cas == '') {
			alert('CAS不能为空');
			return false;
		}
		if ($scope.compound == null || $scope.compound == '') {
			alert('Compound不能为空');
			return false;
		}
		return true;
	}
 
	$scope.preExecDelete = function(id) {
		$scope.yuzhiIdBackup = $scope.yuzhiId;
		$scope.yuzhiId = id;
		var ok = $scope.validateOnDelete();
		if (ok) {
			$scope.execDelete();
		} else {
			alert("请检查输入");
		}
	}

	$scope.execDelete = function() {
		console.log("execDelete...");
        var params = {};
		params.YUZHI_ID = $scope.yuzhiId;
		params.process = 'DELETE';
		params.entityType = 'yuZhi';
		console.log(params);
        $http({
          url : 'process',
          method : 'POST',
          params : params
        }).then(function(response) {
          	console.log('search - success');
			$scope.yuzhiId = $scope.yuzhiIdBackup;
			if (response.data.success) {
				$('#msg').html("操作成功");
                alert("操作成功");
			} else {
				var msg = response.data.msg;
				$('#msg').html(msg);
				alert(msg);
				return;
			}
        }, function(response) {
          console.log('search - error');
		  $scope.yuzhiId = $scope.yuzhiIdBackup;
		  $('#msg').html("操作失败，请过后再试或联系管理员");
		  alert("操作失败，请过后再试或联系管理员");
		  return;
        });
      };

	$scope.validateOnDelete = function() {
		if ($scope.yuzhiId == null || $scope.yuzhiId == '') {
			alert('没有选中要删除的项目');
			return false;
		}
		return true;
	}
	
	$scope.login = function(user, password) {
		console.log($scope);
		if ($scope.user == null || $scope.user == '') {
			$scope.admin = false;
			alert('user不能为空');
			return;
		}
		if ($scope.password == null || $scope.password == '') {
			$scope.admin = false;
			alert('password不能为空');
			return;
		}
		if ($scope.user == 'admin' && $scope.password == ' ') {
			$scope.admin = true;
			$('#adminLogin').modal('hide');
			console.log($scope.admin);
		} else {
			$scope.admin = false;
			$scope.user = '';
			$scope.password = '';
			alert('用户名密码错误');
			return;
		}
	};
	
	} ])


