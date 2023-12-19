import {useState} from 'react';
function formatDateTimeFromTicks(nTicks){
    //'nTicks' = number of milliseconds since midnight of January 1, 1970
    //RETURN:
    //      = Formatted date/time
    var tmLoc = new Date();
    return new Date(nTicks-tmLoc.getTimezoneOffset()*60000).toLocaleString();
}
const MessageCard = ({message, editLikeCount, deleteMessage}) => {
    const [likes, setLikes] = useState(0);
    const likesStr = message?.likes > 1 ? `${message.likes} likes` 
                : message?.likes === 1 ? `${message.likes} like`
                : "";
    return(
        <div className = "card message">
            <div className = "card-body">
                <h5>{message.messageText}</h5>
                <p> {formatDateTimeFromTicks(message.createdAt)}</p>
                <button onClick={() => editLikeCount(message.id, message.likes)}>
                    <img
                        src={require("./facebook_like_thumb.png")}
                        style={{ width: '20px', height: '20px' }} 
                    />
                </button>
                <button onClick={() => deleteMessage(message.id,)} style ={{ marginLeft: '10px'}}>
                    <img
                        src={require("./download.png")}
                        style={{width: '20px', height: '20px' }} 
                    />
                </button>
            </div>
            {message.likes>0 && <div className="card-footer liked">{likesStr}</div>}
        </div>
    )
}
export default MessageCard;