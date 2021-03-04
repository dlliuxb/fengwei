var _FENGWEI_FIELDS = [ 'addrType', 'custNm1', 'custNm2', 'landCntry', 'addrTxt', 'addrTxt2', 'city1', 'city2', 'stateProv', 'county', 'postCd', 'divn', 'dept', 'poBox', 'taxOffice' ];
var _YUZHI_FIELDS = [ 'addrType', 'custNm1', 'custNm2', 'landCntry', 'addrTxt', 'addrTxt2', 'city1', 'city2', 'stateProv', 'county', 'postCd', 'divn', 'dept', 'poBox', 'taxOffice' ];

var app = angular.module('FengWeiApp', [ 'ngRoute', 'ngFileUpload' ]);

// create the global services
app.factory('CmrService', [
    '$http',
    '$q',
    function($http, $q) {
      var service = {};

	  service.search = function($scope, afterFunc, errorFunc) {
        var params = {
          process : 'SEARCH'
        };
        $http({
          url : 'process',
          method : 'POST',
          params : params
        }).then(function(response) {
          if (response.data && response.data.success) {
            console.log('search - success');
            $scope.fengwei = response.data.data;
             console.log($scope.fengwei)
            if (afterFunc) {
              afterFunc(response.data.data);
            }
          } else {
            console.log('search - response error');
            if (errorFunc) {
              errorFunc(response);
            }
          }
        }, function(response) {
          console.log('search - error');
          if (errorFunc) {
            errorFunc(response);
          } else {
            service.showError('Cannot search records.');
          }
        });
      };

      service.getParameterByName = function(name, url) {
        if (!url) {
          url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
        var results = regex.exec(url);
        if (!results) {
          return null;
        }
        if (!results[2]) {
          return '';
        }
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
      };

      

      service.submitRequest = function($scope, afterFunc, extraParams) {
        service.showProgress('Your request is being created, please wait..');

        var json = {};

        var request = $scope.request;
        if (!request) {
          return;
        }
        // normalize the request data
        for ( var prop in request) {
          if (request.hasOwnProperty(prop)) {
            json[prop] = request[prop].value;
          }
        }

        if (extraParams) {
          for ( var prop in extraParams) {
            if (extraParams.hasOwnProperty(prop)) {
              console.log(' - adding extra param: ' + prop + ' = ' + extraParams[prop]);
              json[prop] = extraParams[prop];
            }
          }

        }

        json.addresses = [];
        var addresses = request.addresses;
        if (addresses && addresses.length > 0) {
          for (var i = 0; i < addresses.length; i++) {
            var address = addresses[i];
            var jsonAddr = {};
            for ( var prop in address) {
              if (address.hasOwnProperty(prop)) {
                jsonAddr[prop] = address[prop].value;
              }
            }
            json.addresses.push(jsonAddr);
          }
        }

        $http({
          url : 'process',
          method : 'POST',
          headers : {
            'Content-Type' : 'application/json; charset=UTF-8'
          },
          params : {
            process : 'EXEC',
            request : json

          }
        }).then(function(response) {
          service.hideProgress();
          if (response.data && response.data.success) {
            var result = response.data.data.result;
            console.log(result);
            if (result.success) {
              if (afterFunc) {
                afterFunc(result.reqId);
              } else {
                var reqId = result.reqId;
                jQuery('#req-success-id').html(reqId);
                service.showModal('req-success');
              }
            } else {
              var errors = result.errors;
              if (errors) {
                var errorMsg = 'Some errors were encountered.<br><ul>';
                for (var i = 0; i < errors.length; i++) {
                  var msg = errors[i];
                  msg = msg.replace(/</gi, '(').replace(/>/gi, ')');
                  errorMsg += '<li>' + msg + '</li>';
                }
                errorMsg += '</ul>';
                service.showError(errorMsg);
              } else {
                service.showError('An error occurred while creating the request. Kindly try again or contact your system administrator.');
              }
            }
          } else {
            service.showError('An error occurred while creating the request. Kindly try again or contact your system administrator.');
          }
        }, function(response) {
          service.hideProgress();
          console.log('create request - error');
          service.showError('An error occurred while creating the request. Kindly try again or contact your system administrator.');
          console.log(response);
        });

      };

      service.showProgress = function(message) {
        var msg = message ? message : 'Processing, please wait..';
        jQuery('#process-msg').html(msg);
        try {
          IBMCore.common.widget.overlay.show('processingMsg');
        } catch (e) {
          IBMCore.common.widget.overlay.currentShowingOverlay('processingMsg');
        }
      };

      service.hideProgress = function() {
        IBMCore.common.widget.overlay.hide('processingMsg', true);
      };

      service.showError = function(message) {
        var msg = message ? message : 'The page contains errors. Please check the fields on the page and correct the errors before submitting.';
        jQuery('#error-msg').html(msg);
        IBMCore.common.widget.overlay.show('errorMsg');
      };

      service.showModal = function(id) {
        IBMCore.common.widget.overlay.show(id);
      };

      service.hideModal = function(id) {
        IBMCore.common.widget.overlay.hide(id, true);
      };

      service.copy = function(jsonObject) {
        var s = JSON.stringify(jsonObject);
        var json = JSON.parse(s);
        return json;
      };

      service.val = function($scope, fieldName, value) {
        if ($scope.request) {
          if (!$scope.request[fieldName]) {
            $scope.request[fieldName] = {};
          }
          if (value != null) {
            var selector = '#' + fieldName;
            $scope.request[fieldName].value = value;
            if (jQuery(selector).data() && jQuery(selector).data().select2) {
              jQuery(selector).val(value).trigger('change.select2');
            }
          }
          return $scope.request[fieldName].value;
        }
        return null;
      };
      service.searchval = function($scope, fieldName, value) {
        if ($scope.search) {
          if (!$scope.search[fieldName]) {
            $scope.search[fieldName] = {};
          }
          if (value != null) {
            var selector = '#' + fieldName;
            $scope.search[fieldName].value = value;
            if (jQuery(selector).data() && jQuery(selector).data().select2) {
              jQuery(selector).val(value).trigger('change.select2');
            }
          }

          return $scope.search[fieldName].value;
        }
        return null;
      };
      service.addrVal = function($scope, fieldName, index, value) {
        if ($scope.request && $scope.request.addresses && $scope.request.addresses[index]) {
          if (!$scope.request.addresses[index][fieldName]) {
            $scope.request.addresses[index][fieldName] = {};
          }
          if (value != null) {
            $scope.request.addresses[index][fieldName].value = value;
            var selector = '[name="' + fieldName + '"]';
            if (jQuery(jQuery(selector)[index]).data() && jQuery(jQuery(selector)[index]).data().select2) {
              jQuery(jQuery(selector)[index]).val(value).trigger('change.select2');
            }
          }
          return $scope.request.addresses[index][fieldName].value;
        }
        return null;
      };

      service.getUserInfo = function($scope, afterFunc, errorFunc) {
        var params = {
          process : 'USER'
        };
        $http({
          url : 'process',
          method : 'POST',
          params : params
        }).then(function(response) {
          if (response.data && response.data.success) {
            console.log('user info - success');
            $scope.user = response.data.data;
            // console.log(' in '+$scope.user.geo)
            if (afterFunc) {
              afterFunc(response.data.data);
            }
          } else {
            console.log('user info - response error');
            if (errorFunc) {
              errorFunc(response);
            }
          }
        }, function(response) {
          console.log('user info - error');
          if (errorFunc) {
            errorFunc(response);
          } else {
            service.showError('Cannot get user information.');
          }
        });
      };

      
      service.findCMR = function(country, cmrNo, afterFunc) {
        var params = {
          process : 'FINDCMR',
          cmrNo : cmrNo,
          issuingCntry : country
        };
        $http({
          url : 'process',
          method : 'POST',
          params : params
        }).then(function(response) {
          console.log('findcmr - success');
          if (afterFunc) {
            afterFunc(response.data.data, country, cmrNo);
          }
        }, function(response) {
          console.log('findcmr - error');
          console.log(response);
          service.hideProgress();
        });
      };

      return service;
    } ]);

// inject the globals into the root scope
app.run([ '$rootScope', '$location', 'CmrService', function($rootScope, $location, CmrService) {

  $rootScope.request = {
    cmrIssuingCntry : {
      value : CmrService.getParameterByName('cmrIssuingCntry') ? CmrService.getParameterByName('cmrIssuingCntry') : '897',
      required : true
    },
    reqType : {
      value : CmrService.getParameterByName('reqType') ? CmrService.getParameterByName('reqType') : 'C',
      required : true
    },
    custGrp : {
      required : true
    },
    custSubGrp : {
      required : true
    },
    reqStatus : {
      value : 'DRA'
    },
    reqId : {
      value : CmrService.getParameterByName('reqId') ? CmrService.getParameterByName('reqId') : '0'
    },
    requesterId : {
      value : 'dummy' // somehow get this from session
    },
    expediteInd : {
      value : 'X' // dummy, handle backend
    },
    requestingLob : {
      value : 'X' // dummy, handle backend
    },
    reqReason : {
      value : 'X' // dummy, handle backend
    },
    cmrOwner : {
      value : 'X' // dummy, handle backend
    },
    sensitiveFlag : {
      value : 'X' // dummy, handle backend
    },
    custPrefLang : {
      value : 'E'
    },
    addresses : []
  };

  
  $rootScope.user = {};

  $rootScope.showTimeoutError = function() {
    IBMCore.common.widget.overlay.show('timeoutMsg');
    $location.path('/logout');
  };
} ]);

var WindowMgr = (function() {
  var _CMRWINDOWS = new Object();

  return {
    open : function(windowId, recordId, location, width, height, external) {
      var id = windowId + '-' + recordId;
      if (_CMRWINDOWS[id] && !_CMRWINDOWS[id].closed) {
        _CMRWINDOWS[id].focus();
        try {
          _CMRWINDOWS[id].doFocus();
        } catch (e) {
          // noop
        }
        return _CMRWINDOWS[id];
      } else {
        var dHeight = height ? height + 'px' : '560px';
        var dWidth = width ? width + 'px' : '1000px';
        var fullLoc = location;
        var specs = 'location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no,height=' + dHeight + ',width=' + dWidth;
        console.log(fullLoc + ' = ' + id);
        var win = window.open(fullLoc, id, specs, true);
        if (!win) {
          alert("The window cannot be opened at this time. Please contact your system administrator");
          return null;
        } else {
          _CMRWINDOWS[id] = win;
          win.focus();
          return win;
        }
      }
    },
  };
})();

function backHome() {
  window.location = 'home';
}

function searchAgain(country) {
  window.location = 'findcmr?cmrIssuingCntry=' + country;
}
function backToRequests() {
  window.location = 'queue';
}