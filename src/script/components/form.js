import {App} from '../../app'
import appForm from '../../components/form'

export default App.directive('appForm',[function(){

    return {
        restrict:'A',
        replace: true,
        template:appForm,
        scope:{
            data:'@',
            age:'=',
            name:'@',
            changeAge:'&changeMyAge'

        },
        link:function($scope){
            $scope.$on('sbMod',function(e,msg){
                $scope.ngModule=msg;

            })
        }
    }
}])