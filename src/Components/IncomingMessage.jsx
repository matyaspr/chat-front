import { dateHelper } from "../Helpers/DateHelper"


export const IncomingMessage = ({ message }) => {
    
    console.log('msgIncoming: ', message)
    
    return (
        
        <div className="incoming_msg">
            {/* <!-- Mensaje recibido Inicio --> */}
            <div className="incoming_msg_img">
                <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
            </div>
            <div className="received_msg">
                <div className="received_withd_msg">
                    <p>{ message.message }</p>
                    <span className="time_date">
                        { dateHelper(message.createAt) }
                    </span>
                </div>
            </div>
        </div>
    


    )
}
