export interface Poll{
    id:string;
    question : string;
    totalVotes : number;
    options : Option[];
}

export interface Option {
    id : string;
    title : string;
    votes : number;
}