import { Schema, model, Types } from 'mongoose';

interface IUser {
    tg_id : number;
    first_name: string;
    username: string;
    registered_name : string;
    lang : string ;
    phone_number: string;
    stream : string;
    school : string ;
    registered : number;
    isInvitedBy : number ;
    invited : number[] ;
    payed : number[] ;
    points : number ;
    credited :number ;
}

const userSchema = new Schema<IUser>(
    {  
        tg_id : Number,
        first_name: String,
        username: String,
        registered_name : String,
        lang : String ,
        phone_number: String,
        stream : String,
        school : String ,
        registered : {type:Number , default : -1},
        isInvitedBy : Number,
        invited : [Number] ,
        payed : [Number] ,
        points : Number,
        credited :Number
    }
);


interface IFeedback {
    indexx : number;
    first_name: string;
    typ : String ;
    text : string ;

}

const feedbackSchema = new Schema<IFeedback>(
    {  
        indexx : Number,
        first_name: String,
        typ : String,
        text : String,
    }
);


export const FeedbackData = model<IFeedback>('FeedbackData', feedbackSchema);
export const UserDB = model<IUser>('UserDB', userSchema);
