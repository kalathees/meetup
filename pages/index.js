import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';


function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   };
// }

export async function getStaticProps() {
  // fetch data from an API




  const client = await MongoClient.connect(
    'mongodb+srv://kalathees:GXxFahIYi9iUKFCf@cluster0.apmdz.mongodb.net/mydb?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups=await meetupsCollection.find().toArray();
  console.log(meetups)
    client.close();
  return {
    props: {
      meetups: meetups.map(item=>({
          title:item.title,
          address:item.address,
          image:item.image,
          description:item.description,
          id:item._id.toString()
      }))
    },
    revalidate: 1
  };
}

export default HomePage;
