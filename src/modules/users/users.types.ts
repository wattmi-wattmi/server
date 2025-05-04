import {Genders} from "@src/modules/users/users.constants";

export interface User_Search_Query_Interface {
    search? : string;
    page? : string;
    limit? : string;
    gender? : Gender_Type;
}

export interface Formatted_User_Search_Query_Interface {
    search : string;
    page : number;
    limit : number;
    gender : Gender_Type | '';
}


export type Gender_Type = typeof Genders[keyof typeof Genders];
