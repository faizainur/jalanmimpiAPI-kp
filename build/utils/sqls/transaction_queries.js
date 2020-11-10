"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalEarnedByDonationIdSql = exports.getTransactionStatusSql = exports.getTransactionsByUserUidSql = exports.getTransactionsByDonationIdSql = exports.getTransactionByIdSql = void 0;
exports.getTransactionByIdSql = `
SELECT * FROM transactions
WHERE transaction_id = $1
`;
exports.getTransactionsByDonationIdSql = `
SELECT 
    transaction_id,
    user_profiles.uid,
    user_profiles.first_name || ' ' || user_profiles.last_name as name,
    user_profiles.email,
    donation_id,
    nominal,
    description,
    date,
    transactions.status

FROM transactions
INNER JOIN user_profiles ON transactions.uid = user_profiles.uid
WHERE donation_id=$1 AND status='Success'
`;
exports.getTransactionsByUserUidSql = `
SELECT 
    transaction_id,
    transactions.uid,
    donation_items.donation_id,
    donation_items.title,
    nominal,
    transactions.description,
    date,
    transactions.status
FROM transactions
INNER JOIN donation_items ON transactions.donation_id = donation_items.donation_id
WHERE transactions.uid=$1 AND (transactions.status='Success' OR transactions.status='Pending' OR transactions.status='Failed')
`;
exports.getTransactionStatusSql = `
SELECT
    transaction_id,
    status
FROM transactions
WHERE transaction_id = $1
`;
exports.getTotalEarnedByDonationIdSql = `
SELECT donation_id, total_earned from (SELECT donation_id, SUM(nominal) as total_earned FROM transactions GROUP BY donation_id) as sub
WHERE donation_id=$1
`;
