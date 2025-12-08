const { MongoClient, ObjectId } = require("mongodb");

const MONGO_URI = "mongodb://127.0.0.1:27017";
const DB_NAME = "todoapp";
const COLLECTION = "todos";

const client = new MongoClient(MONGO_URI);

async function connect() {
    if (!client.topology?.isConnected()) {
        await client.connect();
        console.log("MongoDB Connected");
    }
    return client.db(DB_NAME);
}

async function createOne(doc) {
    const db = await connect();
    const res = await db.collection(COLLECTION).insertOne({
        ...doc,
        status: "pending"
    });
    return res.insertedId;
}

async function findAll() {
    const db = await connect();
    return db.collection(COLLECTION).find({}).toArray();
}

async function findById(id) {
    const db = await connect();
    return db.collection(COLLECTION)
        .findOne({ _id: new ObjectId(id) });
}

async function updateById(id, updatePayload) {
    const db = await connect();
    return db.collection(COLLECTION).updateOne(
        { _id: new ObjectId(id) },
        { $set: updatePayload }
    );
}

async function deleteById(id) {
    const db = await connect();
    return db.collection(COLLECTION)
        .deleteOne({ _id: new ObjectId(id) });
}

async function close() {
    await client.close();
}

module.exports = {
    connect,
    createOne,
    findAll,
    findById,
    updateById,
    deleteById,
    close
};
