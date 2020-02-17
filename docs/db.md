# Database outline

## Parking Lots
```sql
CREATE TABLE parkingLots (
	parkingLotId BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(50) NOT NULL,
	address VARCHAR(256) NOT NULL,
	areaCode INT UNSIGNED NOT NULL, -- can be used for finding nearby locations
	contactEmail VARCHAR(40),
	contactPhone VARCHAR(15)
);
```


## Parking spots
```sql
CREATE TABLE parkingSpots (
	parkingSpotId BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	parkingLotId BIGINT NOT NULL REFERENCES parkingLots,
	label VARCHAR(10) NOT NULL, -- different lots have different numbering systems
	UNIQUE(parkingLotId, label) -- no duplicate labels in same lot
);
```

## Users

```sql
CREATE TABLE users (
    userId BIGINT UNSIGNED PRIMARY KEY, -- userid has to be randomly generated
    email VARCHAR(128) UNIQUE NOT NULL,
    name VARCHAR(128) NOT NULL,
    hashedPassword CHAR(128) NOT NULL,
    createdTs BIGINT UNSIGNED NOT NULL -- when user signed up
);
```

## Auth tokens
Bearer token based Authentication
```sql
CREATE TABLE authTokens (
    authToken VARCHAR(64) PRIMARY KEY,
    userId BIGINT UNSIGNED REFERENCES users,
    authTokenExpiration DATETIME NOT NULL
);
```
