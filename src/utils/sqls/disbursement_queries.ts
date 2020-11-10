export const getDisbursementInfoCreatorByDonationIdSql = `
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
`

export const getDisbursementInfoPublicByDonationIdSql = `
SELECT 
    disbursement_id,
    donation_id,
    date,
    nominal,
    description
FROM disbursement
WHERE donation_id=$1 WHERE status='Approved'
`