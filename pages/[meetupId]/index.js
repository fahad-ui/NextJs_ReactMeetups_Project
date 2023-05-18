import { MongoClient,ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { Fragment } from "react";
import Head from 'next/head'

function MeetupDetails(props) {//we are getting this props from get static props
  return (
    <Fragment>
    <Head>
      <title>{props.meetupData.title}</title> 
      {/*this will be shown on tab */}
      <meta name="description" content={props.meetupData.description}/>
      {/* this will be shown when user searches our page on google and description will be show be to our page link [search engine]*/}
    </Head>
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  </Fragment>




    
  );
}

export async function getStaticPaths() { 
  const client = await MongoClient.connect(
    "mongodb+srv://fahadullakhan24:P18IW21S0021@cluster0.6apneoo.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray(); //only fetch id's

  client.close()

  return {
    fallback: false, //false means to indicate that we have defined all supported paths here , we get 404 error if user goes to some unknown id in URL /m5
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  //fetch data for a single meetup
  const meetupId = context.params.meetupId; //meetupId is the identifier that we have used between square brackets[we have created folder]
  

  const client = await MongoClient.connect(
    "mongodb+srv://fahadullakhan24:P18IW21S0021@cluster0.6apneoo.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: (new ObjectId(meetupId)),
  })

  console.log(selectedMeetup)

  client.close()

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image:selectedMeetup.image,
        description:selectedMeetup.description
      }
    },
  };
}

export default MeetupDetails;
