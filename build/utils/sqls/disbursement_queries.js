"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDisbursementInfoPublicByDonationIdSql = exports.getDisbursementInfoCreatorByDonationIdSql = void 0;
exports.getDisbursementInfoCreatorByDonationIdSql = `
SELECT 
    disbursement_id,
    donation_id,
    date,
    bank_account_id,
    nominal,
    status,
    description
FROM disbursement
WHERE donation_id=$1
`;
exports.getDisbursementInfoPublicByDonationIdSql = `
SELECT 
    disbursement_id,
    donation_id,
    date,
    nominal,
    description
FROM disbursement
WHERE donation_id=$1 WHERE status='Approved'
`;
