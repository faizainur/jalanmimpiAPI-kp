-- =============== USER ==============
-- Register user
INSERT INTO users(uid) VALUES($1);

-- Change email verified state
UPDATE users SET email_verified=$1
WHERE uid=$2;

-- Change profil_filled state
UPDATE users SET profil_is_filled=$1
WHERE uid=$2;

-- Record user profile
INSERT INTO user_profiles(
                uid, 
                first_name, 
                last_name,
                email,
                gender,
                profession,
                phone_number,
                photo_url,
                id_card_url)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);

-- Update user profile
UPDATE user_profiles
SET
    first_name=$1,
    last_name=$2,
    email=$3,
    gender=$4,
    profession=$5,
    phone_number=$6,
    photo_url=$7,
    id_card_url=$8
WHERE uid=$9;

-- Record address
INSERT INTO addresses(uid, address_line_1, address_line_2, province_id, city_id, country_id, postal_code)
VALUES ($1, $2, $3, $4, $5, $6, $7);

-- Update address
UPDATE addresses
SET
    address_line_1=$1,
    address_line_2=$2,
    province_id=$3,
    city_id=$4,
    country_id=$5,
    postal_code=$6
WHERE id=$7 AND uid=$8;


-- Insert country
INSERT INTO countries(country) VALUES($1);

-- Update country
UPDATE countries SET country=$1 WHERE id=$2;

-- Insert Province
INSERT INTO provinces(province, country_id) VALUES($1, $2);

-- Update province
UPDATE provinces SET province=$1, country_id=$2
WHERE id=$3;

-- Insert City
INSERT INTO cities(city, province_id, country_id) VALUES($1, $2, $3);

-- Update city
UPDATE city SET city=$1, province_id=$2, country_id=$3
WHERE id=$4;

-- Insert bank account
INSERT INTO bank_accounts(uid, bank_name, account_number, description) 
VALUES ($1, $2, $3, $4);

-- Update bank account info
UPDATE bank_accounts
SET 
    bank_name=$1,
    account_number=$2,
    description=$3
WHERE id=$4 AND uid=$5;

-- ========================== Donations =====================

-- Insert donations items
INSERT INTO donations_items(
    donation_id, 
    uid, 
    title,
    description, 
    target_nominal, 
    img_url)
VALUES ($1, $2, $3, $4, $5, $6);

-- Update donation item by id
UPDATE donations_items
SET
    title=$1,
    description=$2,
    target_nominal=$3,
    img_url=$4
WHERE donation_id=$4

-- Insert fund details
INSERT INTO fund_details(donation_id, item_detail, nominal_detail, description)
VALUES ($1, $2, $3, $4);

-- Update fund details by id
UPDATE fund_details SET item_detail=$1, nominal_detail=$2, description=$3
WHERE id=$4;

-- Create transactions
INSERT INTO transactions(transaction_id, uid, donation_id, nominal, description)
VALUES ($1, $2, $3, $4, $5);

-- Update status transaction
UPDATE transactions SET date = CURRENT_TIMESTAMP, status=$1
WHERE transaction_id = $2;

-- Create disbursement
INSERT INTO disbursement(
    disbursement_id, 
    mt_reference_no, 
    donation_id, 
    bank_account_id, 
    nominal, 
    description)
VALUES ($1, $2, $3, $4, $5, $6);

-- Update status disbursement
UPDATE disbursement SET date = CURRENT_TIMESTAMP, status = $1
WHERE reference_id = $2;

-- ================== Payouts
INSERT INTO payouts(reference_no, status)
VALUES ($1, $2);

UPDATE payouts SET status=$1, timestamp=CURRENT_TIMESTAMP
WHERE reference_no=$2;

