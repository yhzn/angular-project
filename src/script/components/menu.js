 import {App} from '../../app'
 import appMenu from '../../components/menu'
 import menuData from '../../data/menu.json'
 import navData from '../../data/nav.json'
export default App.directive('appMenu',["$cookieStore","$state",function($cookieStore,$state){
    return {
        restrict:'A',
        replace:true,
        template:appMenu,
        scope:{},
        link:function($scope){

            $scope.state=$state.current.name;  // 获取当前页的标记
            $scope.menuData=menuData
            $scope.menu=function(){

            }
            $scope.isFolder=function(index,value,text,href){
                let flag=false;
                let store=[];
                $scope.$emit("com",text)  // 向上传播
                if(text!==undefined){
                    if(navData.length===0 && $cookieStore.get('nav')!==undefined && $cookieStore.get('nav').length!==0){
                        store=$cookieStore.get('nav');
                    }

                    angular.forEach(navData,function(value){
                        if(value.text===text){
                            flag=true;
                        }
                    })

                    if(!flag){
                        navData.push({text,href})
                        $cookieStore.put('nav',[...navData,...store])
                    }
                }
                angular.forEach(value,function(sbValue,sbIndex){
                    if(index===sbIndex){
                        sbValue.isFolder=!sbValue.isFolder
                    }else{
                        sbValue.isFolder=false
                    }
                })

            }
            $scope.firOrder=function(index,value){

            }
            $scope.secOrder=function(index,value){


            }
            $scope.thiOrder=function(index,value){

            }
        }

    }
}])