export const createTransactionSql = `
INSERT INTO transactions(transaction_id, uid, donation_id, nominal, description)
VALUES ($1, $2, $3, $4, $5)
RETURNING *
`

export const updateTransactionStatusSql = `
UPDATE transactions SET date = CURRENT_TIMESTAMP, status=$1
WHERE transaction_id = $2
RETURNING *
`