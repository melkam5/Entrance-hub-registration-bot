export interface UserDataInterface {
    id? : string;
    tg_id :number;
    first_name: string | null;
    username: string | null;
    registered_name: string | null;
    lang : string | null;
    phone_number: string | null;
    stream: string | null;
    school : string | null;
    payed : number ;
    points : number ;
    credited :number ;
} 




export interface RefferalInterface {
    invited : number;
    payed : number;
}
