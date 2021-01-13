// You can safely remove the initialization of the connectionManager object once you have selected an ORM to use
const mongoose = require('mongoose');
let connectionManager = {
    getConnection: () => {
        mongoose
            .connect("mongodb://192.168.1.112:27017/gripinvest-vikas", {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false
            })
            .then(() => console.log('DB connection successful!')).catch((err) => console.log(`Mongo Error ${err.message}`));
    }, clearDatabase: () => { }, closeConnection: () => { }
};

module.exports = connectionManager;
