// 校验规则、提示信息

export let type={
    // 是否为必填项
    required:{
        tips:({name})=>`${name}不能为空`,
        reg:/^.+$/,
        validate:({input,reg,set})=>{
            return input!=='' && input!==null && input!==undefined;
        }
    },
    mobile:{
        tips:({name})=>`${name}格式不正确`,
        reg:/^1[3,5,8,4,7]\d{9}$/
    },
    RMB:{
        tips:({name})=>`${name}只能是数字格式的人民币`,
        reg:/^(([1-9]\d*)|0)(\.\d{0,2})?$/
    },
    cardId:{
        tips:({name})=>`请输入正确的${name}号`,
        reg:/(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    },
    numeric:{
        tips:({name,input,set})=>{
            let min,max;
            if(Array.isArray(set)){
                [min,max] = set;
            }else{
                ({min,max} = set);
            }
            return `${name}不能小于${min},不能大于${max}`;
        },
        validate:({input,set})=>{
            // 返回校验的 Boolean 值
            let min,max;
            if(Array.isArray(set)){
                [min,max] = set;
            }else{
                ({min,max} = set);
            }
            return input<=max && input>=min;

        }
    }
}