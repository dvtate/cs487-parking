# API


## **POST** `/user/create`
Add new user to system
### Expected Body
```json
{
    "email" : "dansk99@outlook.com",
    "password" : "dansk99",
    "name" : "Gregory Dan Skep",
    "phone" : "123132421"
}
```
### Expected responses
one of:
- `missing email`
- `missing name`
- `missing phone number`
- `missing password`
- `email already in use, log in instead`
- `success`

### Status codes
- 200, 400, 500


## **POST** `/user/signin`

### Expected Body
```json
{
    "email" : "dansk99@outlook.com",
    "password" : "dansk99"
}
```

### Status codes
- 200, 400, 401


## **POST** `/user/plates/add`
add a plate for the user
### Expected body
```json
{
    "identifier" : "G232-234"
}
```
### Status Codes
- 200, 400, 401

## **GET** `/user/plates`
get all of user's plates
### Expected Response
```json
[
    {
        "identifier":"G232-234"
    }, {
        "identifier":"A32-342F"
    }
]
```
### Status Codes
- 200, 401


## **GET** `/lots/spots/:parkingLotId`
Get a list of parkingspots for given lot including metadata

### Expected Response
- parkingSpotId: global UID for parking spot
- label: can be found on map, lots have different numbering systems
- occupied: in the past 5 mins is the spot occupied?
```json
[
    {
        "parkingSpotId" : 12234214123, 
        "label" : "A25",
        "occupied" : 0
    }, {
        "parkingSpotId" : 1223421412332, 
        "label" : "A26",
        "occupied" : 1
    }
]
```

### Status Codes
- 200, 404


## **GET** `/lots/:parkingLotId`
Relevant information about given parking lot

### Expected Response
```json
{
    "name": "35th & state lot",
    "address" : "231 35th St, Chicago, IL, USA 60616",
    "areaCode" : "60616",
    "contactEmail" : "support@35ststlot.com",
    "contactPhone" : "18003452345"
}
```