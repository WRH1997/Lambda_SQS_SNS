import logo from './logo.svg';
import './App.css';
import { initializeApp } from "firebase/app";
import { addDoc, doc, getFirestore, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import React, {useEffect, useState} from 'react';
import creds from './credentials.json';

class App extends React.Component{
  
  state = {
    currentUser: "",
    allUsers: []
  }

  fetchData = async() => {
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
    /*CITATION NOTE:
    The following code used to retreive and map all documents in a Firestore collection
    in React was adapted from the following source.
    URL: https://www.freecodecamp.org/news/how-to-use-the-firebase-database-in-react/
    */
    await getDocs(collection(db, "Session")).then((snapshot)=>{
      let data = snapshot.docs.map((doc) => ({id:doc.id, ...doc.data()}));
      this.setState({currentUser:data[0]['Name']});
    })
    await getDocs(collection(db,"state")).then((snapshot)=>{
      let onlineUsers = [];
      let states = snapshot.docs.map((doc) => ({id:doc.id, ...doc.data()}));
      for(var x=0; x<states.length; x++){
        if(states[x]['OnlineStatus']==true){
          onlineUsers.push(states[x]['id']);
        }
      }
      this.setState({allUsers: onlineUsers});
    });
  }
 

  componentDidMount(){
    this.fetchData();
  }
  
  Logout = async () => {
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
    var now = Timestamp.fromDate(new Date());
    /*CITATION NOTE:
    The following code used to updated a specific, existing document in a 
    Firestore collection in React was adapted from the following source.
    URL: https://stackoverflow.com/questions/56406406/javascript-date-to-firestore-timestamp
    */
    await updateDoc(doc(db, "state", this.state.currentUser), {
      OnlineStatus: false,
      LastUpdated: now
    });
    await updateDoc(doc(db, "Session", "currSession"),{
      Name:"$$$"
    });
    alert("Successfully Logged out!\nRedirecting to Registration Page...");
    window.location.href = 'https://container1-civ3vqnmnq-uc.a.run.app';
  }

  render(){
    return(
      <center>
        <div class='currUser' className='currUser'>
          <b>Hi, {this.state.currentUser}, you are logged in!</b>
          <br></br><br></br>
          <input type='button' class='logout' value='Log out' onClick={this.Logout}></input>
          <br></br><br></br><br></br>
          <u>Other Users That Are Online:</u>
          <ul>
          {this.state.allUsers.map((user) => (
            <li><i>{user}</i></li>
          ))}
          </ul>
        </div>
      </center>
    )
  }
}

export default App;
