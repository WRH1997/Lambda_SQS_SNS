import './App.css';
import { initializeApp } from "firebase/app";
import { addDoc, doc, setDoc, getFirestore, Timestamp } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

const creds = require('./credentials.json');
let apiKey = creds['apiKey'];
let authDomain = creds['authDomain'];
let projectId = creds['projectId'];
let storageBucket = creds['storageBucket'];
let messagingSenderId = creds['messagingSenderId'];
let appId = creds['appId'];
let measurementId = creds['measurementId'];

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const ReadFromFS = async(event) => {
  event.preventDefault();
  let name = event.target.name.value;
  let email = event.target.email.value;
  let pass = String(event.target.pass.value);
  let location = event.target.location.value;
  let data = null;
  /*CITATION NOTE:
  The following code used to retreive and map all documents in a Firestore collection
  in React was adapted from the following source.
  URL: https://www.freecodecamp.org/news/how-to-use-the-firebase-database-in-react/
  */
  await getDocs(collection(db,"Reg")).then((snapshot)=>{
    data = snapshot.docs.map((doc) => ({id:doc.id, ...doc.data()}));
  })
  for(var i=0; i<data.length; i++){
    if(name.trim().toLowerCase()==data[i]['Name'].trim().toLowerCase()){
      alert("\nError: [Names must be unique]\n\nThe name you have chosen is already in use. Please try another name!");
      return;
    }
  }
  alert("Registration Successful!\nRedirecting to login page....");
  /*CITATION NOTE:
  The following code used to create a document in a Firestore collection 
  in React was adapted from the following source.
  URL: https://www.freecodecamp.org/news/how-to-use-the-firebase-database-in-react/
  */
  try{
    await addDoc(collection(db, "Reg"), {
      Name: name,
      Email: email,
      Password: pass,
      Location: location
    });
    /*CITATION NOTE:
    The following code used to updated a specific, existing document in a 
    Firestore collection in React was adapted from the following source.
    URL: https://stackoverflow.com/questions/56406406/javascript-date-to-firestore-timestamp
    */
    var now = Timestamp.fromDate(new Date());
    await setDoc(doc(db, "state", name), {
      OnlineStatus: false,
      LastUpdated: now
    });
  }
  catch(e){
    console.error(e);
    alert("Error: There was an issue uploading your data to Firstore: " + e);
  }
  window.location.href = 'https://container2-civ3vqnmnq-uc.a.run.app';
}


const App = () => {
  return (
    <body>
      <center>
        <div class='form-div' id='form-div'>
        <h4><u>Registration Form</u></h4>
          <form onSubmit={ReadFromFS}>
            <label for="name" class='form-lbl'>Name: </label>
            <input type="text" class='name' name='name'></input>
            <br></br><br></br>
            <label for='email' class='form-lbl'>Email: </label>
            <input type='text' class='email' name='email'></input>
            <br></br><br></br>
            <label for='pass' class='form-lbl'>Password: </label>
            <input type="password" class='pass' name='pass'></input>
            <br></br><br></br>
            <label for='location' class='form-lbl'>Location: </label>
            <input type="text" class='location' name='location'></input>
            <br></br><br></br>
            <center>
              <button class='submit' type='submit'><b>Submit</b></button>
            </center>
          </form>
        </div>
      </center>
    </body>
  );
}
export default App;