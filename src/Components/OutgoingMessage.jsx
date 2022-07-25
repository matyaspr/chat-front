import { dateHelper } from "../Helpers/DateHelper"


export const OutgoingMessage = ({ message }) => {
    
    console.log('msg: ', message)
    
    return (
        <div className="outgoing_msg">
                {/* <!-- Mensaje enviado inicio --> */}
            <div className="sent_msg">
                <p>{ message.message }</p>
                <span className="time_date"> 
                { dateHelper(message.createAt) }
                </span>
            </div>
        </div>
    )
}
