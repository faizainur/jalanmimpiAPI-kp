# Donation API

Use this API for create, read, and update operation regarding donation data.

### List All Donations

##### Description

This API will retrieve a list of donations in a form of array of JSON objects. The API only fetch a donation data with `Ongoing` status.

##### HTTP Request Endpoint

> `GET` `ROOT_ENDPOINT/donation/list`

##### HTTP Request Query Strings

| Field  | Value                                              | Description                           |
| ------ | -------------------------------------------------- | ------------------------------------- |
| limit  | `INTEGER`                                          | `OPTIONAL` Default value is 10        |
| offset | `INTEGER`                                          | `OPTIONAL` Default value is 0         |
| status | `Ongoing` or `Closed` or `Completed` or `Rejected` | `OPTIONAL` Default value is `Ongoing` |

- Example:
  - Without: </br>
    `GET` `https://api-jalanmimpi.herokuapp.com/v1/donation/list`
  - With: </br>
    `GET` `https://api-jalanmimpi.herokuapp.com/v1/donation/list?limit=10&offset=0&status=Ongoing`

##### HTTP Response

```json
[
  {
    "donation_id": "ypI4SjK8KE5Mlx4kqfZB6H6Hx",
    "creator_uid": "YSrOtatKoaYAUz1jwV6DdLrhUVC3",
    "creator_name": "John Don Dow",
    "title": "Bantu Saya Skripsi",
    "description": "Bantu saya skripsi dong",
    "target_nominal": 1000000,
    "img_url": "",
    "status": "Ongoing"
  },
  {
    "donation_id": "GKx4SWGWn1uNlZDAFGfvKZ9mE",
    "creator_uid": "v6LIjt3RaqiAFzJvJkRVT9ZcP",
    "creator_name": "John Doe",
    "title": "Bantu Saya Skripsi V2",
    "description": "Tema riset skripsi berkaitan dengan implementasi blockhain sebagai metode data sharing",
    "target_nominal": 10000000,
    "img_url": "",
    "status": "Ongoing"
  }
]
```

### Get Donation Details

##### Description

Retrive donation details data from database based on the provided donation id.

##### HTTP Request Endpoint

> `GET` `ROOT_ENDPOINT/donation/details`

##### HTTP Request Query String

| Field      | Value    | Description |
| ---------- | -------- | ----------- |
| donationId | `STRING` | `REQUIRED`  |

- Example:
  - `GET` `https://api-jalanmimpi.herokuapp.com/v1/donation/details?donationId=ypI4SjK8KE5Mlx4kqfZB6H6Hx`

##### HTTP Response

```json
{
  "donation_id": "ypI4SjK8KE5Mlx4kqfZB6H6Hx",
  "creator_uid": "YSrOtatKoaYAUz1jwV6DdLrhUVC3",
  "creator_name": "Faiz Ainur Rofiq",
  "title": "Bantu Saya Skripsi",
  "description": "Bantu saya skripsi dong",
  "target_nominal": 1000000,
  "img_url": "",
  "status": "Ongoing"
}
```

### Get Fund Details

##### Description

This API will retrieve any fund details information about a donation item.

##### HTTP Request Endpoint

> `GET` `ROOT_ENDPOINT/donation/details/fund`

##### HTTP Request Query String

| Field      | Value    | Description |
| ---------- | -------- | ----------- |
| donationId | `STRING` | `REQUIRED`  |

- Example:
  - `GET` `https://api-jalanmimpi.herokuapp.com/v1/donation/details/fund?donationId=ypI4SjK8KE5Mlx4kqfZB6H6Hx`

##### HTTP Response

```json
[
  {
    "id": 8,
    "donation_id": "ypI4SjK8KE5Mlx4kqfZB6H6Hx",
    "item_detail": "Sewa Hosting",
    "nominal_detail": 200000,
    "description": "Untuk sewa hosting"
  },
  {
    "id": 7,
    "donation_id": "ypI4SjK8KE5Mlx4kqfZB6H6Hx",
    "item_detail": "Credit AWS untuk cloud service",
    "nominal_detail": 10000,
    "description": "Untuk credit AWS"
  }
]
```

### Get Donation Donors list

> Currently unavailable.
> Will be updated and tested after Payment API is finished.

##### Description

List the donors of a donation item.

##### HTTP Request Endpoint

> `GET` `ROOT_ENDPOINT/donation/details/donors`

##### HTTP Request Query Strings

| Field      | Value     | Description                    |
| ---------- | --------- | ------------------------------ |
| donationId | `STRING`  | `REQUIRED`                     |
| limit      | `INTEGER` | `OPTIONAL` Default value is 10 |
| offset     | `INTEGER` | `OPTIONAL` Default value is 0  |

- Example
  - `GET` `https://api-jalanmimpi.herokuapp.com/v1/donation/details/donors?donationId=ypI4SjK8KE5Mlx4kqfZB6H6Hx`

##### HTTP Response

```json
[
  {
    "donation_id": "ypI4SjK8KE5Mlx4kqfZB6H6Hx",
    "uid": "B234",
    "name": "John Doe",
    "photo_url": "",
    "email": "john@dow.com"
  }
]
```

### Get Total Earned By Donation ID

##### HTTP Request Endpoint

> `GET` `ROOT_ENDPOINT/donation/details/totalEarned`

##### HTTP Query String

| Field      | Value    | Description |
| ---------- | -------- | ----------- |
| donationId | `STRING` | `REQUIRED`  |

##### HTTP Response

```json
{
  "donation_id": "DN-1pk3ku3VpXwsI1Ku5q7ktt8tH",
  "total_earned": "16404722"
}
```

### Create Donation

##### Description

When this API is called, the data passed inside the HTTP body will be recorded to database. This API require an authorization token.

##### HTTP Request Endpoint

> `POST` `ROOT_ENDPOINT/donation/create`

##### HTTP Request Header

| Field         | Value                        | Description                  |
| ------------- | ---------------------------- | ---------------------------- |
| Content-type  | application/json             | `REQUIRED` Content type.     |
| authorization | `STRING` Bearer \${TOKEN_ID} | `REQUIRED`Firebase Token ID. |

##### HTTP Request Body

| Field        | Value     | Description                                                                   |
| ------------ | --------- | ----------------------------------------------------------------------------- |
| title        | `TEXT`    | `REQUIRED`                                                                    |
| description  | `TEXT`    | `REQUIRED`                                                                    |
| totalNominal | `INTEGER` | `REQUIRED`                                                                    |
| imageUrl     | `STRING`  | `OPTIONAL`                                                                    |
| expiredDate  | `STRING`  | `REQUIRED` in `yyyy-MM-dd` format. Example for 2 November 2020 = `2020-11-02` |

```json
{
  "title": "Bantu Saya Skripsi",
  "description": "Bantu saya skripsi dong",
  "totalNominal": "1000000",
  "imageUrl": "",
  "expiredDate": "2020-11-02"
}
```

##### HTTP Response

```json
{
  "id": 5,
  "donation_id": "ypI4SjK8KE5Mlx4kqfZB6H6Hx",
  "uid": "YSrOtatKoaYAUz1jwV6DdLrhUVC3",
  "title": "Bantu Saya Skripsi",
  "description": "Bantu saya skripsi dong",
  "target_nominal": 1000000,
  "created_date": "2020-10-19T04:51:17.110Z",
  "img_url": "",
  "status": "Ongoing"
}
```

### Update Donation

##### Description

Update the data of a registered donation.

##### HTTP Request Endpoint

> `PUT` `ROOT_ENDPOINT/donation/update`

##### HTTP Request Header

| Field         | Value                        | Description                  |
| ------------- | ---------------------------- | ---------------------------- |
| Content-type  | application/json             | `REQUIRED` Content type.     |
| authorization | `STRING` Bearer \${TOKEN_ID} | `REQUIRED`Firebase Token ID. |

##### HTTP Request Body

| Field        | Value     | Description                                                                   |
| ------------ | --------- | ----------------------------------------------------------------------------- |
| donationId   | `STRING`  | `REQUIRED`                                                                    |
| title        | `TEXT`    | `REQUIRED`                                                                    |
| description  | `TEXT`    | `REQUIRED`                                                                    |
| totalNominal | `INTEGER` | `REQUIRED`                                                                    |
| imageUrl     | `STRING`  | `OPTIONAL`                                                                    |
| expiredDate  | `STRING`  | `REQUIRED` in `yyyy-MM-dd` format. Example for 2 November 2020 = `2020-11-02` |

```json
{
  "uid": "YSrOtatKoaYAUz1jwV6DdLrhUVC3",
  "donationId": "ypI4SjK8KE5Mlx4kqfZB6H6Hx",
  "title": "Bantu Saya Skripsi 2020",
  "description": "Bantu saya skripsi dong",
  "totalNominal": "1000000",
  "imageUrl": "",
  "expiredDate": "2020-11-02"
}
```

##### HTTP Response

```json
{
  "id": 1,
  "donation_id": "ypI4SjK8KE5Mlx4kqfZB6H6Hx",
  "uid": "YSrOtatKoaYAUz1jwV6DdLrhUVC3",
  "title": "Bantu Saya Skripsi 2020",
  "description": "Bantu saya skripsi dong",
  "target_nominal": 1000000,
  "created_date": "2020-10-19T05:14:57.757Z",
  "img_url": "",
  "status": "Ongoing"
}
```

### Insert Donation Fund Details

##### Description

Insert fund details for a registered donation.

##### HTTP Request Endpoint

> `POST` `ROOT_ENDPOINT/donation/insert/fund`

##### HTTP Request Header

| Field         | Value                        | Description                  |
| ------------- | ---------------------------- | ---------------------------- |
| Content-type  | application/json             | `REQUIRED` Content type.     |
| authorization | `STRING` Bearer \${TOKEN_ID} | `REQUIRED`Firebase Token ID. |

##### HTTP Request Body

| Field       | Values            | Description                                      |
| ----------- | ----------------- | ------------------------------------------------ |
| donationId  | `STRING`          | `REQUIRED` Donation ID                           |
| fundDetails | Array of `Object` | Default is an empty array. See the example below |

```json
{
  "donationId": "ypI4SjK8KE5Mlx4kqfZB6H6Hx",
  "fundDetails": [
    {
      "itemDetail": "Credit AWS",
      "nominalDetail": 10000,
      "description": "Untuk credit AWS"
    },
    {
      "itemDetail": "Sewa Hosting",
      "nominalDetail": 200000,
      "description": "Untuk sewa hosting"
    }
  ]
}
```

##### HTTP Response

```json
[
  {
    "id": 7,
    "donation_id": "ypI4SjK8KE5Mlx4kqfZB6H6Hx",
    "item_detail": "Credit AWS",
    "nominal_detail": 10000,
    "description": "Untuk credit AWS"
  },
  {
    "id": 8,
    "donation_id": "ypI4SjK8KE5Mlx4kqfZB6H6Hx",
    "item_detail": "Sewa Hosting",
    "nominal_detail": 200000,
    "description": "Untuk sewa hosting"
  }
]
```

### Update Fund Details

##### Description

Update fund details data of a donation.

##### HTTP Request Endpoint

> `PUT` `ROOT_ENDPOINT/donation/update/fund`

##### HTTP Request Header

| Field         | Value                        | Description                  |
| ------------- | ---------------------------- | ---------------------------- |
| Content-type  | application/json             | `REQUIRED` Content type.     |
| authorization | `STRING` Bearer \${TOKEN_ID} | `REQUIRED`Firebase Token ID. |

##### HTTP Request Body

| Field         | Valus     | Description |
| ------------- | --------- | ----------- |
| fundDetailsId | `INTEGER` | `REQUiRED`  |
| donationId    | `STRING`  | `REQUIRED`  |
| itemDetail    | `STRING`  | `REQUIRED`  |
| nominalDetail | `INTEGER` | `REQUIRED`  |
| description   | `TEXT`    | `REQUIRED`  |

```json
{
  "fundDetailsId": 7,
  "donationId": "ypI4SjK8KE5Mlx4kqfZB6H6Hx",
  "itemDetail": "Credit AWS untuk cloud service",
  "nominalDetail": 10000,
  "description": "Untuk credit AWS"
}
```

##### HTTP Response

```json
{
  "id": 7,
  "donation_id": "ypI4SjK8KE5Mlx4kqfZB6H6Hx",
  "item_detail": "Credit AWS untuk cloud service",
  "nominal_detail": 10000,
  "description": "Untuk credit AWS"
}
```

### Search Donation

##### Description

Search donation data based on the query string provided by user.

##### HTTP Request Endpoint

> `GET` `ROOT_ENDPOINT/donation/search`

##### HTTP Request Query Strings

| Field  | Value     | Description                                                                                                                          |
| ------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| limit  | `INTEGER` | `OPTIONAL` Default value is 10                                                                                                       |
| offset | `INTEGER` | `OPTIONAL` Default value is 0                                                                                                        |
| query  | `STRING`  | `OPTIONAL` `Case-insensitive` Search query provided by user. This query will be compared to donation title and donation creator name |

<<<<<<< HEAD
| status | `STRING` | `OPTIONAL` `Case-insensitive` Default value is `Ongoing` |
=======

> > > > > > > dev

- Examples:
  - `GET` `https://api-jalanmimpi.herokuapp.com/v1/donation/search?query=Bantu&status=Ongoing`
  - `GET` `https://api-jalanmimpi.herokuapp.com/v1/donation/search?query=faiz&status=Ongoing`

##### HTTP Response

```json
[
  {
    "donation_id": "ypI4SjK8KE5Mlx4kqfZB6H6Hx",
    "uid": "v6LIjt3RaqiAFzJvJkRVT9ZcP",
    "creator_name": "Faiz Ainur Rofiq",
    "title": "Bantu Saya Skripsi",
    "description": "Bantu saya skripsi dong",
    "target_nominal": 1000000,
    "img_url": "",
    "status": "Ongoing"
  }
]
```

### Change Donation Status to `Completed`

##### Description

This API will change the status of a donation to `Completed`.

##### HTTP Request Endpoint

> `PUT` `ROOT_ENDPOINT/donation/:donationId/completed`

- Example:
  - `PUT` `https://api-jalanmimpi.herokuapp.com/v1/donation/ypI4SjK8KE5Mlx4kqfZB6H6Hx/completed`

##### HTTP Request Header

| Field         | Value                        | Description                  |
| ------------- | ---------------------------- | ---------------------------- |
| authorization | `STRING` Bearer \${TOKEN_ID} | `REQUIRED`Firebase Token ID. |

##### HTTP Response

```json
{
  "id": 1,
  "donation_id": "ypI4SjK8KE5Mlx4kqfZB6H6Hx",
  "uid": "v6LIjt3RaqiAFzJvJkRVT9ZcP",
  "title": "Bantu Saya Skripsi 2020",
  "description": "Bantu saya skripsi dong",
  "target_nominal": 1000000,
  "created_date": "2020-10-19T05:14:57.757Z",
  "img_url": "",
  "status": "Completed"
}
```

### Change Donation Status to `Closed`

##### Description

This API will change the status of a donation to `Closed`.

##### HTTP Request Endpoint

> `PUT` `ROOT_ENDPOINT/donation/:donationId/close`

- Example:
  - `PUT` `https://api-jalanmimpi.herokuapp.com/v1/donation/ypI4SjK8KE5Mlx4kqfZB6H6Hx/close`

<<<<<<< HEAD

##### HTTP Request Header

| Field         | Value                        | Description                  |
| ------------- | ---------------------------- | ---------------------------- |
| authorization | `STRING` Bearer \${TOKEN_ID} | `REQUIRED`Firebase Token ID. |

##### HTTP Request Header

| Field         | Value                        | Description                  |
| ------------- | ---------------------------- | ---------------------------- |
| authorization | `STRING` Bearer \${TOKEN_ID} | `REQUIRED`Firebase Token ID. |

=======

> > > > > > > dev

##### HTTP Response

```json
{
  "id": 1,
  "donation_id": "ypI4SjK8KE5Mlx4kqfZB6H6Hx",
  "uid": "A123",
  "title": "Bantu Saya Skripsi 2020",
  "description": "Bantu saya skripsi dong",
  "target_nominal": 1000000,
  "created_date": "2020-10-19T05:14:57.757Z",
  "img_url": "",
  "status": "Closed"
}
```

### Change Donation Status to `Rejected`

##### Description

This API will change the status of a donation to `Rejected`.

##### HTTP Request Endpoint

> `PUT` `ROOT_ENDPOINT/donation/:donationId/reject`

- Example:
  - `PUT` `https://api-jalanmimpi.herokuapp.com/v1/donation/ypI4SjK8KE5Mlx4kqfZB6H6Hx/reject`

##### HTTP Request Header

| Field         | Value                        | Description                  |
| ------------- | ---------------------------- | ---------------------------- |
| authorization | `STRING` Bearer \${TOKEN_ID} | `REQUIRED`Firebase Token ID. |

##### HTTP Response

```json
{
  "id": 1,
  "donation_id": "ypI4SjK8KE5Mlx4kqfZB6H6Hx",
  "uid": "A123",
  "title": "Bantu Saya Skripsi 2020",
  "description": "Bantu saya skripsi dong",
  "target_nominal": 1000000,
  "created_date": "2020-10-19T05:14:57.757Z",
  "img_url": "",
  "status": "Rejected"
}
```

### Resume a Donation Item

##### Description

Use this API for resuming a closed donation item. Will change the donation item status to `Ongoing`.

##### HTTP Request Endpoint

> `PUT` `ROOT_ENDPOINT/donation/:donationId/resume`

- Example:
  - `PUT` `https://api-jalanmimpi.herokuapp.com/v1/donation/ypI4SjK8KE5Mlx4kqfZB6H6Hx/resume`

##### HTTP Request Header

| Field         | Value                        | Description                  |
| ------------- | ---------------------------- | ---------------------------- |
| authorization | `STRING` Bearer \${TOKEN_ID} | `REQUIRED`Firebase Token ID. |

##### HTTP Response

```json
{
  "id": 1,
  "donation_id": "ypI4SjK8KE5Mlx4kqfZB6H6Hx",
  "uid": "A123",
  "title": "Bantu Saya Skripsi 2020",
  "description": "Bantu saya skripsi dong",
  "target_nominal": 1000000,
  "created_date": "2020-10-19T05:14:57.757Z",
  "img_url": "",
  "status": "Ongoing"
}
```
