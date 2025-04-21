
export interface Pagination_Interface {

}
export interface Response_Interface<T> {
    data : T | null;
    message : string;
    success : boolean;
    pagination : null | Pagination_Interface;
    error : Error | null | unknown[] | undefined;
}