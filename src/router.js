
import {App,Home,Shop,Shop1,Shop2,Shop3,Shop4,Shop5,Shop6,Shop7,Boot} from './app'

export default App.config(['$stateProvider','$urlRouterProvider','$locationProvider','momentPickerProvider',function($stateProvider,$urlRouterProvider,$locationProvider,momentPickerProvider){
    $locationProvider.hashPrefix(''); // 去除路由上的 ! 号
    momentPickerProvider.options({
        locale:"zh-cn",
    });
    $stateProvider
        .state('home',{
            url:'/home:id',
            template:Home,
            controller:'homeCtr'
        })
        .state('shop',{
            url:'/shop:id',
            template:Shop,
            controller:'shopCtr'
        })
        .state('A',{
            url:'/A:id',
            template:Shop1,
            controller:'shop1Ctr'
        })
        .state('S',{
            url:'/S:id',
            template:Shop2,
            controller:'shop2Ctr'
        })
        .state('D',{
            url:'/D:id',
            template:Shop3,
            controller:'shop3Ctr'
        })
        .state('F',{
            url:'/F:id',
            template:Shop4,
            controller:'shop4Ctr'
        })
        .state('G',{
            url:'/G:id',
            template:Shop5,
            controller:'shop5Ctr'
        })
        .state('H',{
            url:'/H:id',
            template:Shop6,
            controller:'shop6Ctr'
        })
        .state('J',{
            url:'/J:id',
            template:Shop7,
            controller:'shop7Ctr'
        })
        .state('boot',{
            url:'/boot',
            template:Boot,
            controller:'bootCtr'
        })
    ;
    // $urlRouterProvider.otherwise('/home')  // 上面路由没有匹配上 就跳转至 main
    // $locationProvider.html5Mode({
    //     enabled:true,
    //     requireBase:false
    // })  //处理路由中 # 问题
}])
