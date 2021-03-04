angular.module('myApp', []).controller('fengWeiMiaoShuCtrl', [
    '$scope',
    '$compile',
    '$http',
    '$timeout',
    function($scope, $compile, $http, $timeout) {
	$scope.fengweiId = '';
	$scope.cas = '';
	$scope.femaNo = '';
	$scope.compound = '';
	$scope.synonyms = '';
	$scope.formula = '';
	$scope.rin = '';
	$scope.rip = '';
	$scope.category = '';
	$scope.origin = '';
	$scope.flavorDesc = '';
	$scope.ref = '';
	$scope.admin = false;
	$scope.fengWeiMiaoShuModel = [

	];
	$scope.desc = 0;
	$scope.edit = false;
	$scope.error = true;
	$scope.incomplete = false; 
	$scope.editFengWeiMiaoShu = function(id) {
  		if (id == 'new') {
    		$scope.edit = false;
    		$scope.incomplete = true;
    		$scope.fengweiId = '';
			$scope.cas = '';
			$scope.femaNo = '';
			$scope.compound = '';
			$scope.synonyms = '';
			$scope.formula = '';
			$scope.rin = '';
			$scope.rip = '';
			$scope.category = '';
			$scope.origin = '';
			$scope.flavorDesc = '';
			$scope.ref = '';
    	} else {
    		$scope.edit = true;
			console.log($scope);
    		$scope.fengweiId = $scope.fengWeiMiaoShuModel[id-1].fengweiId;
			$scope.cas = $scope.fengWeiMiaoShuModel[id-1].cas;
			$scope.femaNo = $scope.fengWeiMiaoShuModel[id-1].femaNo;
			$scope.compound = $scope.fengWeiMiaoShuModel[id-1].compound;
			$scope.synonyms = $scope.fengWeiMiaoShuModel[id-1].synonyms;
			$scope.formula = $scope.fengWeiMiaoShuModel[id-1].formula;
			$scope.rin = $scope.fengWeiMiaoShuModel[id-1].rin;
			$scope.rip = $scope.fengWeiMiaoShuModel[id-1].rip;
			$scope.category = $scope.fengWeiMiaoShuModel[id-1].category;
			$scope.origin = $scope.fengWeiMiaoShuModel[id-1].origin;
			$scope.flavorDesc = $scope.fengWeiMiaoShuModel[id-1].flavorDesc;
			$scope.ref = $scope.fengWeiMiaoShuModel[id-1].ref;
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
		params.entityType = 'fengWeiMiaoShu';
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
                  $scope.fengWeiMiaoShuModel = results;
			}
        }, function(response) {
          console.log('search - error');
          console.log(response);
		  alert("搜索失败，请过后再试或联系管理员");
		  return;
        });
      };

	$scope.preExecCreateUpdate = function() {
		var ok = $scope.validate();
		if (ok) {
			$scope.execCreateUpdate();
		} else {
			alert("请检查输入");
		}
	}

	$scope.execCreateUpdate = function() {
		console.log("execCreateUpdate...");
        var params = {};
		params.FENGWEI_ID = $scope.fengweiId;
        params.CAS = $scope.cas;
        params.FEMA_NO = $scope.femaNo;
        params.COMPOUND = $scope.compound;
        params.SYNONYMS = $scope.synonyms;
        params.FORMULA = $scope.formula;
        params.RI_N = $scope.rin;
        params.RI_P = $scope.rip;
        params.CATEGORY = $scope.category;
        params.ORIGIN = $scope.origin;
        params.FLAVOR_DESC = $scope.flavorDesc;
        params.REF = $scope.ref;
		if ($scope.fengweiId && $scope.fengweiId != '') {
			params.process = 'UPDATE';
		} else {
			params.process = 'INSERT';
		}
		params.entityType = 'fengWeiMiaoShu';
		console.log(params);
        $http({
          url : 'process',
          method : 'POST',
          params : params
        }).then(function(response) {
          console.log('search - success');
			if (response.data.success) {
                  alert("操作成功");
			} else {
				var msg = response.data.msg;
				alert(msg);
				return;
			}
        }, function(response) {
          console.log('search - error');
		  alert("操作失败，请过后再试或联系管理员");
		  return;
        });
      };

	$scope.validate = function() {
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
		$scope.fengweiIdBackup = $scope.fengweiId;
		$scope.fengweiId = id;
		var ok = $scope.validateOnDelete();
		if (ok) {
			$scope.execDelete();
		} else {
			alert("请再检查一遍");
		}
	}

	$scope.execDelete = function() {
		console.log("execDelete...");
        var params = {};
		params.FENGWEI_ID = $scope.fengweiId;
		params.process = 'DELETE';
		params.entityType = 'fengWeiMiaoShu';
		console.log(params);
        $http({
          url : 'process',
          method : 'POST',
          params : params
        }).then(function(response) {
          	console.log('search - success');
			$scope.fengweiId = $scope.fengweiIdBackup;
			if (response.data.success) {
                  alert("操作成功");
			} else {
				var msg = response.data.msg;
				alert(msg);
				return;
			}
        }, function(response) {
          console.log('search - error');
		  $scope.fengweiId = $scope.fengweiIdBackup;
		  alert("操作失败，请过后再试或联系管理员");
		  return;
        });
      };

	  $scope.validateOnDelete = function() {
		if ($scope.fengweiId == null || $scope.fengweiId == '') {
			alert('没有选中要删除的项目');
			return false;
		}
		return true;
	  }
	
	} ])


