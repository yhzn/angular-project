
import {App} from '../../app'
import appHead from '../../components/head'
export default App.directive('appHead',[function(){
    return {
        restrict:'A',
        replace: true,
        template:appHead,
        scope:{

        },
        link:function($scope){
            $scope.init=function(){
                console.log('头部初始化')
            }
            $scope.head=function(){
                console.log("头部")
            }
        }
    }
}])