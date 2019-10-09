import mongodb from 'mongodb';

const { MongoClient } = mongodb;
const db = MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true }).then(client => client.db());

export default db;
export const collections = {
	users: db.then(x => x.collection('users'))
};
