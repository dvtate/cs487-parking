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