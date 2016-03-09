// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var prometheus = angular.module('prometheus', ['ionic', 'firebase', 'ui.router', 'ngCordova', 'ngStorage'])

prometheus.constant('fburl', 'https://torrid-fire-916.firebaseio.com/');

prometheus.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('signup', {
      url: '/',
      templateUrl: 'views/signup.html'
    })
    $stateProvider.state('groups', {
      url: '/groups',
      templateUrl: 'views/groups.html'
    })
    $stateProvider.state('lists', {
      url: '/lists',
      templateUrl: 'views/lists.html'
    })
    $stateProvider.state('success', {
      url: '/success',
      templateUrl: 'views/successpage.html'
    })
    $stateProvider.state('search', {
      url: '/search',
      templateUrl: 'views/search.html'
    })
    $stateProvider.state('moviecard', {
      url: '/moviecard',
      templateUrl: 'views/moviecard.html'
    })
    $urlRouterProvider.otherwise('/');
});