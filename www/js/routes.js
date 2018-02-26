angular.module('app.routes', [])
    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        $ionicConfigProvider.tabs.position('bottom');
        $stateProvider

            .state('blank', {
                url: '/blank',
                abstract: true,
                templateUrl: 'templates/blank.html'
            })
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tab.html'
            })
            .state('tab.home', {
                url: '/home',
                views: {
                    'tab-home': {
                        templateUrl: 'templates/home/view.html',
                        controller: 'homeCtrl'
                    }
                }
            })
            .state('tab.follow', {
                url: '/follow',
                views: {
                    'tab-follow': {
                        templateUrl: 'templates/follow/view.html',
                        controller: 'followCtrl'
                    }
                }
            })
            .state('tab.sale', {
                url: '/sale',
                views: {
                    'tab-sale': {
                        templateUrl: 'templates/sale/view.html',
                        controller: 'saleCtrl'
                    }
                }
            })
            .state('tab.notify', {
                url: '/notify',
                views: {
                    'tab-notify': {
                        templateUrl: 'templates/notify/view.html',
                        controller: 'notifyCtrl'
                    }
                }
            })
            .state('tab.account', {
                url: '/account',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account/view.html',
                        controller: 'accountCtrl'
                    }
                }
            })
            .state('tab.signup', {
                url: '/signup',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/signup/view.html',
                        controller: 'signupCtrl'
                    }
                }
            })


            .state('tab.product', {
                url: '/product/:id',
                views: {
                    'tab-home': {
                        templateUrl: 'templates/product/view.html',
                        controller: 'productCtrl'
                    }
                }
            })
            .state('tab.menuproduct', {
                url: '/menuproduct/:id',
                views: {
                    'tab-home': {
                        templateUrl: 'templates/menuproduct/view.html',
                        controller: 'menuproductCtrl'
                    }
                }
            })

            .state('blank.cart', {
                url: '/cart',
                templateUrl: 'templates/cart/view.html',
                controller: 'cartCtrl'
            })
            .state('blank.checkOut', {
                url: '/checkOut',
                templateUrl: 'templates/checkOut/view.html',
                controller: 'checkOutCtrl'
            })
            .state('blank.paybillSuccess', {
                url: '/paybillSuccess/:order_doc',
                templateUrl: 'templates/paybillSuccess/view.html',
                controller: 'paybillSuccessCtrl'
            })




            /*
            .state('menu', {
                url: '/page1',
                templateUrl: 'templates/menu.html',
                controller: 'menuCtrl'
            })





            .state('cart', {
                url: '/page2',
                templateUrl: 'templates/cart.html',
                controller: 'cartCtrl'
            })





            .state('checkOut', {
                url: '/page3',
                templateUrl: 'templates/checkOut.html',
                controller: 'checkOutCtrl'
            })







            .state('login', {
                url: '/page4',
                templateUrl: 'templates/login/view.html',
                controller: 'loginCtrl',

                resolve: {
                    "check": function ($location) {
                        if (sessionStorage.getItem('loggedin_id')) { $location.path('/page9'); }
                        else { $location.path('/page4'); }
                    }
                }
            })





            .state('signup', {
                url: '/page5',
                templateUrl: 'templates/signup/view.html',
                controller: 'signupCtrl'
            })





            .state('filterBy', {
                url: '/page6',
                templateUrl: 'templates/filterBy.html',
                controller: 'filterByCtrl'
            })





            .state('sortBy', {
                url: '/page7',
                templateUrl: 'templates/sortBy.html',
                controller: 'sortByCtrl'
            })





            .state('payment', {
                url: '/page8',
                templateUrl: 'templates/payment.html',
                controller: 'paymentCtrl'
            })





            .state('profile', {
                url: '/page9',
                templateUrl: 'templates/profile.html',
                controller: 'profileCtrl'
            })





            .state('myOrders', {
                url: '/page10',
                templateUrl: 'templates/myOrders.html',
                controller: 'myOrdersCtrl'
            })





            .state('editProfile', {
                url: '/page11',
                templateUrl: 'templates/editProfile.html',
                controller: 'editProfileCtrl'
            })





            .state('favorates', {
                url: '/page12',
                templateUrl: 'templates/favorates.html',
                controller: 'favoratesCtrl'
            })





            .state('productPage', {
                url: '/page13',
                templateUrl: 'templates/productPage.html',
                controller: 'productPageCtrl'
            })

            .state('sale', {
                url: '/page14',
                templateUrl: 'templates/sale.html',
                controller: 'saleCtrl'
            })


            ;

            */

        // if none of the above states are matched, use this as the fallback
        //$urlRouterProvider.otherwise('/page1');


        $urlRouterProvider.otherwise('/tab/home');

    });
