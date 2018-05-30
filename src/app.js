// import '../bower_components/angular/angular'
import '../bower_components/angular-ui-router/release/angular-ui-router'
import '../bower_components/angular-cookies/angular-cookies'
import '../bower_components/angular-animate/angular-animate'

import Home from './views/home'
import Shop from './views/shop'
import Shop1 from './views/shop1'
import Shop2 from './views/shop2'
import Shop3 from './views/shop3'
import Shop4 from './views/shop4'
import Shop5 from './views/shop5'
import Shop6 from './views/shop6'
import Shop7 from './views/shop7'
import Boot from './views/bootstrap'

const App=angular.module('app',['ui.router','ngCookies','ngAnimate','moment-picker'])

// value 是一个简单的 javascript 对象，用于向控制器传递值
// 创建 value 对象 "defaultInput" 并传递数据
App.value("defaultInput",5);


// factory 是一个函数用于返回值 在 service 和 controller 需要时创建

// 通常使用 factory 计算或返回值  返回一个对象

// 在 service 里面当我们仅仅需要的是一个方法和数据的集合且不需要处理复杂逻辑的时候 可以用 factory

// factory 一般就是创建一个对象，然后在对这个对象添加方法与数据，最后将这些对象返回即可，然后注入到 controller 层中
// factory 只实例一次

App.factory("MathServer",function(){
    let factory={
        multiply (a,b) {
            return a*b
        }

    }

    return factory;

})

// 在 server 中注入 factory "MathServer"
// 第一次被注入时实例化，只实例化一次，整个应用的生命周期中是个单例模式，可以用来在 controller 之间传递数据

App.service("calc",['MathServer',function(MathServer){
    this.square=function(a){
        return MathServer.multiply(a,a)
    }
}])

// 两个controller 注入同一个 service ,但最终实例化一次
App.service("myService",function(){
    let pri="I am Pri";
    this.variable="This is public";
    this.getPrivate=function(){
        return pri
    }

})


// service 方法很适合使用在功能控制比较多的 service 里面

App.service('User', function($http) { // injectables go here
    var self = this; // Save reference
    this.user = {};
    this.backendUrl = "http://localhost:3000";
    this.setName = function(newName) {
        self.user['name'] = newName;
    }
    this.save = function() {
        return $http.post(self.backendUrl + '/users', {
            user: self.user
        })
    }
});

// provider 唯一能注入到 config 的 server

// 注: 使用 .config() 配置server的时候不能使用 factory() 方法
// 注: 使用 .config() 配置server的时候不能使用 service() 方法

export {App,Home,Shop,Shop1,Shop2,Shop3,Shop4,Shop5,Shop6,Shop7,Boot}