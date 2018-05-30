export let isBasic = (it) => {
    return it===null || ( typeof it !== "object" && typeof it !== 'array');
}
export let clone =  (it) => {
    if(isBasic(it)){
        return it;
    }
    let result = Array.isArray(it) ? [] : {};
    for (let i in it){
        result[i]=clone(it[i]);
    }
    return result;
}

let is = (it,type) => {
    return ({}).toString.call(it)===`[object ${type}]`;

}

export let isFunction = (it) => {
    return is(it,'Function')

}


