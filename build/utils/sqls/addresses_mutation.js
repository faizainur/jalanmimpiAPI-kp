"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCitySql = exports.insertCitySql = exports.updateProvinceSql = exports.insertProvinceSql = exports.updateCountrySql = exports.insertCountrySql = exports.updateUserAddressSql = exports.recordUserAddressSql = void 0;
exports.recordUserAddressSql = `
INSERT INTO addresses(
    uid, 
    address_line_1, 
    address_line_2, 
    city_id, 
    province_id, 
    country_id, 
    postal_code)
VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING *
`;
exports.updateUserAddressSql = `
UPDATE addresses
SET
    address_line_1=$1,
    address_line_2=$2,
    city_id=$3,
    province_id=$4,
    country_id=$5,
    postal_code=$6
WHERE uid=$7
RETURNING *
`;
exports.insertCountrySql = `
INSERT INTO countries(country) VALUES($1)
RETURNING *
`;
exports.updateCountrySql = `
UPDATE countries SET country=$1 WHERE id=$2
RETURNING *
`;
exports.insertProvinceSql = `
INSERT INTO provinces(province, country_id) VALUES($1, $2)
RETURNING *
`;
exports.updateProvinceSql = `
UPDATE provinces SET province=$1, country_id=$2
WHERE id=$3
RETURNING *
`;
exports.insertCitySql = `
INSERT INTO cities(city, province_id, country_id) VALUES($1, $2, $3)
RETURNING *
`;
exports.updateCitySql = `
UPDATE city SET city=$1, province_id=$2, country_id=$3
WHERE id=$4
RETURNING *
`;
