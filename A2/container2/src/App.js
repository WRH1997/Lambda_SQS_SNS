import logo from './logo.svg';
import './App.css';
import { initializeApp } from "firebase/app";
import { addDoc, doc, getFirestore, setDoc, Timestamp, updateDoc } from "firebase/firestore";
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

const ValidateUser = async (event) => {
  event.preventDefault();
  let name = event.target.name.value;
  let pass = String(event.target.pass.value);
  let data = null;
  let status = null;
  var now = Timestamp.fromDate(new Date());
  /*CITATION NOTE:
  The following code used to retreive and map all documents in a Firestore collection
  in React was adapted from the following source.
  URL: https://www.freecodecamp.org/news/how-to-use-the-firebase-database-in-react/
  */
  await getDocs(collection(db,"Reg")).then((snapshot)=>{
    data = snapshot.docs.map((doc) => ({id:doc.id, ...doc.data()}));
  }).then(async()=> {
    for(var i=0; i<data.length; i++){
      if(name.trim().toLowerCase()==data[i]['Name'].trim().toLowerCase()){
        if(pass==data[i]['Password']){
          /*CITATION NOTE:
          The following code used to updated a specific, existing document in a 
          Firestore collection in React was adapted from the following source.
          URL: https://stackoverflow.com/questions/56406406/javascript-date-to-firestore-timestamp
          */
          await updateDoc(doc(db, "state", name), {
            OnlineStatus: true,
            LastUpdated: now
          });
          await updateDoc(doc(db, "Session", "currSession"), {
            Name: name
          });
          alert("Log In Successful!\nRedirecting to Home Page....");
          window.location.href = 'https://container3-civ3vqnmnq-uc.a.run.app';
          return;
        }
        alert("Error: Incorrect password!\nPlease verify your password and try again!");
        return;
      }
    }
    alert("Error: Username not registered!\nMake sure you are typing in your name correctly!");
    return;
  })
}


const App = () => {
  return(
    <body>
    <center>
      <div class='form-div' id='form-div'>
      <h4><u>Log In</u></h4>
        <form onSubmit={ValidateUser}>
          <label for="name" class='form-lbl'>Name: </label>
          <input type="text" class='name' name='name'></input>
          <br></br><br></br>
          <label for='pass' class='form-lbl'>Password: </label>
          <input type="password" class='pass' name='pass'></input>
          <br></br><br></br>
          <center>
            <button class='submit' type='submit'><b>Log In</b></button>
          </center>
        </form>
      </div>
    </center>
  </body>
  );
}

export default App;
