export default class Validate{
    static validate(step, form) {
        let formKeyes = Object.keys(form).filter((property) => { return typeof form[property] === 'object';});
        let stepKeyes = Object.keys(step);
        for (const key of formKeyes)
            if (!form[key].optional && stepKeyes.indexOf(key) == -1) throw new Error(`{${key}} is not found`);
        for (const key of stepKeyes)
            if (formKeyes.indexOf(key) == -1) throw new Error(`{${key}} is not recognized`);
        stepKeyes.forEach((property) => {
            let params = { ...form[property] }
            if (typeof step[property] === form[property].type && typeof step[property] === 'object' && !Array.isArray(step[property]))
                this.validate(step[property], form[property]);
            else if (params.optional) {
                if (step[property] && typeof step[property] !== form[property].type) 
                    throw new Error(`-${property}- is optional field but type must be a -${form[property].type}-`);
                } else {
                    if (typeof step[property] !== form[property].type || (Array.isArray(step[property]) && form[property].type === 'object'))
                        throw new Error(`-${property}- is required and must be a -${form[property].type}-`);
            } 
        });
    }
}