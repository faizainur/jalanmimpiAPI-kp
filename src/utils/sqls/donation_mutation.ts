export const insertDonationItemSql = `
INSERT INTO donation_items(
    donation_id, 
    uid, 
    title,
    description, 
    target_nominal, 
    img_url,
    expired_date)
VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING *
`;

export const updateDonationItemSql = `
UPDATE donation_items
SET
    title=$1,
    description=$2,
    target_nominal=$3,
    img_url=$4,
    expired_date=$5
WHERE donation_id=$6 AND uid=$7
RETURNING *
`;

export const insertFundDetailsSql = `
INSERT INTO fund_details(donation_id, item_detail, nominal_detail, description)
VALUES ($1, $2, $3, $4)
RETURNING *
`;

export const updateFundDetailSql = `
UPDATE fund_details SET item_detail=$1, nominal_detail=$2, description=$3
WHERE id=$4 AND donation_id=$5
RETURNING *
`;

export const updateDonationStatusSql = `
UPDATE donation_items SET status=$1
WHERE donation_id=$2 AND uid=$3
RETURNING *
`;

export const updateExpiredDateSql = `
UPDATE donation_items SET expired_date=$1 WHERE donation_id=$2 AND status='Ongoing'
RETURNING *
`;

export const setExpiredDonationSql = `
UPDATE donation_items SET status = 'Closed' WHERE expired_date < now() AND status='Ongoing'
RETURNING id`;
