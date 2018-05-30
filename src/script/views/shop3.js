import {App} from '../../app'

export default App.controller('shop3Ctr',['$http','$scope','$state',function($http,$scope,$state){
    $('#id').jqPaginator({
        totalPages: 100,
        visiblePages: 10,
        currentPage: 3,
        onPageChange: function (num, type) {
            $('#p2').text(type + '：' + num);
        }
    });
    $scope.init=function(){
        console.log('主页初始化')
    }
    $scope.home=function(){
        console.log("主控制器")
    }
    $scope.go=function(){
        $state.go('shop',{id:'123'})
    }

}]);
