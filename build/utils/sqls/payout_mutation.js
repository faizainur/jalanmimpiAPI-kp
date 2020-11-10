"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatusPayoutSql = exports.createPayoutSql = void 0;
exports.createPayoutSql = `
INSERT INTO payouts(reference_no, status)
VALUES ($1, $2)
RETURNING *
`;
exports.updateStatusPayoutSql = `
UPDATE payouts SET status=$1, timestamp=CURRENT_TIMESTAMP
WHERE reference_no=$2
RETURNING *
`;
