export const getRegisteredUserByUidSql = `
SELECT 
    uid,
    join_date,
    email_verified,
    profile_is_filled
FROM users WHERE uid=$1
`

export const getAllUserProfileSql = `
SELECT 
    users.uid,
    user_profiles.first_name,
    user_profiles.last_name,
    user_profiles.email,
    users.email_verified,
    user_profiles.gender,
    user_profiles.profession,
    user_profiles.phone_number,
    user_profiles.photo_url,
    addresses.address_line_1,
    addresses.address_line_2,
    addresses.postal_code,
    cities.city,
    provinces.province,
    countries.country,
    users.join_date
FROM
    users
INNER JOIN user_profiles ON users.uid = user_profiles.uid
INNER JOIN addresses ON users.uid = addresses.uid
INNER JOIN cities ON addresses.city_id = cities.id
INNER JOIN provinces ON addresses.province_id = provinces.id
INNER JOIN countries ON addresses.country_id = countries.id
`

export const getUserProfileByUidSql = `
SELECT 
    users.uid,
    user_profiles.first_name,
    user_profiles.last_name,
    user_profiles.email,
    users.email_verified,
    user_profiles.gender,
    user_profiles.profession,
    user_profiles.phone_number,
    user_profiles.photo_url,
    user_profiles.id_card_url,
    addresses.address_line_1,
    addresses.address_line_2,
    addresses.postal_code,
    cities.city,
    provinces.province,
    countries.country,
    users.join_date
FROM
    users
INNER JOIN user_profiles ON users.uid = user_profiles.uid
INNER JOIN addresses ON users.uid = addresses.uid
INNER JOIN cities ON addresses.city_id = cities.id
INNER JOIN provinces ON addresses.province_id = provinces.id
INNER JOIN countries ON addresses.country_id = countries.id
WHERE
    users.uid=$1
`

export const getUserProfilePublicByUidSql = `
SELECT 
    users.uid,
    user_profiles.first_name,
    user_profiles.last_name,
    user_profiles.email,
    users.email_verified,
    user_profiles.gender,
    user_profiles.profession,
    user_profiles.phone_number,
    addresses.address_line_1,
    addresses.address_line_2,
    addresses.postal_code,
    cities.city,
    provinces.province,
    countries.country,
    users.join_date
FROM
    users
INNER JOIN user_profiles ON users.uid = user_profiles.uid
INNER JOIN addresses ON users.uid = addresses.uid
INNER JOIN cities ON addresses.city_id = cities.id
INNER JOIN provinces ON addresses.province_id = provinces.id
INNER JOIN countries ON addresses.country_id = countries.id
WHERE
    users.uid=$1
    `

export const getUserProfileByEmailSql = `
SELECT 
    users.uid,
    user_profiles.first_name,
    user_profiles.last_name,
    user_profiles.email,
    users.email_verified,
    user_profiles.gender,
    user_profiles.profession,
    user_profiles.phone_number,
    user_profiles.photo_url,
    addresses.address_line_1,
    addresses.address_line_2,
    addresses.postal_code,
    cities.city,
    provinces.province,
    countries.country,
    users.join_date
FROM
    users
INNER JOIN user_profiles ON users.uid = user_profiles.uid
INNER JOIN addresses ON users.uid = addresses.uid
INNER JOIN cities ON addresses.city_id = cities.id
INNER JOIN provinces ON addresses.province_id = provinces.id
INNER JOIN countries ON addresses.country_id = countries.id
WHERE
    user_profiles.email=$1
`

export const getUserProfileByPhoneNumberSql = `
SELECT 
    users.uid,
    user_profiles.first_name,
    user_profiles.last_name,
    user_profiles.email,
    users.email_verified,
    user_profiles.gender,
    user_profiles.profession,
    user_profiles.phone_number,
    user_profiles.photo_url,
    addresses.address_line_1,
    addresses.address_line_2,
    addresses.postal_code,
    cities.city,
    provinces.province,
    countries.country,
    users.join_date
FROM
    users
INNER JOIN user_profiles ON users.uid = user_profiles.uid
INNER JOIN addresses ON users.uid = addresses.uid
INNER JOIN cities ON addresses.city_id = cities.id
INNER JOIN provinces ON addresses.province_id = provinces.id
INNER JOIN countries ON addresses.country_id = countries.id
WHERE
    user_profiles.phone_number=$1
`
export const searchUserProfileByNameSql = `
SELECT 
    users.uid,
    user_profiles.first_name,
    user_profiles.last_name,
    user_profiles.email,
    users.email_verified,
    user_profiles.gender,
    user_profiles.profession,
    user_profiles.phone_number,
    user_profiles.photo_url,
    addresses.address_line_1,
    addresses.address_line_2,
    addresses.postal_code,
    cities.city,
    provinces.province,
    countries.country,
    users.join_date
FROM
    users
INNER JOIN user_profiles ON users.uid = user_profiles.uid
INNER JOIN addresses ON users.uid = addresses.uid
INNER JOIN cities ON addresses.city_id = cities.id
INNER JOIN provinces ON addresses.province_id = provinces.id
INNER JOIN countries ON addresses.country_id = countries.id
WHERE
   (user_profiles.first_name || ' ' || user_profiles.last_name)
   LIKE '%$1%'
`

export const getUserBankAccountsSql = `
SELECT 
    bank_accounts.id as bank_account_id,
    user_profiles.uid,
    user_profiles.first_name || ' ' || user_profiles.last_name as name,
    user_profiles.email,
    bank_name,
    account_number,
    description,
    created_date
FROM bank_accounts
INNER JOIN user_profiles ON bank_accounts.uid = user_profiles.uid
WHERE bank_accounts.uid=$1
`

export const checkIfEmailExistSql = `
SELECT email
FROM user_profiles
WHERE email=$1
`