API Documentation
Base URL

bash

http://localhost:4000/api

Endpoints
Authentification
POST /auth/signin

    Description: Log in with a username and password.
    Request Body:
        username: string
        password: string
    Response:
        200 OK
            token: string
        401 Unauthorized
            message: Invalid credentials

POST /auth/signup

    Description: Create a new user account.
    Request Body:
        username: string
        password: string
    Response:
        201 Created
            token: string
        500 Internal Server Error
            message: Error message

Accident
GET /accident

    Description: Retrieve accident information.
    Response:
        200 OK
            daysWithoutAccident: number
            recordDaysWithoutAccident: number
            numberOfAccidentsSinceStartOfTheYear: number
            scrollingText: string
            resetOnNewYear: boolean
        404 Not Found
            message: Accident Info not found
        500 Internal Server Error
            message: Error message

PUT /accident

    Description: Update all the accident information.
    Request Body:
        daysWithoutAccident: number
        recordDaysWithoutAccident: number
        numberOfAccidentsSinceStartOfTheYear: number
        scrollingText: string
        resetOnNewYear: boolean
    Response:
        200 OK
            daysWithoutAccident: number
            recordDaysWithoutAccident: number
            numberOfAccidentsSinceStartOfTheYear: number
            scrollingText: string
            resetOnNewYear: boolean
        500 Internal Server Error
            message: Error message

PUT /accident/update-reset

    Description: Update the resetOnNewYear value.
    Request Body:
        resetOnNewYear: boolean
    Response:
        200 OK
            resetOnNewYear: boolean
        500 Internal Server Error
            message: Error message