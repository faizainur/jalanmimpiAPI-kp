"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBankAccountInfoSql = exports.registerBankAccountSql = exports.updateUserProfileSql = exports.recordUserProfileSql = exports.changeProfileIsFilledStateSql = exports.changeEmailVerifiedStateSql = exports.registerUserSql = void 0;
exports.registerUserSql = `
INSERT INTO users(uid) VALUES($1) RETURNING *
`;
exports.changeEmailVerifiedStateSql = `
UPDATE users SET email_verified=$1
WHERE uid=$2
RETURNING *
`;
exports.changeProfileIsFilledStateSql = `
UPDATE users SET profile_is_filled=$1
WHERE uid=$2
RETURNING *
`;
exports.recordUserProfileSql = `
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
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
RETURNING *
`;
exports.updateUserProfileSql = `
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
WHERE uid=$9
RETURNING *
`;
exports.registerBankAccountSql = `
INSERT INTO bank_accounts(uid, bank_name, account_number, description) 
VALUES ($1, $2, $3, $4)
RETURNING *
`;
exports.updateBankAccountInfoSql = `
    UPDATE bank_accounts
    SET 
        bank_name=$1,
        account_number=$2,
        description=$3
    WHERE id=$4 AND uid=$5
    RETURNING *
`;
