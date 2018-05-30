import {App} from '../../app'
import appFoot from '../../components/foot'

export default App.directive('appFoot',[function(){

    return {
        restrict:'A',
        replace: true,
        template:appFoot,
        scope:{

        },
        link:function($scope){
            $scope.foot=function(){
                console.log("foot")
            }
        }
    }
}])