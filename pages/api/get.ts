import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  try {
    const client = new MongoClient(
      'mongodb+srv://storeadmin:UnBVOgQBHy0bRRok@cluster0.bxrilfs.mongodb.net/eshop'
    );
    await client.connect();

    const collection = client.db().collection('items');
    const result = await collection.find().toArray();

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    process.exit();
  }
}
