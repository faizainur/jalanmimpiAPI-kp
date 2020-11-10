export const getUserAddressByUidSql = `
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
`

export const getCountryByIdSql = `SELECT * FROM countries WHERE id=$1`

export const getCountryByNameSql = `SELECT * FROM countries WHERE country=$1`

export const countCountryByNameSql = `SELECT COUNT(*) FROM countries WHERE country=$1`

export const countCountryByIdSql = `SELECT COUNT(*) FROM countries WHERE id=$1`

export const getProvinceByIdSql = `
SELECT
    provinces.id,
    provinces.province,
    provinces.country_id
    countries.country
FROM provinces
INNER JOIN countries ON provinces.country_id = countries.id
WHERE id=$1 AND country_id=$2
`

export const getProvinceByNameSql = `
SELECT
    provinces.id,
    provinces.province,
    country_id,
    countries.country
FROM provinces
INNER JOIN countries ON provinces.country_id = countries.id
WHERE provinces.province=$1 AND provinces.country_id=$2
`

export const countProvinceByIdSql = `
SELECT COUNT(*)
FROM provinces
INNER JOIN countries ON provinces.country_id = countries.id
WHERE id=$1 AND country_id=$2
`

export const countProvinceByNameSql = `
SELECT COUNT(*)
FROM provinces
INNER JOIN countries ON provinces.country_id = countries.id
WHERE province=$1 AND country_id=$2
`

export const getCityByIdSSql = `
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
`

export const getCityByNameSql = `
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
`

export const countCityByIdSql = `
SELECT COUNT(*)
FROM cities
INNER JOIN provinces ON cities.province_id = provinces.id
INNER JOIN countries ON cities.country_id = countries.id
WHERE id=$1 AND province_id=$2 AND country_id=$3
`

export const countCityByNameSql = `
SELECT COUNT(*)
FROM cities
INNER JOIN provinces ON cities.province_id = provinces.id
INNER JOIN countries ON cities.country_id = countries.id
WHERE city=$1 AND province_id=$2 AND country_id=$3
`