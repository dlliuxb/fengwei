angular.module('myApp', []).controller('fengWeiMiaoShuCtrl', [
    '$scope',
    '$compile',
	'$document',
    '$http',
    '$timeout',
    function($scope, $compile, $document, $http, $timeout) {
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
	$scope.user='';
	$scope.password='';
	$scope.admin = false;
	
	$scope.fengWeiMiaoShuModel = [

	];
	$scope.pageOption = {
		'allData' : '',
		'totalCount' : '',
		'currentData' : '',
		'pageSize' : '',
		'currentPage' : '',
		'currentPageStart' : '',
		'currentPageEnd' : '',
		'lastPage' : ''
	};
	$scope.desc = 0;
	$scope.edit = false;
	$scope.error = true;
	$scope.editFengWeiMiaoShu = function(id) {
  		if (id == 'new') {
    		$scope.edit = false;
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
				for (var i=0; i<results.length; i++) {
					if (results[i].femaNo == 0) {
						results[i].femaNo = '';
					}
				}
			  $scope.pageOption.totalCount = results.length;
			  $scope.pageOption.allData = results;
			  $scope.pageOption.currentPage = 1;
			  if ($scope.pageOption.pageSize == '') {
				  $scope.pageOption.pageSize = 25;
				  var pageSize25 = document.getElementById('pageSize25');
				  pageSize25.style.color='#333';
				  var pageSize50 = document.getElementById('pageSize50');
				  pageSize50.style.color='#337ab7';
				  var pageSize100 = document.getElementById('pageSize100');
				  pageSize100.style.color='#337ab7';
			  }
			  var lastPage = parseInt($scope.pageOption.totalCount/$scope.pageOption.pageSize)+1;
			  $scope.pageOption.lastPage = lastPage;
			  $scope.pageOption.currentPageStart = $scope.pageOption.pageSize * ($scope.pageOption.currentPage - 1) + 1;
			  if ($scope.pageOption.pageSize * $scope.pageOption.currentPage < $scope.pageOption.totalCount) {
				$scope.pageOption.currentPageEnd = $scope.pageOption.pageSize * $scope.pageOption.currentPage;
			  } else {
				  $scope.pageOption.currentPageEnd = $scope.pageOption.totalCount;
			  }
			  $scope.pageOption.currentData = {};
			  var tempArray = [];
			  for (var j = $scope.pageOption.currentPageStart-1; j<$scope.pageOption.currentPageEnd; j++) {
				tempArray.push($scope.pageOption.allData[j]);
			  }
			  $scope.pageOption.currentData = tempArray;
			  $scope.fengWeiMiaoShuModel = $scope.pageOption.currentData;
			  
			  if (results && results.length == 0) {
				$('#msg').html("返回0条结果");
			  } else {
				$('#msg').html("");
			  }
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
			$('#msg').html("");
			$scope.execCreateUpdate();
		} else {
			$('#msg').html("请检查输入");
		}
	};

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
				  $('#msg').html("操作成功");
			} else {
				$('#msg').html(response.data.msg);
			}
        }, function(response) {
          console.log('search - error');
		  $('#msg').html("操作失败，请过后再试或联系管理员");
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
		if ($scope.femaNo != '' && !isNum($scope.femaNo) ) {
			alert('FEMA No应该是数字');
			return false;
		}
		return true;
	};
 
	$scope.preExecDelete = function() {
		var ok = $scope.validateOnDelete();
		if (ok) {
			$scope.execDelete();
		} else {
			alert("请再检查一遍");
		}
	};

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
          	console.log('delete - success');
			$scope.fengweiId = $scope.fengweiIdBackup;
			if (response.data.success) {
				$('#msg').html("操作成功");
				alert("操作成功");
				$('#deleteConfirm').modal('hide');
				return;
			} else {
				var msg = response.data.msg;
				$('#msg').html(msg);
				alert(msg);
				$('#deleteConfirm').modal('hide');
				return;
			}
        }, function(response) {
          console.log('search - error');
		  $scope.fengweiId = $scope.fengweiIdBackup;
		  $('#msg').html("操作失败，请过后再试或联系管理员");
		  alert(msg);
		  $('#deleteConfirm').modal('hide');
		  return;
        });
      };

	  $scope.validateOnDelete = function() {
		if ($scope.fengweiId == null || $scope.fengweiId == '') {
			alert('没有选中要删除的项目');
			return false;
		}
		return true;
	  };

	  $scope.login = function(user, password) {
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
		} else {
			$scope.admin = false;
			$scope.user = '';
			$scope.password = '';
			alert('用户名密码错误');
			return;
		}
	};
	
	
	$scope.values = function(id) {
		$scope.fengweiIdBackup = $scope.fengweiId;
		$scope.fengweiId = id;
		console.log($scope.fengweiId);
	};
	
	$scope.setPageSize = function(value) {
		$scope.pageOption.pageSize = value;
		$scope.refreshPage($scope.pageOption.pageSize,$scope.pageOption.currentPage);
	};
	
	$scope.refreshPage = function(input1, input2) {
		$scope.pageOption.pageSize = input1;
		input2 = 1;
		$scope.pageOption.currentPage = input2;
		var pageSize = $scope.pageOption.pageSize;
		var currentPage = $scope.pageOption.currentPage;
		var allData = $scope.pageOption.allData;
		var currentPageStart = pageSize * (currentPage - 1) + 1;
		var currentPageEnd = 1;
	    $scope.pageOption.currentPageStart = currentPageStart;
	  	if (pageSize * currentPage < $scope.pageOption.totalCount) {
			currentPageEnd = pageSize * currentPage;
	  	} else {
		  	currentPageEnd = $scope.pageOption.totalCount;
	  	}
		$scope.pageOption.currentPageEnd = currentPageEnd;
		
	  	$scope.pageOption.currentData = {};
	  	var tempArray = [];
		if (allData.length > 0) {
			for (var i = currentPageStart-1; i<currentPageEnd; i++) {
				tempArray.push(allData[i]);
	  		}
	  		$scope.pageOption.currentData = tempArray;
	  		$scope.fengWeiMiaoShuModel = $scope.pageOption.currentData;
		}
		
		if ($scope.pageOption.pageSize == 25) {
			var pageSize25 = document.getElementById('pageSize25');
			pageSize25.style.color='#333';
			var pageSize50 = document.getElementById('pageSize50');
			pageSize50.style.color='#337ab7';
			var pageSize100 = document.getElementById('pageSize100');
			pageSize100.style.color='#337ab7';
		} else if ($scope.pageOption.pageSize == 50) {
			var pageSize25 = document.getElementById('pageSize25');
			pageSize25.style.color='#337ab7';
			var pageSize50 = document.getElementById('pageSize50');
			pageSize50.style.color='#333';
			var pageSize100 = document.getElementById('pageSize100');
			pageSize100.style.color='#337ab7';
		} else if ($scope.pageOption.pageSize == 100) {
			var pageSize25 = document.getElementById('pageSize25');
			pageSize25.style.color='#337ab7';
			var pageSize50 = document.getElementById('pageSize50');
			pageSize50.style.color='#337ab7';
			var pageSize100 = document.getElementById('pageSize100');
			pageSize100.style.color='#333';
		}
	};
	
	$scope.goPage = function(input) {
		$scope.pageOption.currentPage = input;
		var pageSize = $scope.pageOption.pageSize;
		var currentPage = $scope.pageOption.currentPage;
		var allData = $scope.pageOption.allData;
		var currentPageStart = pageSize * (currentPage - 1) + 1;
		var currentPageEnd = 1;
	    $scope.pageOption.currentPageStart = currentPageStart;
	  	if (pageSize * currentPage < $scope.pageOption.totalCount) {
			currentPageEnd = pageSize * currentPage;
	  	} else {
		  	currentPageEnd = $scope.pageOption.totalCount;
	  	}
		$scope.pageOption.currentPageEnd = currentPageEnd;
		
	  	$scope.pageOption.currentData = {};
	  	var tempArray = [];
		if (allData.length > 0) {
			for (var i = currentPageStart-1; i<currentPageEnd; i++) {
				tempArray.push(allData[i]);
	  		}
	  		$scope.pageOption.currentData = tempArray;
	  		$scope.fengWeiMiaoShuModel = $scope.pageOption.currentData;
		}
	};
	
	$scope.goLastPage = function() {
		var pageSize = $scope.pageOption.pageSize;
		var currentPage = parseInt($scope.pageOption.totalCount/pageSize)+1;
		var allData = $scope.pageOption.allData;
		var currentPageStart = pageSize * (currentPage - 1) + 1;
		var currentPageEnd = 1;
		$scope.pageOption.currentPage = currentPage;
		$scope.pageOption.lastPage = currentPage;
	    $scope.pageOption.currentPageStart = currentPageStart;
	  	if (pageSize * currentPage < $scope.pageOption.totalCount) {
			currentPageEnd = pageSize * currentPage;
	  	} else {
		  	currentPageEnd = $scope.pageOption.totalCount;
	  	}
		$scope.pageOption.currentPageEnd = currentPageEnd;
		
	  	$scope.pageOption.currentData = {};
	  	var tempArray = [];
		if (allData.length > 0) {
			for (var i = currentPageStart-1; i<currentPageEnd; i++) {
				tempArray.push(allData[i]);
	  		}
	  		$scope.pageOption.currentData = tempArray;
	  		$scope.fengWeiMiaoShuModel = $scope.pageOption.currentData;
		}
	};
	
	} ])
	
	function isNum(value) {
		var result = false;
		if (!value || value=="") {
			return null;
		}
		result = true;
		if (value.trim().match(/^[0-9]*$/)) {
			result = true;
		} else {
			result = false;
		}
		return result;
	}