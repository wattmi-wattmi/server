export interface Pagination_Interface {
    page: number;
    total_pages: number;
    total_items: number;
}

export interface Response_Interface<T> {
    data: T | null;
    message: string;
    success: boolean;
    pagination: null | Pagination_Interface;
    token: null | string;
    error: Error | null | unknown[] | undefined;
}