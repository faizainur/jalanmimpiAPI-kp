export const getPayoutByReferenceIdSql = `
SELECT * FROM payouts WHERE reference_no=$1
`

export const getAllPayoutsSql = `
SELECT * FROM payouts;
`