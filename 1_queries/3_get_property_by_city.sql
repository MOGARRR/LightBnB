SELECT properties.id as id, properties.title as title, properties.cost_per_night as cost_per_night, AVG(rating) as average_rating
FROM property_reviews
JOIN properties ON property_id = properties.id
WHERE properties.city = 'Vancouver'
GROUP BY properties.id
HAVING AVG(rating) >= 4
ORDER BY cost_per_night
LIMIT 10;