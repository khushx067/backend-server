const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://koratnimesh30:Nimesh123@cluster0.ayot4f5.mongodb.net"; // Replace with your MongoDB Atlas URI
const client = new MongoClient(uri);

async function listDatabases() {
  try {
    await client.connect();
    const databases = await client.db().admin().listDatabases();
    databases.databases.forEach((db) => console.log(`- ${db.name}`));
  } catch (error) {
    console.log(error.message);
  }
}

async function listCollections(dbName) {
  try {
    await client.connect();
    const collections = await client.db(dbName).listCollections().toArray();
    console.log(`Collections in ${dbName}:`);
    collections.forEach((col) => console.log(`- ${col.name}`));
  } finally {
    await client.close();
  }
}

// Call functions
listDatabases();
listCollections("Sensor"); // Uncomment and replace "yourDB" with your database name
