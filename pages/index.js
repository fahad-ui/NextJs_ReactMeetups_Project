import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import { Fragment } from "react";

// const DUMMY_MEETUPS = [
//   {
//     id: 'm1',
//     title: "A first Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg",
//     address: "Some address 5,12345 City",
//     description: "This is first Meetup",
//   },
//   {
//     id: 'm2',
//     title: "A Second Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg",
//     address: "Some address 15,123451212 City",
//     description: "This is Second Meetup",
//   },
//   {
//     id: 'm3',
//     title: "A Third Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg",
//     address: "Some address 32,345121 City",
//     description: "This is a third Meetup",
//   },
// ];

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title> 
        {/*this will be shown on tab */}
        <meta name="description" content="Browse a huge list of highly active React meetups"/>
        {/* this will be shown when user searches our page on google and description will be show be to our page link [search engine]*/}
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const req = context.req
//   const res = context.res

//   //fetch data from an API

//   return {
//     props: {
//       meetups:DUMMY_MEETUPS
//     }
//   }
// }

//this works only in pages,not in components
//getStaticProps is reserved name
export async function getStaticProps() {
  //fetch data from API
  const client = await MongoClient.connect(
    "mongodb+srv://fahadullakhan24:P18IW21S0021@cluster0.6apneoo.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      //we are mapping because because from monodb we are getting an id whic is of object+string[not supported]
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    }, //this props will be recieved above by HOMEPAGE
    revalidate: 10, //regenerate data after every 10 seconds if there are request coming in, and this will replace the old generated pages,
    //this helps because we dont need to rebuild after deployment, if there is some new upcoming data from server
  };
}
//we are moving data fetching away from the client to the server side, [it will be pre-rendered]
// we can view under View page source

export default HomePage;
