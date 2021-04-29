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
	];$scope.pageOption = {
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
			var index = '';
			for (var i = 0; i< $scope.yuZhiModel.length; i++) {
				if (id == $scope.yuZhiModel[i].yuzhiId) {
					index = i;
				}
			}
    		$scope.yuzhiId = $scope.yuZhiModel[index].yuzhiId;
			$scope.cas = $scope.yuZhiModel[index].cas;
			$scope.compound = $scope.yuZhiModel[index].compound;
			$scope.thredW = $scope.yuZhiModel[index].thredW;
			$scope.definition1 = $scope.yuZhiModel[index].definition1;
			$scope.ref1 = $scope.yuZhiModel[index].ref1;
			$scope.thredA = $scope.yuZhiModel[index].thredA;
			$scope.definition2 = $scope.yuZhiModel[index].definition2;
			$scope.ref2 = $scope.yuZhiModel[index].ref2;
			$scope.thredO = $scope.yuZhiModel[index].thredO;
			$scope.definition3 = $scope.yuZhiModel[index].definition3;
			$scope.ref3 = $scope.yuZhiModel[index].ref3;
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
				  console.log($scope.pageOption);
				  $scope.yuZhiModel = $scope.pageOption.currentData;
				  
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
		if (!$scope.yuzhiId || $scope.yuzhiId == '') {
			var params = {};
        	params.cas = $scope.cas;
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
					  if (results && results.length == 0) {
						// do nothing
					  } else {
						$('#msg').html("CAS已经存在");
						alert("CAS已经存在");
						return;
					  }
				}
	        }, function(response) {
			  $('#msg').html("检查CAS失败，请过后再试或联系管理员");
			  return;
	        });
		}
		var ok = $scope.validateOnCreUpd();
		if (ok) {
			$scope.execCreateUpdate();
		} else {
			alert("请检查输入");
		}
	};

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
          console.log('Create/Update - success');
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
          console.log('Create/Update - error');
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
		if ($scope.cas != '' && invalidChar($scope.cas)) {
			alert('CAS不能包含双引号或连续的破折号');
			return false;
		}
		if ($scope.compound != '' && invalidChar($scope.compound)) {
			alert('Compound不能包含双引号或连续的破折号');
			return false;
		}
		if ($scope.thredW != '' && invalidChar($scope.thredW)) {
			alert('Thred-w(mg/kg)不能包含双引号或连续的破折号');
			return false;
		}
		if ($scope.definition1 != '' && invalidChar($scope.definition1)) {
			alert('Definition(d/r)-w不能包含双引号或连续的破折号');
			return false;
		}
		if ($scope.ref1 != '' && invalidChar($scope.ref1)) {
			alert('Ref-w不能包含双引号或连续的破折号');
			return false;
		}
		if ($scope.thredA != '' && invalidChar($scope.thredA)) {
			alert('Thred-a(mg/kg)不能包含双引号或连续的破折号');
			return false;
		}
		if ($scope.definition2 != '' && invalidChar($scope.definition2)) {
			alert('Definition(d/r)-a不能包含双引号或连续的破折号');
			return false;
		}
		if ($scope.ref2 != '' && invalidChar($scope.ref2)) {
			alert('Ref-a不能包含双引号或连续的破折号');
			return false;
		}
		if ($scope.thredO != '' && invalidChar($scope.thredO)) {
			alert('Thred-other(mg/kg)不能包含双引号或连续的破折号');
			return false;
		}
		if ($scope.definition3 != '' && invalidChar($scope.definition3)) {
			alert('Definition(d/r)-other不能包含双引号或连续的破折号');
			return false;
		}
		if ($scope.ref3 != '' && invalidChar($scope.ref3)) {
			alert('Ref-other不能包含双引号或连续的破折号');
			return false;
		}
		return true;
	};
 
	$scope.preExecDelete = function() {
		var ok = $scope.validateOnDelete();
		if (ok) {
			$scope.execDelete();
		} else {
			alert("请检查输入");
		}
	};

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
          	console.log('delete - success');
			$scope.yuzhiId = $scope.yuzhiIdBackup;
			if (response.data.success) {
				$('#msg').html("操作成功");
                alert("操作成功");
				$('#deleteConfirm').modal('hide');
			} else {
				var msg = response.data.msg;
				$('#msg').html(msg);
				alert(msg);
				$('#deleteConfirm').modal('hide');
				return;
			}
        }, function(response) {
          console.log('delete - error');
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
		$scope.yuzhiIdBackup = $scope.yuzhiId;
		$scope.yuzhiId = id;
		console.log($scope.yuzhiId);
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
	  		$scope.yuZhiModel = $scope.pageOption.currentData;
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
	  		$scope.yuZhiModel = $scope.pageOption.currentData;
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
	  		$scope.yuZhiModel = $scope.pageOption.currentData;
		}
	};
	
	} ])
	
	function invalidChar(value) {
		var result = false;
		if (!value || value=="") {
			return null;
		}
		if (value.indexOf("\"") >= 0) {
			result = true;
		}
		if (value.indexOf("--") >= 0) {
			result = true;
		}
		return result;
	}


