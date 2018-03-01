angular.module('app.controllers')
    .controller('saleCtrl', function ($rootScope, $scope, $ionicActionSheet, $cordovaCamera, $ksFactory, $state, $cordovaFileTransfer, $ionicSlideBoxDelegate, $timeout, $notification) {

        

        $scope.product = {};
        $scope.product.images = [];
        $scope.product.p_name = "";
        $scope.product.p_description = "";
        $scope.product.p_category = "";
        $scope.product.p_price = 0;
        $scope.product.p_stock = 0;

        $scope.product.p_category_source = [];        

        function getCategory() {
            $ksFactory.http($rootScope.URL+'categories_get.php', { }, function(res) {
                if( res.data ) {
                    $scope.product.p_category_source = res.data;
                    if( res.data.length > 0 )  $scope.product.p_category = res.data[0].cat_id
                } else {
                    $ksFactory.alert("Error เนื่องจาก "+res);
                }
            }, function(res) {
                $ksFactory.alert("Error เนื่องจาก "+$rootScope.MESSAGE.ERROR1);
            }, true);
        }
        function getProductImageTemp() {
            $notification.update($rootScope.USER);
            $ksFactory.http($rootScope.URL+'product_image_temp_get.php', {
                u_id : $rootScope.USER.u_id
            }, function(res) {
                if (res.data) {
                    $scope.product.images = res.data;
                    $timeout(function () {
                        $ionicSlideBoxDelegate.$getByHandle('my-slide').update();
                        if ($scope.product.images.length != 0) {
                            $ionicSlideBoxDelegate.$getByHandle('my-slide').slide(0);
                        }
                    });
                } else {
                    $ksFactory.alert("Error เนื่องจาก "+res);
                }
            }, function(res) {
                $ksFactory.alert("Error เนื่องจาก "+$rootScope.MESSAGE.ERROR1);
            }, true);
        }
        $scope.upload = function () {
            if( !$rootScope.DEVICE.platform ) {
                $ksFactory.alert("No device.");
                //var form = document.createElement("input");
            } else {
                var hideSheet = $ionicActionSheet.show({
                    titleText: 'อัพโหลดรูปภาพ',
                    buttons: [
                        { text: '<i class="ion ion-camera"></i> ถายรูป' },
                        { text: '<i class="ion ion-images"></i> เลือกจากอัลบั้ม' }
                    ],
                    buttonClicked: function (index) {
                        var pic_source = Camera.PictureSourceType.CAMERA;
                        if(index==0) pic_source = Camera.PictureSourceType.CAMERA;
                        if(index==1) pic_source = Camera.PictureSourceType.SAVEDPHOTOALBUM;
                        var options = {
                            destinationType: Camera.DestinationType.FILE_URI,
                            sourceType: pic_source,
                            allowEdit: true,
                            targetWidth: 1000,
                            targetHeight: 1000,
                            encodingType: Camera.EncodingType.JPEG,
                            mediaType: Camera.MediaType.PICTURE,
                            correctOrientation: true
                        };
                        $cordovaCamera.getPicture(options).then(function(imageURI) {
                            upload(imageURI);
                        }, function(err) {
                        });
                        return true;
                    }
                });
            }
        };
        var upload = function(imageURI) {
            var server = $rootScope.URL+"product_image_temp_add.php";
            var filePath = imageURI;
            var options = {
                fileKey: "file",
                params: {
                    u_id: $rootScope.USER.u_id
                }
            };
            $cordovaFileTransfer.upload(server, filePath, options)
                .then(function(result) {
                    if (result.response == "Y") {
                        getProductImageTemp();
                    } else {
                        getProductImageTemp();
                        $ksFactory.alert("Error เนื่องจาก "+result.response);
                    }
                }, function(err) {
                    $ksFactory.alert("Error เนื่องจาก "+$rootScope.MESSAGE.ERROR1);
                }, function (progress) {
                    $timeout(function () {
                        $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                    });
                });
        }
        $scope.save = function () {
            if( $scope.product.p_name=="" ) {
                $ksFactory.alert("p_name impty.");
                return;
            }
            if( $scope.product.p_description=="" ) {
                $ksFactory.alert("p_description impty.");
                return;
            }
            if( $scope.product.p_category=="" ) {
                $ksFactory.alert("p_category impty.");
                return;
            }
            $ksFactory.http($rootScope.URL+'product_add.php', {
                p_name : $scope.product.p_name,
                p_description : $scope.product.p_description,
                p_category : $scope.product.p_category,
                p_price : $scope.product.p_price,
                p_stock : $scope.product.p_stock,
                u_id : $rootScope.USER.u_id
            }, function(res) {
                if (res == "Y") {
                    $ksFactory.alert($rootScope.MESSAGE.SUCCESS);
                } else {
                    $ksFactory.alert("Error เนื่องจาก "+$rootScope.MESSAGE.NOSUCCESS);
                }
                getProductImageTemp();
            }, function(res) {
                $ksFactory.alert("Error เนื่องจาก "+$rootScope.MESSAGE.ERROR1);
            }, true);
        }
        $scope.del = function(id) {
            $ksFactory.http($rootScope.URL + 'product_image_temp_del.php', {
                id: id
            }, function (res) {
                if (res != "Y") { 
                    $ksFactory.alert("Error เนื่องจาก " + res);
                }
                getProductImageTemp();
            }, function (res) {
                $ksFactory.alert("Error เนื่องจาก " + $rootScope.MESSAGE.ERROR1);
            }, true);
        }
        $scope.$on('$ionicView.enter', function(scopes, states) {
            if( $rootScope.USER==null ) {
                $ksFactory.alert($rootScope.MESSAGE.NOPERMIT);
                $state.go('tab.account');
                return;
            }
            $notification.update($rootScope.USER);
            getCategory();
            getProductImageTemp();
        });
    })