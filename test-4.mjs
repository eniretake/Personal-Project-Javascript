// case 4: error occurres because of invalid input.
import Transaction from './transaction/index.mjs'
const scenario = [
    {
        index: '1',
        meta: {
            title: 'first title',
            description: 'first description'
        },
        call: async (store) => {
            store.first = '1';
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