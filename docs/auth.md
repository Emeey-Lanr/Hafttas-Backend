# Haftas API

Haftas is an anonymous messaging app. It allows you to create an anonymous message link with a description that befits the situation, allowing you to recieve anonymous message via the link shared with your family, friends and enemies.

## Getting Started

- Authentication
  - Signup
  - Signin
  - Forgot Password
  - 4DigitPinsVerification
  - Token Verification
  - Reset password

## Authentication [ Signup ]

<mark>POST</mark> hafttas-backend.onrender.com/auth/signup

**DATA**

```json
{
"username":"Zen",
"email":"zender01@gmail.com",
"password":"039dh4u"
}
```

**_Note_** The password must be aleast six characters

#### Response



``` json
  {
    "message": "User created succesfully",
    "data": {
        "userInfo": {
            "username": "Zen",
            "email": "zender01@gmail.com",
            "password": "$2a$05$tMulut16.IP0phk4Ks/fWOzZvpBu8KAIskA6vn5o2XkSp1Mw94cFS",
            "img_url": "",
            "_id": "65f27f5c833e6316d7ca2e10",
            "__v": 0
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkVtZWV5X0xhbnIiLCJlbWFpbCI6ImVtZWV5bGFucjA0QGdtYWlsLmNvbSIsImlhdCI6MTcxMDM5MTEzMiwiZXhwIjoxNzEwNDA1NTMyfQ.HpbBbCBRZFg3RzMH3wgiqFJalyxNqEgowRXtMHopO_Q"
    }
}
```

## Authentication [Signin]

<mark>POST</mark> hafttas-backend.onrender.com/auth/signup

**DATA**
```json
{
"username":"Zen",
"password":"039dh4u"
}
```

**response**
```json
{
    "message": "Valid Login Attempt",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkVtZWV5X0xhbnIiLCJlbWFpbCI6ImVtZWV5bGFucjA0QGdtYWlsLmNvbSIsImlhdCI6MTcxMDQwNjkzNCwiZXhwIjoxNzEwNDIxMzM0fQ.HqvKlp7QaGqvwXYY_rwJRTuJItLAhzr9S-QCEGMBip8"
    }
}
```

## Authentication [Forgot Password]
<mark>POST</mark> hafttas-backend.onrender.com/auth/forgot/password

**DATA**
```json
{
    "usernameOrEmail":"emeeylanr04@gmail.com"
}
```
you can use either you email or your username for the forgot password authentication

**Output**

```json
{
    "message": "An email has been sent to @emeeylanr04@gmail.com contains a 4 digit pin and expires in 1hr",
    "data": {
        "email": "zender01@gmail.com",
        "username": "Zen",
        "jwtToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtZWV5bGFucjA0QGdtYWlsLmNvbSIsInBhc3N3b3JkVG9rZW4iOiI4MzA3IiwiaWF0IjoxNzEwNzYyNTQ1LCJleHAiOjE3MTA3NjYxNDV9.CJn4G5DWPb8vTg3KPa9axOZCHhRbeyKJBG-pkBQiHZE"
    }
}
```

## Authentication [4DigitPinsVerification]

Note : This is meant veryfying the 4 digit pins verification

<mark>POST</mark> hafttas-backend.onrender.com/auth/forgot/password/pin/verification

``` json
{
"jwtToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtZWV5bGFucjA0QGdtYWlsLmNvbSIsInBhc3N3b3JkVG9rZW4iOiI4MzA3IiwiaWF0IjoxNzEwNzYyNTQ1LCJleHAiOjE3MTA3NjYxNDV9.CJn4G5DWPb8vTg3KPa9axOZCHhRbeyKJBG-pkBQiHZE",
 "pin": "8307"
}
```
**Output**

```json
{
    "message": "Pin validation attemmpt valid",
    "data": {
        "jwtToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJpZmljYXRpb24iOnRydWUsImVtYWlsIjoiZW1lZXlsYW5yMDRAZ21haWwuY29tIiwiaWF0IjoxNzEwNzYyOTQxLCJleHAiOjE3MTA3NjY1NDF9.oXWCbfwNhYIuR_ji3goHrgDN9iecuexwQtaYCcrN9a4"
    }
}
```

## Authentication [tokenVerification]


<mark> GET </mark> hafttas-backend.onrender.com/auth/verify/password/token

``` json
 {
    "headers":{
        "authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJpZmljYXRpb24iOnRydWUsImVtYWlsIjoiZW1lZXlsYW5yMDRAZ21haWwuY29tIiwiaWF0IjoxNzEwNzYyOTQxLCJleHAiOjE3MTA3NjY1NDF9.oXWCbfwNhYIuR_ji3goHrgDN9iecuexwQtaYCcrN9a4"
    }
 }
```

**Output**
``` json
{
    "message": " valid",
    "data": {
        "email": "zender@gmail.com"
    }
}
```


## Authentication [Reset password]
<mark>POST</mark> hafttas-backend.onrender.com/auth/resetPassword

```json
{
"email":"zender01@gmail.com",
"password":"123456"
}
```

**Respone**

```
{
    "message": "Password reset done succesfully",
    "data": {
        "user": {
            "_id": "65f27f5c833e6316d7ca2e10",
            "username": "Emeey_Lanr",
            "email": "emeeylanr04@gmail.com",
            "password": "$2a$05$0CEE8DVRg5twxebCqac2COIHxVTMZ8c3OYYBxlgGT8.DhrEKaUFmK",
            "img_url": "",
            "__v": 0
        }
    }
}
```