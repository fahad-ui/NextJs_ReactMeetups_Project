import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import { Fragment } from "react";
import Head from "next/head";

//enteredMeetupData which we are getting from newMeetupForm.js
function NewMeetupPage() {
  const router = useRouter();


  async function addMeetupHandler(enteredMeetupData) {
    const response = await fetch('/api/new-meetup',{
      method:'POST',
      body:JSON.stringify(enteredMeetupData),
      headers:{
        'Content-Type':'application/json'
      }
    })

    const data = await response.json()

    router.push('/')
  };


  return(
    <Fragment>
    <Head>
      <title>Add a new meetup</title> 
      {/*this will be shown on tab */}
      <meta name="description" content="Add your new meetups and create amazing networking opportunities"/>
      {/* this will be shown when user searches our page on google and description will be show be to our page link [search engine]*/}
    </Head>
    <NewMeetupForm onAddMeetup={addMeetupHandler}/>
  </Fragment>
)}

export default NewMeetupPage;
