# Final Capstone: Restaurant Reservation System - Periodic Tables

## Table of Contents
- [General Info](#general-info)
  - [Live application](#live-application)
  - [Summary](#summary)
- [RESTful APIs](#restful-apis)
- [Technologies](#technologies)
- [Installation](#installation)

## General Info

### Live Application
https://jj-final-capstone-frontend.herokuapp.com/

### Summary 
> You have been hired as a full stack developer at _Periodic Tables_, a startup that is creating a reservation system for fine dining restaurants.
> The software is used only by restaurant personnel when a customer calls to request a reservation.
> The user navigates through the application through the menu bar.
> The user may use the application to:
> * See reservations for the day
> * Seat, edit, remove reservations
> * Look up reservations by phone number
> * Create new reservations
> * Create new seating

## RESTful APIs
> Below you can find the RESTful APIs for the application.

### Get list of reservations

#### Request

`GET /reservations/`

#### Response

```
Status: 200 OK
 []
```

### Create new reservation

#### Request

`POST /reservations/`

#### Response

```
Status: 201 Created
{
            "reservation_id": 1,
            "created_at": "2020-12-10T08:30:32.326Z",
            "updated_at": "2020-12-10T08:30:32.326Z",
            "first_name": "Rick",
            "last_name": "Sanchez",
            "mobile_number": "202-555-0164",
            "people": 6,
            "reservation_date": "2020-12-31T06:00:00.000Z",
            "reservation_time": "20:00:00",
            "status": null
        }
```

### Get information on specific reservation by reservation_id

#### Request

`GET /reservations/:reservation_id`

#### Response

```
Status: 200 OK
{
        "reservation_id": 2,
        "created_at": "2020-12-10T08:31:32.326Z",
        "updated_at": "2020-12-10T08:31:32.326Z",
        "first_name": "Frank",
        "last_name": "Palicky",
        "mobile_number": "202-555-0153",
        "people": 1,
        "reservation_date": "2020-12-30T06:00:00.000Z",
        "reservation_time": "20:00:00",
        "status": null
    }
```

### Edit existing reservation by reservation_id

#### Request

`PUT /reservations/:reservation_id`

#### Response

```
Status: 200 OK
{
        "reservation_id": 2,
        "created_at": "2020-12-10T08:31:32.326Z",
        "updated_at": "2020-12-10T08:31:32.326Z",
        "first_name": "Frank",
        "last_name": "Palicky",
        "mobile_number": "202-555-0153",
        "people": 4,
        "reservation_date": "2020-12-30T06:00:00.000Z",
        "reservation_time": "20:00:00",
        "status": null
    }
```

### Update reservation status by reservation_id

#### Request

`PUT /reservations/:reservation_id/status`

#### Response

```
Status: 200 OK
{
        "reservation_id": 2,
        "created_at": "2020-12-10T08:31:32.326Z",
        "updated_at": "2020-12-10T08:31:32.326Z",
        "first_name": "Frank",
        "last_name": "Palicky",
        "mobile_number": "202-555-0153",
        "people": 4,
        "reservation_date": "2020-12-30T06:00:00.000Z",
        "reservation_time": "20:00:00",
        "status": "canceled"
    }
```

### Get list of tables

#### Request

`GET /tables/`

#### Response

```
Status: 200 OK
 []
```

### Create new table

#### Request

`POST /tables/`

#### Response

```
Status: 201 Created
 {
            "table_id": 3,
            "table_name": "#1",
            "capacity": 6,
            "status": "free",
            "reservation_id": null,
            "created_at": "2021-10-01T16:29:47.220Z",
            "updated_at": "2021-10-01T16:29:47.220Z"
        }
```

### Update table status to be seated

#### Request

`PUT /tables/:table_id/seat`

#### Response

```
Status: 200 OK
{
            "table_id": 3,
            "table_name": "#1",
            "capacity": 6,
            "status": "seated",
            "reservation_id": null,
            "created_at": "2021-10-01T16:29:47.220Z",
            "updated_at": "2021-10-01T16:29:47.220Z"
        }
```

### Update table status to finished

#### Request

`DELETE /tables/:table_id/seat`

#### Response


```
Status: 200 OK
{
            "table_id": 3,
            "table_name": "#1",
            "capacity": 6,
            "status": "finished",
            "reservation_id": null,
            "created_at": "2021-10-01T16:29:47.220Z",
            "updated_at": "2021-10-01T16:29:47.220Z"
        }
```


## Technologies
Project is created with:
* React.js
* CSS
* Bootstrap
* Node.js
* Express
* Knex
* PostgreSQL

## Installation

1. Fork and clone this repository.
1. Run `cp ./back-end/.env.sample ./back-end/.env`.
1. Update the `./back-end/.env` file with the connection URL's to your ElephantSQL database instance.
1. Run `cp ./front-end/.env.sample ./front-end/.env`.
1. You should not need to make changes to the `./front-end/.env` file unless you want to connect to a backend at a location other than `http://localhost:5000`.
1. Run `npm install` to install project dependencies.
1. Run `npm run start:dev` to start your server in development mode.
