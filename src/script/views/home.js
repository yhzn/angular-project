
import {App} from '../../app'

export default App.controller('homeCtr',['$http','$scope','$state','$timeout','defaultInput','calc','myService',function($http,$scope,$state,$timeout,defaultInput,calc,myService){
    console.log(defaultInput)
    console.log(calc.square(3))
    console.log(myService.variable)
    console.log(myService.getPrivate())
    myService.variable="home as home"
    $timeout(function(){
        $('#id').jqPaginator({
            totalPages: 200,
            visiblePages: 10,
            currentPage: 3,
            onPageChange: function (num, type) {
                $('#p2').text(type + '：' + num);
            }
        });
        $('#dd').datebox({
            required:true
        });

        $("#signup-idimage1").uploadifive({
            'auto' : true,
            'uploadScript' : 'image',
            'fileObjName' : 'upload',
            'buttonText' : '上传照片',
            'queueID' : 'tip-queue1',
            'fileType' : 'image/*',
            'multi' : false,
            'fileSizeLimit'   : 5242880,
            'uploadLimit' : 1,
            'queueSizeLimit'  : 1,
            'onUploadComplete' : function(file, data) {

                var obj = JSON.parse(data);
                if (obj.img == "500") {
                    alert("系统异常！");
                } else {
                    $("#frontSide").val(obj.img);
                    document.getElementById("submit").disabled = false;
                }
            },
            onCancel : function(file) {
                $("#frontSide").val("");
                /* 注意：取消后应重新设置uploadLimit */
                $data = $(this).data('uploadifive'),
                    settings = $data.settings;
                settings.uploadLimit++;
                alert(file.name + " 已取消上传~!");
            },
            onFallback : function() {
                alert("文件上传该浏览器无法使用!");
            },
            onUpload : function(file) {

                document.getElementById("submit").disabled = true;//当开始上传文件，要防止上传未完成而表单被提交
            },
        });
    }, 0);

    $scope.init=function(){
        console.log('主页初始化')
    }
    $scope.home=function(){
        console.log("主控制器")
    }
    $scope.go=function(){
        $state.go('shop',{id:'123'})
    }

    $scope.onChange = function (newValue, oldValue) {
        console.log(newValue._i);
        console.log(ctrl.stringDate);
    };

    //最小值
    $scope.MinDate = moment().subtract(0, 'day');


}]);
