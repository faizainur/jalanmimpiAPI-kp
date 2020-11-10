export const createDisbursementSql = `
INSERT INTO disbursement(
    disbursement_id, 
    mt_reference_no, 
    donation_id, 
    bank_account_id, 
    nominal, 
    description)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *
`

export const updateDisbursementStatusSql = `
UPDATE disbursement SET date = CURRENT_TIMESTAMP, status = $1
WHERE reference_id = $2
RETURNING *
`