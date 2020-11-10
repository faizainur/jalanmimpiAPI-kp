"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDonorsByDonationIdSql = exports.getFundDetailsByDonationIdSql = exports.searchDonationItemSql = exports.getDonationByIdSql = exports.getAllDonationSql = void 0;
exports.getAllDonationSql = `
SELECT 
     donation_items.donation_id,
    user_profiles.uid AS creator_uid,
    user_profiles.first_name || ' ' || user_profiles.last_name AS creator_name,
    title,
    donation_items.description,
    target_nominal,
    img_url,
    donation_items.status
FROM
    donation_items
INNER JOIN user_profiles ON donation_items.uid = user_profiles.uid
WHERE status = $1
LIMIT $2
OFFSET $3
`;
// export const getAllDonationSql = `
// SELECT
//      donation_items.donation_id,
//     user_profiles.uid AS creator_uid,
//     user_profiles.first_name || ' ' || user_profiles.last_name AS creator_name,
//     title,
//     donation_items.description,
//     target_nominal,
//     total_earned,
//     img_url,
//     donation_items.status
// FROM
//     donation_items
// INNER JOIN user_profiles ON donation_items.uid = user_profiles.uid
// INNER JOIN
//     (SELECT transactions.donation_id, SUM(nominal) as total_earned
//     FROM transactions GROUP BY transactions.donation_id) as sub_query
// ON donation_items.donation_id = sub_query.donation_id
// WHERE status = $1
// LIMIT $2
// OFFSET $3
// `;
exports.getDonationByIdSql = `
SELECT 
    donation_items.donation_id,
    user_profiles.uid AS creator_uid,
    user_profiles.first_name || ' ' || user_profiles.last_name AS creator_name,
    title,
    donation_items.description,
    target_nominal,
    img_url,
    donation_items.status
FROM
    donation_items
INNER JOIN user_profiles ON donation_items.uid = user_profiles.uid
WHERE donation_items.donation_id =$1
`;
// export const getDonationByIdSql = `
// SELECT
//     donation_items.donation_id,
//     user_profiles.uid AS creator_uid,
//     user_profiles.first_name || ' ' || user_profiles.last_name AS creator_name,
//     title,
//     donation_items.description,
//     target_nominal,
//     total_earned,
//     img_url,
//     donation_items.status
// FROM
//     donation_items
// INNER JOIN user_profiles ON donation_items.uid = user_profiles.uid
// INNER JOIN
//     (SELECT transactions.donation_id, SUM(nominal) as total_earned
//     FROM transactions GROUP BY transactions.donation_id) as sub_query
// ON donation_items.donation_id = sub_query.donation_id
// WHERE donation_items.donation_id =$1
// `;
exports.searchDonationItemSql = `
SELECT 
    donation_id,
    user_profiles.uid,
    user_profiles.first_name || ' ' || user_profiles.last_name AS creator_name,
    title,
    description,
    target_nominal,
    img_url,
    status
FROM
    donation_items
INNER JOIN user_profiles ON donation_items.uid = user_profiles.uid
WHERE (UPPER(title) LIKE UPPER($1)
OR 
UPPER(user_profiles.first_name || ' ' || user_profiles.last_name) LIKE UPPER($1))
AND status = $2
LIMIT $3
OFFSET $4
`;
//
exports.getFundDetailsByDonationIdSql = `
SELECT *
FROM fund_details
WHERE donation_id = $1
`;
exports.getDonorsByDonationIdSql = `
SELECT 
    donation_id,
    donors.uid,
    user_profiles.first_name || ' ' || user_profiles.last_name as name,
    user_profiles.photo_url,
    user_profiles.email
FROM donors
INNER JOIN user_profiles ON donors.uid = user_profiles.uid
WHERE donation_id = $1
LIMIT $2
OFFSET $3
`;
