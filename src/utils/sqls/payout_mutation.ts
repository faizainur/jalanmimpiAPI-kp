export const createPayoutSql = `
INSERT INTO payouts(reference_no, status)
VALUES ($1, $2)
RETURNING *
`

export const updateStatusPayoutSql = `
UPDATE payouts SET status=$1, timestamp=CURRENT_TIMESTAMP
WHERE reference_no=$2
RETURNING *
`