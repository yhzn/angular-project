import {App} from '../../app'
import appForm1 from '../../components/form1'

export default App.directive('appForm1',[function(){

    return {
        restrict:'A',
        replace: true,
        template:appForm1,
        scope:{

        },
        link:function($scope){
            $scope.change=function(msg){
                $scope.$emit("mod",msg)
            }
        }
    }
}])