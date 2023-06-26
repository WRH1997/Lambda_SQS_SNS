/*//https://kavitmht.medium.com/crud-with-firestore-using-the-node-js-sdk-c121ede57bcc
const fs = require('firebase-admin');
const serviceAccount = require('./b00919848-serverless-firebase-adminsdk-ou328-39749fa47c.json');
fs.initializeApp({
    credential: fs.credential.cert(serviceAccount)
});


//https://kavitmht.medium.com/crud-with-firestore-using-the-node-js-sdk-c121ede57bcc
const db = fs.firestore();
const userRef = db.collection("Reg");
userRef.get().then((snapshot) => {
    const data = snapshot.docs.map((doc)=>({
        id: doc.id,
        ...doc.data(),
    }));
    console.log(data);
});


//https://dev.to/retool/crud-with-firestore-using-the-node-js-sdk-anp
 */;