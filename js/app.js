/*!
 * Webogram v0.4.6 - messaging web application for MTProto
 * https://github.com/zhukov/webogram
 * Copyright (C) 2014 Igor Zhukov <igor.beatle@gmail.com>
 * https://github.com/zhukov/webogram/blob/master/LICENSE
 */

'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'ngAnimate',
  'ui.bootstrap',
  'mediaPlayer',
  'izhukov.utils',
  'izhukov.mtproto',
  'izhukov.mtproto.wrapper',
  'myApp.filters',
  'myApp.services',
  /*PRODUCTION_ONLY_BEGIN
  'myApp.templates',
  PRODUCTION_ONLY_END*/
  'myApp.directives',
  'myApp.controllers'
]).
config(['$locationProvider', '$routeProvider', '$compileProvider', 'StorageProvider', function($locationProvider, $routeProvider, $compileProvider, StorageProvider) {

  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob|filesystem|chrome-extension|app):|data:image\//);
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|file|tg|mailto|blob|filesystem|chrome-extension|app):|data:/);

  if (Config.Modes.test) {
    StorageProvider.setPrefix('t_');
  }

  $routeProvider.when('/', {templateUrl: templateUrl('welcome'), controller: 'AppWelcomeController'});
  $routeProvider.when('/login', {templateUrl: templateUrl('login'), controller: 'AppLoginController'});
  $routeProvider.when('/im', {templateUrl: templateUrl('im'), controller: 'AppIMController', reloadOnSearch: false});
  $routeProvider.otherwise({redirectTo: '/'});

}])
.animation('.slide-animation', function () {
        return {
            beforeAddClass: function (element, className, done) {
                var scope = element.scope();

                if (className == 'ng-hide') {
                    var finishPoint = element.parent().width();
                    if(scope.direction !== 'right') {
                        finishPoint = -finishPoint;
                    }
                    TweenMax.to(element, 0.5, {left: finishPoint, onComplete: done });
                }
                else {
                    done();
                }
            },
            removeClass: function (element, className, done) {
                var scope = element.scope();

                if (className == 'ng-hide') {
                    element.removeClass('ng-hide');

                    var startPoint = element.parent().width();
                    if(scope.direction === 'right') {
                        startPoint = -startPoint;
                    }

                    TweenMax.fromTo(element, 0.5, { left: startPoint }, {left: 0, onComplete: done });
                }
                else {
                    done();
                }
            }
        }
        });
