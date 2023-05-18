import { MongoClient } from 'mongodb'


async function handler(req,res) {
   if(req.method === 'POST') {
    const data = req.body;

   // const {title,image,address,description} = data
   

   const client = await MongoClient.connect('mongodb+srv://fahadullakhan24:P18IW21S0021@cluster0.6apneoo.mongodb.net/meetups?retryWrites=true&w=majority')
   const db = client.db();

   const meetupsCollection = db.collection('meetups');

   const result = await meetupsCollection.insertOne(data);

  // console.log(result);

   client.close();


   res.status(201).json({message: 'Meetup inserted'})
   }
}

export default handler;