import {App} from '../../app'
import appNav from '../../components/nav'
import navData from '../../data/nav.json'

export default App.directive('appNav',['$cookies','$cookieStore','$state',function($cookies,$cookieStore,$state){
    return {
        restrict:'A',
        replace: true,
        template:appNav,
        scope:{

        },
        link:function($scope){
            // $scope.state=$state.current.name;
            let data=[]
            if( navData.length===0 && $cookieStore.get('nav')!==undefined && $cookieStore.get('nav').length!==0){
                data=$cookieStore.get('nav');
                navData.push(...data);
            }

            $scope.navData=navData;
            $scope.close=function(index){
                navData.splice(index,1)
               if(navData.length===index){
                    if(navData.length!==0){
                        // 从尾部关闭导航栏 跳转响应路由
                        $state.go(navData[index-1].href,{id:''})

                    }
               }else{
                   // 关闭导航栏 跳转响应路由
                   $state.go(navData[index].href,{id:''})
               }
                $cookieStore.put("nav",navData)
            }

            $scope.routers=function(router){
                $state.go(router,{id:''})

            }


        }
    }
}])