# Users API
Use this API to fetch all user related data without authorization. For example fetch a user profile without logging in.

### Get All User Profiles
##### Description
This API will retrieve all user profiles data from database. The API response presented as an array of JSON objects. This API **does not** need any authorization.
- Use case:
    - A visitor able to see registered user profile without logging in.

##### HTTP Request Endpoint
>`GET` `ROOT_ENDPOINT/users`

##### HTTP Response
```json
[
    {
        "uid": "v6LIjt3RaqiAFzJvJkRVT9ZcP",
        "first_name": "Faiz",
        "last_name": "Ainur Rofiq",
        "email": "faiz.ainur@ui.ac.id",
        "email_verified": false,
        "gender": "Male",
        "profession": "Software Developer",
        "phone_number": "082165198495",
        "photo_url": "",
        "address_line_1": "Depok",
        "address_line_2": "Depok",
        "postal_code": 16436,
        "city": "Depok",
        "province": "Jawa Barat",
        "country": "Indonesia",
        "join_date": "2020-10-17T09:07:48.515Z"
    },
    {
        "uid": "YSrOtatKoaYAUz1jwV6DdLrhUVC3",
        "first_name": "John Don",
        "last_name": "Doe",
        "email": "john@dow.com",
        "email_verified": false,
        "gender": "Male",
        "profession": "",
        "phone_number": "0866666666",
        "photo_url": "",
        "address_line_1": "",
        "address_line_2": "",
        "postal_code": 16400,
        "city": "Jakarta",
        "province": "DKI Jakarta",
        "country": "Indonesia",
        "join_date": "2020-10-18T03:20:46.860Z"
    }
]
```

### Get User Profile By User UID
##### Description
This API will retrieve user profile data based on the provided User UID in the URL parameter.

##### HTTP Request Endpoint
>`GET` `ROOT_ENDPOINT/users/profile/:userUid`
- ###### URL Example
`GET` `https://api-jalanmimpi.herokuapp.com/v1/users/profile/YSrOtatKoaYAUz1jwV6DdLrhUVC3`


##### HTTP Response
```json
{
    "uid": "YSrOtatKoaYAUz1jwV6DdLrhUVC3",
    "first_name": "John Don",
    "last_name": "Dow",
    "email": "john@dow.com",
    "email_verified": false,
    "gender": "Male",
    "profession": "",
    "phone_number": "0866666666",
    "address_line_1": "",
    "address_line_2": "",
    "postal_code": 16400,
    "city": "Jakarta",
    "province": "DKI Jakarta",
    "country": "Indonesia",
    "join_date": "2020-10-18T03:20:46.860Z"
}
```

