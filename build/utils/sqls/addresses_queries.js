"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countCityByNameSql = exports.countCityByIdSql = exports.getCityByNameSql = exports.getCityByIdSSql = exports.countProvinceByNameSql = exports.countProvinceByIdSql = exports.getProvinceByNameSql = exports.getProvinceByIdSql = exports.countCountryByIdSql = exports.countCountryByNameSql = exports.getCountryByNameSql = exports.getCountryByIdSql = exports.getUserAddressByUidSql = void 0;
exports.getUserAddressByUidSql = `
SELECT 
    user_profiles.uid,
    user_profiles.first_name || ' ' || user_profiles.last_name as name,
    address_line_1,
    address_line_2,
    countries.country,
    provinces.province,
    cities.city,
    postal_code
FROM addresses
INNER JOIN user_profiles ON addresses.uid = user_profiles.uid
INNER JOIN countries ON addresses.country_id = countries.id
INNER JOIN provinces ON addresses.province_id = provinces.id
INNER JOIN cities ON addresses.city_id = cities.id
WHERE addresses.uid=$1
`;
exports.getCountryByIdSql = `SELECT * FROM countries WHERE id=$1`;
exports.getCountryByNameSql = `SELECT * FROM countries WHERE country=$1`;
exports.countCountryByNameSql = `SELECT COUNT(*) FROM countries WHERE country=$1`;
exports.countCountryByIdSql = `SELECT COUNT(*) FROM countries WHERE id=$1`;
exports.getProvinceByIdSql = `
SELECT
    provinces.id,
    provinces.province,
    provinces.country_id
    countries.country
FROM provinces
INNER JOIN countries ON provinces.country_id = countries.id
WHERE id=$1 AND country_id=$2
`;
exports.getProvinceByNameSql = `
SELECT
    provinces.id,
    provinces.province,
    country_id,
    countries.country
FROM provinces
INNER JOIN countries ON provinces.country_id = countries.id
WHERE provinces.province=$1 AND provinces.country_id=$2
`;
exports.countProvinceByIdSql = `
SELECT COUNT(*)
FROM provinces
INNER JOIN countries ON provinces.country_id = countries.id
WHERE id=$1 AND country_id=$2
`;
exports.countProvinceByNameSql = `
SELECT COUNT(*)
FROM provinces
INNER JOIN countries ON provinces.country_id = countries.id
WHERE province=$1 AND country_id=$2
`;
exports.getCityByIdSSql = `
SELECT 
    cities.id,
    cities.city,
    cities.province_id,
    provinces.province,
    cities.country_id,
    countries.country
FROM cities
INNER JOIN provinces ON cities.province_id = provinces.id
INNER JOIN countries ON cities.country_id = countries.id
WHERE id=$1 AND province_id=$2 AND country_id=$3
`;
exports.getCityByNameSql = `
SELECT 
    cities.id,
    cities.city,
    cities.province_id,
    provinces.province,
    cities.country_id,
    countries.country
FROM cities
INNER JOIN provinces ON cities.province_id = provinces.id
INNER JOIN countries ON cities.country_id = countries.id
WHERE cities.city=$1 AND cities.province_id=$2 AND cities.country_id=$3
`;
exports.countCityByIdSql = `
SELECT COUNT(*)
FROM cities
INNER JOIN provinces ON cities.province_id = provinces.id
INNER JOIN countries ON cities.country_id = countries.id
WHERE id=$1 AND province_id=$2 AND country_id=$3
`;
exports.countCityByNameSql = `
SELECT COUNT(*)
FROM cities
INNER JOIN provinces ON cities.province_id = provinces.id
INNER JOIN countries ON cities.country_id = countries.id
WHERE city=$1 AND province_id=$2 AND country_id=$3
`;
