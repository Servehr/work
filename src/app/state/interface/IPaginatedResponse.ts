export interface IPaginatedResponse 
{
    "status": number,
    "success": boolean,
    "message": string,
    "data": {
        "current_page": number,
        "data": [
            {}
        ],
        "first_page_url": string,
        "from": number,
        "last_page": number,
        "last_page_url": string,
        "links": [
            {
                "url": string | null,
                "label": string,
                "active": boolean
            }
        ],
        "next_page_url": string | null,
        "path": string,
        "per_page": number,
        "prev_page_url": string | null,
        "to": number,
        "total": number
    },
    "plus": {} | [] | [{}] | null | string
}

// "data": [
//     {
//         "id": number,
//         "firstname": string,
//         "surname": string,
//         "phone_number": string,
//         "alternate_phone_number": string | null,
//         "email": string,
//         "employee_id": string,
//         "department_id": number,
//         "user_type_id": number,
//         "status": string,
//         "dob": string,
//         "gender": string,
//         "marital_status": string,
//         "country_id": number,
//         "capital_id": number,
//         "address": string,
//         "online": number,
//         "onborded_by": number,
//         "first_timer": number,
//         "email_verified_at": string,
//         "api_token": string | null,
//         "image_path": string | null,
//         "image": string | null,
//         "deleted_at": string | null,
//         "created_at": string,
//         "updated_at": string
//     }
// ],