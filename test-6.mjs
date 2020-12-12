// case 6: scenario with SILENT property. throws an error on the 2nd step BUT there's silent property set to TRUE. 
// Which means this step is not important, so transaction continues. transaction is successful
import Transaction from './transaction/index.mjs'
const scenario = [
    {
        index: 1,
        meta: {
            title: 'valid',
            description: 'increases number by 1, restores by decreasing by 2'
        },
        call: async (store) => {
            store.num = 0;
            store.num ++;
        },
        restore: async (store) => {
            store.num -=2;
         }
    },
    {
        index: 2,
        meta: {
            title: 'not valid',
            description: 'doesn\'t have restore'
        },
        call: async (store) => {
            //console.log(store.num);
            throw new Error('vnaxot aba');
        },
        silent: true
    },
    {
        index: 3,
        meta: {
            title: 'valid',
            description: 'doesn\'t have restore()'
        },
        call: async (store) => {
            store.num ++;
        }
    }
];

const transaction = new Transaction();

(async() => {
    try {
        await transaction.dispatch(scenario);
        const store = transaction.store; // {} | null
        const logs = transaction.logs; // []
        console.log('================================= ');
        console.log('LOGS:', logs);
        console.log('================================= ');
        console.log('STORE:', store);
    } catch (err) {
        console.log(err);
    }
})();