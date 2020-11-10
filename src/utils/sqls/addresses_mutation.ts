export const recordUserAddressSql = `
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
`

export const updateUserAddressSql = `
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
`

export const insertCountrySql = `
INSERT INTO countries(country) VALUES($1)
RETURNING *
`

export const updateCountrySql = `
UPDATE countries SET country=$1 WHERE id=$2
RETURNING *
`

export const insertProvinceSql = `
INSERT INTO provinces(province, country_id) VALUES($1, $2)
RETURNING *
`

export const updateProvinceSql = `
UPDATE provinces SET province=$1, country_id=$2
WHERE id=$3
RETURNING *
`

export const insertCitySql = `
INSERT INTO cities(city, province_id, country_id) VALUES($1, $2, $3)
RETURNING *
`

export const updateCitySql = `
UPDATE city SET city=$1, province_id=$2, country_id=$3
WHERE id=$4
RETURNING *
`