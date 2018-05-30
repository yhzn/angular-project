import {App} from '../../app'
import {validate} from "../validate/validator";

// 匹配规则
let v={
    ownerUser:{
        depends:'activeIdType',
        required:()=>true,
        input:'user',
        name:()=>{

        }
    },
    ownerMobile:{
        mobile:true,    // 是否校验数据格式
        input:'mobile',
        name:'手机号码'
    },
    ownerCardId:{
        cardId:true,
        input:'cardId',
        name:'身份证号'
    },
    ownerNum:{
        numeric:[10,30],
        input:'number',
        name:'金额范围'
    },
    ownerRmb:{
        RMB:true,
        input:'rmb',
        name:'金额'

    },
    ownerCard:{
        depends:['activeIdType','testTips'],
       // required:true,
        // 根据条件判定是否校验数据类型
        cardId:({activeIdType},{reg,input}) => {
            if(activeIdType.s===1223){
                return reg.test(input);
            }else{
                return true;
            }
        },
        customizeTip:({activeIdType})=>{
            return activeIdType.s
        },
        tipsText:({testTips})=>{
            return testTips.tips
        },
        name:'证件号码',
        input:'card'

    }
}

export default App.controller('shop1Ctr',['$http','$scope','$state','$timeout',function($http,$scope,$state,$timeout){
    $timeout(function(){
        $('#id').jqPaginator({
            totalPages: 100,
            visiblePages: 10,
            currentPage: 3,
            onPageChange: function (num, type) {
                $('#p2').text(type + '：' + num);
            }
        });

    },0);

    $scope.testTips={
        tips:"依赖项中自定义信息"
    }
    $scope.activeIdType={
        s:1223

    }
    $scope.post=function(){
        // this 在$scope的作用域下
        if(validate({ctx:this, rules:v})){
            console.log("提交成功")

        }else{
            console.log("提交失败")
        }
    }
    $scope.v=v

    $scope.init=function(){
        console.log('主页初始化')
    }

    $scope.home=function(){
        console.log("主控制器")
    }

    $scope.go=function(){
        $state.go('shop',{id:'123'})

    }

}]);
