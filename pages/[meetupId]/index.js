import MeetupDetail from '../../components/meetups/MeetupDetail';
import {MongoClient, ObjectId} from 'mongodb'


function MeetupDetails(props) {
  return (
    <MeetupDetail
    image={props.meetupData.image}
    title={props.meetupData.title}
    address={props.meetupData.address}
    description={props.meetupData.description}
    />
  );
}

export async function getStaticPaths() {

  const client = await MongoClient.connect(
    'mongodb+srv://kalathees:GXxFahIYi9iUKFCf@cluster0.apmdz.mongodb.net/mydb?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const selectedMeetup=await meetupsCollection.find({},{_id:1}).toArray()
  return {
    fallback: false,
    paths:selectedMeetup.map(meetup=>(
      {params:{meetupId:meetup._id.toString()}

    }))

}
}

export async function getStaticProps(context) {
  // fetch data for a single meetup
  const meetupId = context.params.meetupId;


  const client = await MongoClient.connect(
    'mongodb+srv://kalathees:GXxFahIYi9iUKFCf@cluster0.apmdz.mongodb.net/mydb?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const selectedMeetup=await meetupsCollection.findOne({_id:ObjectId(meetupId)})

    client.close();

  console.log(meetupId);

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
}
}

export default MeetupDetails;
