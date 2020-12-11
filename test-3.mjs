// case 3: error occurres because of repeated index.
import Transaction from './transaction/index.mjs'
const scenario = [
    {
        index: 1,
        meta: {
            title: 'first title',
            description: 'first description'
        },
        call: async (store) => {
            store.first = '1';
        },
    },
    {
        index: 1,
        meta: {
            title: '1.2 title',
            description: '1.2 Description'
        },
        call: async (store) => {
            store.second = '1.2';
        },
    },
    {
        index: 2,
        meta: {
            title: 'second title',
            description: 'second Description'
        },
        call: async (store) => {
            store.third = '2';
        },
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