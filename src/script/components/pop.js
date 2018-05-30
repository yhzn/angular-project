import {App} from '../../app'
import appPop from '../../components/pop'
App.directive('appPop',[function(){
    return {
        restrict:'A',
        replace:true,
        template:appPop,
        scope:{
            show:'='
        },
        link:function($scope){
            console.log("弹窗初始化")
            $scope.showFun=function(){
                $scope.show=true;
            }

        }
    }
}])
