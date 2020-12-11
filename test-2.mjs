//case 2: scenario contains 4 steps. Last step throws an error and so does restore function at index 2. rollback was unsuccessful.
import Transaction from './transaction/index.mjs'

const scenario = [
    {
        index: 1,
        meta: {
            title: 'valid',
            description: 'increases number by 1, restores by decreasing by 4'
        },
        call: async (store) => {
            store.num = 0;
            store.num ++;
        },
        restore: async (store) => {
            store.num -=4;
        }
    },
    {
        index: 2,
        meta: {
            title: 'valid',
            description: 'has restore method'
        },
        call: async (store) => {
            store.num ++;
        },
        restore: async (store) => {
            throw new Error('unda amoagdos error');
        }
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
    },
    {
        index: 4,
        meta: {
            title: 'throws an error',
            description: 'begins rollback'
        },
        call: async (store) => {
            store.num ++;
            throw new Error()
        }
    }
];

const transaction = new Transaction();
(async () => {
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