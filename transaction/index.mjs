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
                type: 'object',
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
            },
            // by default silent is false, if an error occurres bigins restore() method. if silent is true and error occurres transaction continues.
            silent: {
                type: 'boolean',
                optional: true
            }
        }
    }

    async dispatch(scenario){
        this.isValidScenario(scenario);
        for (let i = 0; i < scenario.length; i++) {
            let step = scenario[i];
            let silent= false;
            if(step.hasOwnProperty('silent')) silent = step.silent;
            let storeBefore = { ...this.store};
            try{
                await step.call(this.store);
                let storeAfter = { ...this.store};
                this.logs.push({ ...step, storeBefore, storeAfter, error: null});
            }catch(e){
                if(!silent){
                    this.logs.push({ ...step, 
                        error: {name: e.name, message: e.message, stack: e.stack}
                    });
                    for(let j = i-1; j >= 0; j--) await this.rollback(scenario[j]);
                    this.store = null;
                    break;
                } else{
                    let storeAfter = this.store;
                    this.logs.push({ ...step, storeBefore, storeAfter, error: {name: e.name, message: e.message, stach: e.stack}});
                }
            }
        }
    }

    isValidScenario(scenario){
        if(!Array.isArray(scenario)) throw new Error(`input data must be an array!`);
        for(let step of scenario) {
            if(typeof step !== 'object') throw new Error('property is not an object!')
            Validate.validate(step, this.form);
        }
        let setOfIndexes = new Set(scenario.map(step => step.index).filter(i => i >= 0));
            if(setOfIndexes.size !== scenario.length) throw new Error(`-index- value must be POSITIVE and UNIQUE!`);
            scenario.sort((curr, next) => {return curr.index > next.index ? 1:-1});
            let last = scenario[scenario.length-1];
            if(last.index !== scenario.length) throw new Error(`-indexes- must be 1,2,3...`);
            if(last.hasOwnProperty('restore')) throw new Error(`-restore- method should not be in the last step!`);
    }

    async rollback(step){
        if(step.restore){
            try{
                await step.restore(this.store);
            }catch(e){
                throw e;
            }
        }
    }   
}