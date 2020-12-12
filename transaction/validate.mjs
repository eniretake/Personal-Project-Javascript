export default class Validate{
    static validate(step, form) {
        let stepItems = Object.getOwnPropertyNames(step);
        let formItems = Object.getOwnPropertyNames(form).filter((property) => { return typeof form[property] === 'object';});
        for (let item of formItems)
            if (!form[item].optional && stepItems.indexOf(item) == -1) throw new Error(`-${item}- is required`);
        for (let item of stepItems)
            if (formItems.indexOf(item) == -1) throw new Error(`data must not contain -${item}-`);

        stepItems.forEach((property) => {
            let item = { ...form[property] }
            if (typeof step[property] === form[property].type && typeof step[property] === 'object' && !Array.isArray(step[property]))
                this.validate(step[property], form[property]);
            else if (item.optional) {
                if (step[property] && typeof step[property] !== form[property].type) 
                    throw new Error(`-${property}- is optional field but type must be a -${form[property].type}-`);
            } else {
                if (typeof step[property] !== form[property].type || (Array.isArray(step[property]) && form[property].type === 'object'))
                    throw new Error(`-${property}- is required and must be a -${form[property].type}-`);
            }
        });
    }
}