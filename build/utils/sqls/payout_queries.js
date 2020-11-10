"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPayoutsSql = exports.getPayoutByReferenceIdSql = void 0;
exports.getPayoutByReferenceIdSql = `
SELECT * FROM payouts WHERE reference_no=$1
`;
exports.getAllPayoutsSql = `
SELECT * FROM payouts;
`;
