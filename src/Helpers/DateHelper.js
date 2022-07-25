import moment from "moment";




export const dateHelper = ( fecha ) => {
    const date = moment( fecha );

    return date.format( "HH:mm a | MMMM Do" );
}
 
