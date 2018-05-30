import {App} from '../../app'
import appDrawer from '../../components/drawer'
App.directive('appDrawer',[function(){
    return {
        restrict:'A',
        replace:true,
        template:appDrawer,
        scope:{
            show:'='
        },

        link:function($scope){
            $scope.showFun=function(){
                $scope.show=true;
            }

        }

    }
}])
