const mongoose = require('mongoose');

const { MONGO_ID, MONGO_PASSORD, NODE_ENV } = process.env;
const MONGO_URL = 'mongodb://${MONGO_ID}:${MONGO_PASSWORD}@localhost:27017/admin';

const connect = () => {
    if (NODE_ENV !== 'production') {
        mongoose.set('debug', true);
    };

    mongoose
        .connect('mongodb://localhost:27017/mydb', {
            dbName: 'apigenerator',
        })
        .then(() => {
            console.log('DB 연결 성공');
        })
        .catch((err) => {
            console.error('DB 연결 실패:', err);
        });
};

mongoose.connection.on('error', (error) => {
    console.error('mongodb connection error', error);
});

mongoose.connection.on('disconnected', () => {
    console.error('mongodb connection disconnected, trying to reconnect');
    connect();
});

module.exports = connect;