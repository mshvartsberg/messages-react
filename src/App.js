import {useState, useEffect} from 'react';
import MessageCard from './MessageCard';
import { db } from './db'
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "@firebase/firestore";
import './App.css';

// const init_messages = [
//   {"createdAt": 1701139714788,
//    "createdBy": "Anonymous User",
//    "likes": 2,
//    "messageText": "New"}, 
//   {"createdAt": 1701140450909,
//    "createdBy": "Anonymous User",
//    "likes": 0,
//    "messageText": "Message 2"}]

const App = () => {
    // const myStyles = {
    //   marginTop: '50px',
    //   width: '50%',
    //   height: 'auto',
    // }
    const containerStyles = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    };
    const formStyles = {
      width: '50%', // Adjust the width of the form as needed
      textAlign: 'center', // Center the content horizontally
    };
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState("");
    const [refreshCount, setRefreshCount] = useState(0);

    const MessagesCollectionRef = collection(db, "messages");

    useEffect(() => {
        const getMessages = async () => {
          const data = await getDocs(MessagesCollectionRef);
          setMessages(handleSort((data.docs.map((elem) => ({ ...elem.data(), id: elem.id }))), -1));
        }
        getMessages();
    }, [refreshCount])

    function getCurrentTimeUTC()
    {
        //RETURN:
        //      = number of milliseconds between current UTC time and midnight of January 1, 1970
        var tmLoc = new Date();
        //The offset is in minutes -- convert it to ms
        return tmLoc.getTime() + tmLoc.getTimezoneOffset() * 60000;
    }
    const saveMessage = async (newMessageText) => {
      await addDoc(MessagesCollectionRef, 
        {
          createdAt: getCurrentTimeUTC(),
          createdBy: "Anonymous User",
          likes: 0,
          messageText: newMessageText
        })
      setRefreshCount(refreshCount + 1);
      //window.location.reload();
    }
    const editLikeCount = async (id, likes) => {
      const messageDoc = doc(db, "messages", id)
      const newLikes = { likes: likes + 1 }
      await updateDoc(messageDoc, newLikes)
      setRefreshCount(refreshCount + 1);
    }
    const deleteMessage = async (id) => {
      const messageDoc = doc(db, "messages", id)
      await deleteDoc(messageDoc)
      setRefreshCount(refreshCount + 1);
    }
    // when submit button is pressed:
    function handleSubmit(e) {
      e.preventDefault();
      var form = document.getElementById('messageForm'); 
      form.classList.add('was-validated');
      if (form.checkValidity() === false) {
          e.stopPropagation();
          return;
        }
      // Get message value, save message and reset the form
      saveMessage(messageText);
      alert("Thank you, your message was posted");
      form.reset();
      form.classList.remove('was-validated');
    }
    function handleSort (messages, sortOrder=1) {

      if ((sortOrder !== 1 && sortOrder !== -1) || !messages)
          return messages;
      function compare ( a, b ) {
          if ( a.createdAt < b.createdAt ){
            return -1*sortOrder;
          }
          if ( a.createdAt > b.createdAt ){
            return 1*sortOrder;
          }
          return 0;
        }
        
        return messages.sort( compare );
    }
   
    return (
        <div className ="app" style={containerStyles}>
            <h1>Welcome Users!</h1>
            <form className="container needs-validation" id="messageForm" style={formStyles} novalidate onSubmit={handleSubmit}>
              <div className="form-row"><center><b>
                <label htmlFor="message">Post Your Message:</label>
                <input required maxlength="128"
                  placeholer="Enter Your Message"
                  onChange={e => setMessageText(e.target.value)}
                  type="text"
                  id="message"
                /></b></center>
              </div>
              <button type="submit" class="btn btn-primary" style={{marginTop: '15px', marginBottom: '20px'}}>Submit</button>
            </form>
            <h2>Messages:</h2>
            {
                messages?.length > 0 ? (
                  <div className='container'>
                      {messages.map((message) => (<MessageCard key={message.id} message={message} editLikeCount={editLikeCount} deleteMessage={deleteMessage}/>))}
                  </div>
                ):(
                  <div><h2>No messages.</h2></div>
                )       
            }
        </div>    
    );
}

export default App;