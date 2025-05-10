# Parking Control System

A Spring Boot REST API for managing car parks, users, owners, layouts, and rentals.  
Please change the postgres SQL server settings in application.properites. Also, the endpoints are available at localhost:8081

---

## Table of Contents

- [Overview](#overview)
- [User Flow](#user-flow)
- [API Endpoints](#api-endpoints)
  - [Users](#users)
  - [Car Parks](#car-parks)
  - [Owners](#owners)
  - [Park Layouts](#park-layouts)
  - [Park Rentals](#park-rentals)
  - [Rental Details](#rental-details)
- [Request/Response Formats](#requestresponse-formats)
- [Headers](#headers)
- [Setup](#setup)

---

## Overview

This project provides a backend for a parking management system, supporting CRUD operations for users, car parks, owners, layouts, and rentals. It enables administrators to manage parking resources and users to rent parking spots.

---

## User Flow

1. **Admins** create car parks, owners, and layouts.
2. **Users** are registered and managed.
3. **Users** are assigned to parking spots via rentals.
4. **All actions** are tracked and can be audited through rental details.

---

## API Endpoints

### Users

| Method | Endpoint                              | Description                        |
|--------|---------------------------------------|------------------------------------|
| GET    | `/api/users/getAll`                   | List all users                     |
| GET    | `/api/users/getAllSorted`             | List all users, sorted             |
| POST   | `/api/users/add`                      | Add a new user                     |
| PUT    | `/api/users/update`                   | Update an existing user            |
| DELETE | `/api/users/delete/{id}`              | Delete a user by ID                |
| GET    | `/api/users/getByPlaque`              | Find user by license plate         |
| GET    | `/api/users/getByPlaqueContains`      | Find users by plate substring      |
| GET    | `/api/users/getByPlaqueStartsWith`    | Find users by plate prefix         |

### Car Parks

| Method | Endpoint                              | Description                        |
|--------|---------------------------------------|------------------------------------|
| GET    | `/api/carParks/getall`                | List all car parks                 |
| POST   | `/api/carParks/add`                   | Add a new car park                 |
| PUT    | `/api/carParks/update`                | Update a car park                  |
| DELETE | `/api/carParks/delete/{id}`           | Delete a car park by ID            |
| GET    | `/api/carParks/getByName`             | Get car park by name               |
| GET    | `/api/carParks/getAllAsc`             | List all car parks, sorted         |

### Owners

| Method | Endpoint                              | Description                        |
|--------|---------------------------------------|------------------------------------|
| GET    | `/api/owners/getall`                  | List all owners                    |
| POST   | `/api/owners/add`                     | Add a new owner                    |
| PUT    | `/api/owners/update`                  | Update an owner                    |
| DELETE | `/api/owners/delete/{id}`             | Delete an owner by ID              |

### Park Layouts

| Method | Endpoint                                         | Description                        |
|--------|--------------------------------------------------|------------------------------------|
| GET    | `/api/parkLayouts/getall`                        | List all park layouts              |
| GET    | `/api/parkLayouts/getByName`                     | Get park layout by name            |
| GET    | `/api/parkLayouts/getByNameAndCarParkId`         | Get layout by name and car park ID |
| GET    | `/api/parkLayouts/getAllAsc`                     | List all layouts, sorted           |

### Park Rentals

| Method | Endpoint                              | Description                        |
|--------|---------------------------------------|------------------------------------|
| GET    | `/api/parkRentals/getAll`             | List all park rentals              |
| POST   | `/api/parkRentals/add`                | Add a new park rental              |
| PUT    | `/api/parkRentals/update`             | Update a park rental               |
| DELETE | `/api/parkRentals/delete/{id}`        | Delete a park rental by ID         |

### Rental Details

| Method | Endpoint                              | Description                        |
|--------|---------------------------------------|------------------------------------|
| GET    | `/api/rentalDetails/getAll`           | List all rental details            |

---

## Request/Response Formats

### Common Headers

- `Content-Type: application/json`
- `Accept: application/json`

### Example Request Bodies

#### User

```json
{
  "id": 1,
  "name": "John Doe",
  "plaque": "ABC123"
}
```

#### Car Park

```json
{
  "id": 1,
  "name": "Central Park",
  "location": "Downtown"
}
```

#### Owner

```json
{
  "id": 1,
  "name": "Owner Name"
}
```

#### Park Layout

```json
{
  "id": 1,
  "name": "A",
  "carParkId": 1
}
```

#### Park Rental

```json
{
  "id": 1,
  "userId": 1,
  "carParkId": 1,
  "layoutId": 1,
  "startDate": "2024-01-01",
  "endDate": "2024-01-31"
}
```

### Example Response Bodies

#### Success

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* entity or list */ }
}
```

#### Error

```json
{
  "success": false,
  "message": "Error message"
}
```

---

## Headers

- All endpoints expect and return `application/json`.
- For POST/PUT requests, include `Content-Type: application/json`.

---

## Setup

1. Clone the repository.
2. Configure `server.port` in [`application.properties`](ParkingControlSystem/src/main/resources/application.properties) if needed.
3. Build and run with Maven:
   ```
   ./mvnw spring-boot:run
   ```
4. Access the API at `http://localhost:{port}/api/`

---

## Notes

- Replace example request/response bodies with actual entity fields as needed.
- All endpoints follow RESTful conventions.
- Authentication/authorization is not included by default.

## CarParksController Endpoints

### GET `/api/carParks/getall`
**Response Body:**
```json
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 0,
      "name": "string",
      "createDate": "2024-05-10T00:00:00.000+00:00",
      "updateDate": "2024-05-10T00:00:00.000+00:00",
      "capacity": 0,
      "unitPrice": 0.0,
      "owner": {/* Owner object */},
      "parkLayouts": null
    }
  ]
}
```

### POST `/api/carParks/add`
**Request Body:**
```json
{
  "name": "string",
  "createDate": "2024-05-10T00:00:00.000+00:00",
  "updateDate": "2024-05-10T00:00:00.000+00:00",
  "capacity": 0,
  "unitPrice": 0.0,
  "owner": {/* Owner object */}
}
```
**Response Body:**
```json
{
  "success": true,
  "message": "string"
}
```

### PUT `/api/carParks/update`
**Request Body:** Same as POST `/api/carParks/add`
**Response Body:** Same as POST `/api/carParks/add`

### DELETE `/api/carParks/delete/{id}`
**Response Body:** No content

### GET `/api/carParks/getByName?name={name}`
**Response Body:**
```json
{
  "success": true,
  "message": "string",
  "data": {
    "id": 0,
    "name": "string",
    "createDate": "2024-05-10T00:00:00.000+00:00",
    "updateDate": "2024-05-10T00:00:00.000+00:00",
    "capacity": 0,
    "unitPrice": 0.0,
    "owner": {/* Owner object */},
    "parkLayouts": null
  }
}
```

### GET `/api/carParks/getAllAsc`
**Response Body:** Same as GET `/api/carParks/getall`

## OwnersController Endpoints

### GET `/api/owners/getall`
**Response Body:**
```json
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 0,
      "name": "string",
      "surname": "string",
      "email": "string",
      "phoneNumber": "string",
      "createDate": "2024-05-10T00:00:00.000+00:00",
      "carParks": null
    }
  ]
}
```

### POST `/api/owners/add`
**Request Body:**
```json
{
  "name": "string",
  "surname": "string",
  "email": "string",
  "phoneNumber": "string",
  "createDate": "2024-05-10T00:00:00.000+00:00"
}
```
**Response Body:**
```json
{
  "success": true,
  "message": "string"
}
```

### PUT `/api/owners/update`
**Request Body:** Same as POST `/api/owners/add`
**Response Body:** Same as POST `/api/owners/add`

### DELETE `/api/owners/delete/{id}`
**Response Body:** No content

## ParkLayoutsController Endpoints

### GET `/api/parkLayouts/getall`
**Response Body:**
```json
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 0,
      "name": "string",
      "carPark": null,
      "parkRentals": null
    }
  ]
}
```

### GET `/api/parkLayouts/getByName?name={name}`
**Response Body:**
```json
{
  "success": true,
  "message": "string",
  "data": {
    "id": 0,
    "name": "string",
    "carPark": null,
    "parkRentals": null
  }
}
```

### GET `/api/parkLayouts/getByNameAndCarParkId?name={name}&carParkId={carParkId}`
**Response Body:** Same as GET `/api/parkLayouts/getByName`

### GET `/api/parkLayouts/getAllAsc`
**Response Body:** Same as GET `/api/parkLayouts/getall`

## ParkRentalsController Endpoints

### GET `/api/parkRentals/getAll`
**Response Body:**
```json
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 0,
      "rentDate": "2024-05-10T00:00:00.000+00:00",
      "endDate": "2024-05-10T00:00:00.000+00:00",
      "user": {/* User object */},
      "parkLayout": {/* ParkLayout object */},
      "rentalDetail": {/* RentalDetail object */}
    }
  ]
}
```

### POST `/api/parkRentals/add`
**Request Body:**
```json
{
  "rentDate": "2024-05-10T00:00:00.000+00:00",
  "endDate": "2024-05-10T00:00:00.000+00:00",
  "userId": 0,
  "parkLayoutId": 0
}
```
**Response Body:**
```json
{
  "success": true,
  "message": "string"
}
```

### PUT `/api/parkRentals/update`
**Request Body:**
```json
{
  "id": 0,
  "rentDate": "2024-05-10T00:00:00.000+00:00",
  "endDate": "2024-05-10T00:00:00.000+00:00",
  "userId": 0,
  "parkLayoutId": 0
}
```
**Response Body:** Same as POST `/api/parkRentals/add`

### DELETE `/api/parkRentals/delete/{id}`
**Response Body:**
```json
{
  "success": true,
  "message": "string",
  "data": {
    "id": 0,
    "rentDate": "2024-05-10T00:00:00.000+00:00",
    "endDate": "2024-05-10T00:00:00.000+00:00",
    "user": {/* User object */},
    "parkLayout": {/* ParkLayout object */},
    "rentalDetail": {/* RentalDetail object */}
  }
}
```

## RentalDetailsController Endpoints

### GET `/api/rentalDetails/getAll`
**Response Body:**
```json
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 0,
      "totalPrice": 0.0,
      "paymentPrice": 0.0,
      "paymentDate": "2024-05-10T00:00:00.000+00:00",
      "parkRental": {/* ParkRental object */}
    }
  ]
}
```

## UsersController Endpoints

### GET `/api/users/getAll`
**Response Body:**
```json
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 0,
      "plaque": "string",
      "createDate": "2024-05-10T00:00:00.000+00:00",
      "parkRental": null
    }
  ]
}
```

### GET `/api/users/getAllSorted`
**Response Body:** Same as GET `/api/users/getAll`

### POST `/api/users/add`
**Request Body:**
```json
{
  "plaque": "string",
  "createDate": "2024-05-10T00:00:00.000+00:00"
}
```
**Response Body:**
```json
{
  "success": true,
  "message": "string"
}
```

### PUT `/api/users/update`
**Request Body:** Same as POST `/api/users/add`
**Response Body:** Same as POST `/api/users/add`

### DELETE `/api/users/delete/{id}`
**Response Body:**
```json
{
  "success": true,
  "message": "string"
}
```

### GET `/api/users/getByPlaque?plaque={plaque}`
**Response Body:**
```json
{
  "success": true,
  "message": "string",
  "data": {
    "id": 0,
    "plaque": "string",
    "createDate": "2024-05-10T00:00:00.000+00:00",
    "parkRental": null
  }
}
```

### GET `/api/users/getByPlaqueContains?plaque={plaque}`
**Response Body:** Same as GET `/api/users/getAll`

### GET `/api/users/getByPlaqueStartsWith?plaque={plaque}`
**Response Body:** Same as GET `/api/users/getAll`
