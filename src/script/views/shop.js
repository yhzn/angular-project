
import {App} from '../../app'

export default App.controller('shopCtr',['$http','$scope','$state','myService',function($http,$scope,$state,myService){
    console.log(myService.variable)
    // 抽屉
    $scope.show=true;
    $scope.showFun=function(){
        $scope.show=false;
    }
    $scope.popShow=true;
    $scope.popShowFun=function(){
        $scope.popShow=false;
    }

    $scope.age='20';
    $scope.name="en";

    $scope.changeAge=function(){
        $scope.age='0';

    }


    $scope.$on('com',function(e,msg){

        $scope.dataCom='通信 :'+msg;

    })
    $scope.$on('mod',function(e,msg){
        console.log(msg)  // 父组件接收信息

        $scope.$broadcast("sbMod",msg)  // 将值向下广播给子组件

    })
    $scope.init=function(){
        console.log('商店初始化')
    }
    $scope.go=function(){
        $state.go('home')
    }
}])