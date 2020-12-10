import Transaction from './transaction/index.mjs'
const scenario = [
    {
        index: 1,
        meta: {
            title: 'Read popular customers 1',
            description: 'This action is responsible for reading the most popular customers 1'
        },
        // callback for main execution
        call: async (store) => {},
        // callback for rollback
        restore: async (store) => {}
    },
    {
        index: 2,
        meta: {
            title: 'Read popular customers 2',
            description: 'This action is responsible for reading the most popular customers 2'
        },
        // callback for main execution
        call: async (store) => {},
        // callback for rollback
        restore: async (store) => {}
    }
];

const transaction = new Transaction();

(async() => {
    try {
        await transaction.dispatch(scenario);
        // const store = transaction.store; // {} | null
        // const logs = transation.logs; // []
        // console.log(store);
        // console.log(logs);
    } catch (err) {
        // log detailed error
        console.log(err);
    }
})();