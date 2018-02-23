angular.module('ksLibrary', [])
    .factory('$ksFactory', function($ionicPopup, $http, $ionicLoading, $timeout) {
        var $ksFactory = {
            alert: function(message,callback) {
                $ionicPopup.show({
                    title: 'Commarket',
                    template: message,
                    buttons: [
                        { 
                            text: '<i class="ion-checkmark"></i> ตกลง',
                            type: 'button-positive',
                            onTap: function(e) {
                                if(callback) callback();
                            }
                        }
                    ]
                });
            },
            confirm: function(message,callback) {
                $ionicPopup.show({
                    title: 'Commarket',
                    template: message,
                    buttons: [
                        { 
                            text: '<i class="ion-checkmark"></i> ตกลง',
                            type: 'button-positive',
                            onTap: function(e) {
                                callback(true)
                            }
                        },
                        { 
                            text: '<i class="ion-close"></i> ยกเลิก',
                            type: 'button-outline button-positive',
                            onTap: function(e) {
                                callback(false)
                            }
                        },
                    ]
                });
            },
            loading: {
                show : function() {
                    $ionicLoading.show({template: '<ion-spinner></ion-spinner><br>กำลังประมวลผล...'});
                },
                hide : function() {
                    $ionicLoading.hide();
                }
            },
            storage: {
                get: function(key) {
                    try {
                        var a = JSON.parse( localStorage.getItem(key) );
                        return a;
                    } catch(e) {
                        return null;
                    }
                },
                set: function(key, value) {
                    localStorage.setItem(key, JSON.stringify(value));
                },
                unset: function(key) {
                    localStorage.removeItem(key);
                }
            },
            http: function(url,data,success, error, loading) {
                var toparams = function(obj) {
                    var p = [];
                    for (var key in obj) {
                        var a;
                        if( obj[key]!=null ) a = obj[key];
                        else a = "";
                        p.push(key + '=' + encodeURIComponent(a));
                    }
                    return p.join('&');
                };
                if(loading==true) $ksFactory.loading.show();
                $timeout(function(){
                    $http({
                        method : "POST",
                        url : url,
                        headers	: { 'Content-Type' :  'application/x-www-form-urlencoded' },
                        data: toparams(data),
                    }).then(function mySucces(response) {
                        if(loading==true) $ksFactory.loading.hide();
                        if( typeof(response.data)==='object' ) {
                            success(response.data);
                        } else {
                            success(response.data.trim());
                        }
                    }, function myError(response) {
                        if(loading==true) $ksFactory.loading.hide();
                        if(error) error(response.data);
                    });
                },500);
            },
            isLogin : function() {
                var auth = JSON.parse(localStorage.getItem("auth"));
                if(!auth||auth==null||!auth.user_id||!auth.username) {
                    return false;
                } else {
                    return true;
                }
            }
        };
        return $ksFactory;
    })
    .directive('errSrc', function() {
        return {
            link: function(scope, element, attrs) {
                scope.$watch(function() {
                return attrs['ngSrc'];
                }, function (value) {
                    if (!value) {
                        element.attr('src', attrs.errSrc);  
                    }
                });
                element.bind('error', function() {
                    element.attr('src', attrs.errSrc);
                });
            }
        }
    })