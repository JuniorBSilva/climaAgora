// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var climaApp = angular.module('climaApp', ['ionic']);

climaApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

climaApp.controller("climaCtrl", ["$scope", "$ionicLoading", "climaSvc", climaCtrl]);

function climaCtrl($scope, $ionicLoading, climaSvc){
    $scope.cidade = "Lins";
    $scope.temperatura = "ND";
    
    // invocar um serviço que se cominica com o Open Weather
    climaSvc.loadClima();
    
    //Funcao Invocada ao se carregar temperatura
    $scope.$on("climaApp.temperatura", function(_,result){
        $scope.sys_name = result.name;
        $scope.temperatura = result.main.temp;
        $scope.descricao = result.weather[0].description;
        $scope.temperaturaMaxima = result.main.temp_max;
        $scope.temperaturaMinima = result.main.temp_min;
        $scope.pressao = result.main.pressure;
        $scope.humidade = result.main.humidity;
        $scope.latitude = result.coord.lat;
        $scope.longitude = result.coord.lon;        
        $scope.temp_icon = "http://openweathermap.org/img/w/" + result.weather[0].icon + ".png";
       
    }
    ); //fim do climaApp.temperatura
    
    $scope.reloadClima = function(){
        console.log("Reload Clima");
        climaSvc.loadClima();
        $scope.$broadcast("scroll.infiniteScrollComplete");
        $scope.$broadcast("scroll.refreshComplete");
    }
    
}//fim do controller

climaApp.service("climaSvc", ["$http","$rootScope",climaSvc]);

function climaSvc($http, $rootScope){
    
    this.loadClima = function(){
        console.log("Carregando clima");
        url = "http://api.openweathermap.org/data/2.5/weather?lat=-21.6692&lon=-49.6933&units=metric&lang=pt";
        $http.get(url, {params : ""}).success(
            function(result){
                console.log("Temperatura carregada com sucesso");
                $rootScope.$broadcast("climaApp.temperatura", result);
            }        
        ).error(
            function(result){
                console.log("Erro ao carregar Temperatura");
            }
        );
    }
    
}//fim do servico
