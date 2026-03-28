export interface Paginatee 
{    
    pages: {
        loading: boolean
        current_page: number,
        has_next_page: boolean,
        has_previous_page: boolean,
        no_of_pages: number,
        per_page: number,
        total_page: number
    }
}