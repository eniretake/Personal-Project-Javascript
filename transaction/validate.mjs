export default class Validate{
    static validate(step, form){
        let formKeys = Object.getOwnPropertyNames(form);
        let difference = Object.getOwnPropertyNames(step).filter(prop => !formKeys.includes(prop));
        if(difference.length) throw new Error(`${difference[0]} property cannot be in this data!`);
        
        for(let key of formKeys){
            if(Array.isArray(step[key])){
                for(let prop of step[key]){
                    Validate.validate(prop, form[key][0]);
                }
            } else if(typeof step[key] === 'object'){
                Validate.validate(step[key], form[key]);
            } else if(step.hasOwnProperty(key)){
                if(typeof step[key] !== form[key].type) throw new Error(`${key} type is not valid!`);
            } else if(!step.hasOwnProperty(key)){
                if(!form[key].hasOwnProperty('optional') || !form[key].optional) throw new Error(`missing ${key} property!`);
            }
        }
    }
}