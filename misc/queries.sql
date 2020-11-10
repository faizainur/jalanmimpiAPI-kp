-- ======================= User =======================
-- Get registered user by uid
SELECT 
    uid,
    join_date,
    email_verified,
    profile_is_filled
FROM users WHERE uid=$1;

-- Get All User Profile
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
INNER JOIN countries ON addresses.country_id = countries.id;

-- Get User Profile By Uid
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
    users.uid=$1; -- change $1 when testing using psql

-- Get User Profile By Uid Public
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
    users.uid=$1;

-- Get User Profile By Email
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
    user_profiles.email=$1; -- change $1 when testing using psql

-- Get User Profile By Phone Number
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
    user_profiles.phone_number=$1; -- change $1 when testing using psql

-- Search User Profile by name
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
   LIKE '%$1%'; -- change $1 when testing using psql

-- Get stored bank accounts by userUid
SELECT 
    user_profiles.uid,
    user_profiles.first_name || ' ' || user_profiles.last_name as name,
    user_profiles.email,
    bank_name,
    account_number,
    description,
    created_date
FROM bank_accounts
INNER JOIN user_profiles ON bank_accounts.uid = user_profiles.uid;

-- Get user email address
SELECT email
FROM user_profiles
WHERE email=$1

-- Get User Address by Uid
SELECT 
    user_profiles.uid,
    user_profiles.first_name || ' ' || user_profiles.last_name as name
    address_line_1,
    address_line_2,
    countries.country,
    provinces.province,
    cities.city,
    postal_code
FROM addresses
INNER JOIN user_profiles ON addresses.uid = user_profiles.uid
INNER JOIN countries ON addresses.country_id = countries.id
INNER JOIN provinces ON addresses.province_id = provinces.id
INNER JOIN cities ON addresses.city_id = cities.id
WHERE uid=$1;

-- Get country by id
SELECT * FROM countries WHERE id=$1;

-- Get Country by name
SELECT * FROM countries WHERE country=$1;

-- Count country by name
SELECT COUNT(*) FROM countries WHERE country=$1;

-- Count country by id
SELECT COUNT(*) FROM countries WHERE id=$1;

-- Get Province by id
SELECT
    id,
    province,
    country_id
    countries.country
FROM provinces
INNER JOIN countries ON provinces.country_id = countries.id
WHERE id=$1 AND country_id=$2;

-- Get Province by name
SELECT
    id,
    province,
    country_id
    countries.country
FROM provinces
INNER JOIN countries ON provinces.country_id = countries.id
WHERE province=$1 AND country_id=$2;

-- Count Province by id
SELECT COUNT(*)
FROM provinces
INNER JOIN countries ON provinces.country_id = countries.id
WHERE id=$1 AND country_id=$2;

-- Count Province by name
SELECT COUNT(*)
FROM provinces
INNER JOIN countries ON provinces.country_id = countries.id
WHERE province=$1 AND country_id=$2;

-- Get Cities by id
SELECT 
    id,
    city,
    province_id,
    provinces.province,
    country_id,
    countries.country
FROM cities
INNER JOIN provinces ON cities.province_id = provinces.id
INNER JOIN countries ON cities.country_id = countries.id
WHERE id=$1 AND province_id=$2 AND country_id=$3;

-- Get Cities by name
SELECT 
    id,
    city,
    province_id,
    provinces.province,
    country_id,
    countries.country
FROM cities
INNER JOIN provinces ON cities.province_id = provinces.id
INNER JOIN countries ON cities.country_id = countries.id
WHERE city=$1 AND province_id=$2 AND country_id=$3;

-- Count Cities by id
SELECT COUNT(*)
FROM cities
INNER JOIN provinces ON cities.province_id = provinces.id
INNER JOIN countries ON cities.country_id = countries.id
WHERE id=$1 AND province_id=$2 AND country_id=$3;

-- Count Cities by name
SELECT COUNT(*)
FROM cities
INNER JOIN provinces ON cities.province_id = provinces.id
INNER JOIN countries ON cities.country_id = countries.id
WHERE city=$1 AND province_id=$2 AND country_id=$3;


-- ===================== Donations ===================

-- Get All Donations
SELECT 
    donation_id,
    user_profiles.uid AS creator_uid,
    user_profiles.first_name || ' ' || user_profiles.last_name AS creator_name,
    title,
    description,
    target_nominal,
    img_url
FROM
    donation_items
INNER JOIN user_profiles ON donation_items.uid = user_profiles.uid;

-- Get Donation by ID
SELECT 
    donation_id,
    user_profiles.uid AS creator_uid,
    user_profiles.first_name || ' ' || user_profiles.last_name AS creator_name,
    title,
    description,
    target_nominal,
    img_url
FROM
    donation_items
INNER JOIN user_profiles ON donation_items.uid = user_profiles.uid
WHERE donation_id =$1;

-- Get Donation by Title
SELECT 
    donation_id,
    user_profiles.uid AS creator_uid,
    user_profiles.first_name || ' ' || user_profiles.last_name AS creator_name,
    title,
    description,
    target_nominal,
    img_url
FROM
    donation_items
INNER JOIN user_profiles ON donation_items.uid = user_profiles.uid
WHERE title LIKE '%$1%';

-- Get Donation by Creator name
SELECT 
    donation_id,
    user_profiles.uid AS creator_uid,
    user_profiles.first_name || ' ' || user_profiles.last_name AS creator_name,
    title,
    description,
    target_nominal,
    img_url
FROM
    donation_items
INNER JOIN user_profiles ON donation_items.uid = user_profiles.uid
WHERE creator_name LIKE '%$1%';

-- Get fund details of donation items by donation ID
SELECT * FROM fund_details
WHERE donation_id = $1;

-- Get Donors of donation item
SELECT 
    donation_id,
    donors.uid,
    user_profiles.first_name || ' ' || user_profiles.last_name as name,
    user_profiles.photo_url,
    user_profiles.email
FROM donors
INNER JOIN user_profiles ON donors.uid = user_profiles.uid
WHERE donation_id = $1;

-- Get donate transactions to a donation item By Donation ID
SELECT 
    transaction_id,
    user_profiles.uid,
    user_profiles.first_name || ' ' || user_profiles.last_name as name,
    user_profiles.email,
    donation_id,
    nominal,
    description,
    date
FROM transactions
INNER JOIN user_profiles ON transactions.uid = user_profiles.uid
WHERE donation_id=$1 AND status='Success';

-- Get donate transactions to a donation item by User UID
SELECT 
    transaction_id,
    uid,
    donation_items.donation_id,
    donation_items.title
    nominal,
    description,
    date
FROM transactions
INNER JOIN donation_items ON transactions.donation_id = donation_items.donation_id
WHERE uid=$1 AND (status='Success' OR status='Pending' OR status='Failed');

-- Get disbursement info by Donation ID for creator
SELECT 
    disbursement_id,
    donation_id,
    date,
    bank_account_id,
    nominal,
    status,
    description
FROM disbursement
WHERE donation_id=$1;

-- Get disbursement info for public
SELECT 
    disbursement_id,
    donation_id,
    date,
    nominal,
    description
FROM disbursement
WHERE donation_id=$1 WHERE status='Approved';

-- ============== For Admin ONLY =============
-- Get payout by reference_no
SELECT * FROM payouts WHERE reference_no=$1;

-- Get all payouts
SELECT * FROM payouts;