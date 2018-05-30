
import {type as validateType} from './validate'
import {isFunction} from "../utils/index";
import $ from 'jquery'
class Validator {
    constructor({type}){
        this.depends={};
        this.type=type;
    }
    validate({ctx,rules}){
        this.ctx=ctx;
        this.rules=rules;
        // 校验器执行页面作用域$scope 下的 render
        // console.log(this.ctx.render)
        this.removeCache();
        return Object.keys(rules).map(this.engine,this).every(valid=>valid)

    }
    removeCache(){
        this.depends={};
    }
    engine(key){
        // 获取校验规则
        let rule=this.rules[key];  // 获取匹配规则对象
        let depends=this.getDepends(rule); // 获取依赖项, 根据依赖项中的数据补全信息
        let name=isFunction(rule.name) ? rule.name(depends):rule.name;
        // 找到一个校验点不通过就停下
        return !Object.keys(this.type).some(type=>{
            // 若一個校驗項中有多個校驗點, 注意設計校驗順序 (在引擎的匹配規則中設置)
            let point=rule[type]; // 获取一个校验点
            let predefine=this.type[type]; // 获取校验预置对象
            let option={};  // 可选对象
            let valid=true;
            if(!point){   // 判断是否需要校验 否则跳过该校验点
               return false
            }
            let need = this.getNeed(rule,depends); // required 校验前的判定
            rule.tips='';
            if(type==='required' && isFunction(rule.need) && !need){
                return false // 调过 require 校验点 （可设置动态校验条件，满足某一条件可进行校验，否则跳过该校验点）
            }
            let customizeTip=this.isCustomizeTip(rule,depends); // 是否需要自定义 tips
            let tipsText=this.isTextTips(rule,depends);
            // 规则的校验是否依赖于 input 输入框的值，如果 depends 项中罗列的项不能找到数据，则需要一个 input
            let hasInput = !!rule.input;
            let input=this.getInput(rule);
            if(hasInput){
                option.input=input;
            }
            if(type!=='required' && !input){  // 非 required 输入框无内容跳过该校验点 （非必填项，若填写，必须满足该项验证格式）
                return false;
            }
            if(isFunction(point)){ // 校验点是函数
                 option.reg=predefine.reg;
                 if(customizeTip){
                 // 自定义 tips
                 // option.tips=predefine.tips({name});
                     if(!point(depends,option)){
                         rule.tips=tipsText;
                     }
                     return !point(depends,option);
                 }else{
                     valid=!point(depends,option);
                 }

            }else{
                if(predefine.validate){
                    // 解构赋值
                    if(Array.isArray(input)){
                        valid=input.every(it =>predefine.validate({input:it,reg:predefine.reg,set:point}))
                    }else{
                        valid=predefine.validate({input,reg:predefine.reg,set:point})
                    }

                }else if(predefine.reg){
                    // 正则校验 判断校验项
                    if(Array.isArray(input)){
                        valid=input.every(it => predefine.reg.test(it))
                    }else{
                        valid=predefine.reg.test(input)
                    }

                }else{
                    throw new Error(`${JSON.stringify(rule)} should have a validate function or a regExp`)

                }

            }

            if(!valid){
                rule.tips=predefine.tips({name,set:point,input});
            }
            return !valid

        })

    }

    isTextTips({tipsText},depends){
        return isFunction(tipsText) ? tipsText(depends):tipsText;
    }

    // 依赖项数据信息补全
    getOneDepend(key){
        if(!this.depends[key]){

            this.depends[key]=this.ctx[key];
        }
        return this.depends[key];
    }

    // 获取依赖的数据项
    getDepends({depends=[]}){
        let res={};
        if(Array.isArray(depends)){
            depends.forEach(key=>{
                res[key]=this.getOneDepend(key);
            })
        }else if(typeof depends==='string'){
            let key=depends;
            res[key]=this.getOneDepend(key);
        }

        return res;
    }

    getNeed({need},depends){
        return isFunction(need) ? need(depends):need;

    }

    // 自定义提示
    isCustomizeTip({customizeTip},depends){
        return isFunction(customizeTip) ? customizeTip(depends) : customizeTip;

    }

    getInput({input}){
        if(input){
            if(Array.isArray(input)){  // 判断是否有同种数据类型的表单框, 有则遍历数据
                return input.map(it => {
                    return this._getInput(it)
                })
            }else{
                return this._getInput(input)
            }
        }
    }

    _getInput (input) {
        return this.ctx.$ ? this.ctx.$(`[name="${input}"]`).val():$(`[name="${input}"]`).val();
    }

}

let validator = new Validator({type:validateType});

export let validate = validator.validate.bind(validator);