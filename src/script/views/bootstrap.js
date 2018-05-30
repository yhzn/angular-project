
import {App} from '../../app'

export default App.controller('bootCtr',['$http','$scope','$state',function($http,$scope,$state){

    $scope.init=function(){
        console.log('商店初始化')
    }
    $scope.go=function(){
        $state.go('home')
    }
}])