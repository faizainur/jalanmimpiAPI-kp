"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTransactionStatusSql = exports.createTransactionSql = void 0;
exports.createTransactionSql = `
INSERT INTO transactions(transaction_id, uid, donation_id, nominal, description)
VALUES ($1, $2, $3, $4, $5)
RETURNING *
`;
exports.updateTransactionStatusSql = `
UPDATE transactions SET date = CURRENT_TIMESTAMP, status=$1
WHERE transaction_id = $2
RETURNING *
`;
