# Database

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

## User License Plates
```sql
CREATE TABLE userLicensePlates (
	userId BIGINT UNSIGNED REFERENCES users,
	identifier VARCHAR(25),
	addedTs BIGINT UNSIGNED,
	UNIQUE(userId, identifier)
);
```

## Parking Lots
```sql
CREATE TABLE parkingLots (
	parkingLotId BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	pin CHAR(6) UNIQUE NOT NULL,
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
	occupied BOOL DEFAULT 0, -- populated by sensor server
	UNIQUE(parkingLotId, label) -- no duplicate labels in same lot
);
```

## One-time Reservations
```sql
CREATE TABLE onetimeReservations (
	parkingSpotId BIGINT REFERENCES parkingSpots,
	userId BIGINT REFERENCES users,
	startTs BIGINT
);
```

## Recurring Reservations
```sql
CREATE TABLE repeatReservations (
	parkingSpotId BIGINT REFERENCES parkingSpots,
	userId BIGINT REFERENCES users,
	startHour TINYINT(2),
	endHour TINYINT(2),
	days SET("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"),
);
```