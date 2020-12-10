import Validate from './validate.mjs';

export default class Transaction{
    constructor(){
        this.logs = [];
        this.store = {};
        this.form = {
            index: {
                type: 'number'
            },
            meta: {
                title: {
                    type: 'string'
                },
                description: {
                    type: 'string'
                }
            },
            call: {
                type: 'function'
            },
            restore: {
                type: 'function',
                optional: true
            }
        }
    }

    async dispatch(scenario){
        this.isValidScenario(scenario);
        scenario.sort((curr, next) => {return curr.index > next.index});
        console.log(scenario);
        

    }

    isValidScenario(scenario){
        for(let step of scenario) {
            Validate.validate(step, this.form);
            let setOfIndexes = new Set(scenario.map(step => step.index).filter(i => i >= 0));
            if(setOfIndexes.size !== scenario.length) throw new Error(`index value must be positive and unique!`);
            //if(step.index < 0) throw new Error(`index value must be positive!`);
        }
    }
}