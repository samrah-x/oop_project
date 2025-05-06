# Parking Management System

i have lost my sanity. please don't send help

## Configuration

### Database Setup

1. Create a PostgreSQL database:
```sql
CREATE DATABASE parking_system;
```

2. Update database configuration in `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/parking_system
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### Google OAuth2 Setup

1. Create a project in Google Cloud Console
2. Enable OAuth2 APIs
3. Create OAuth2 credentials
4. Configure the following in `application.properties`:
```properties
spring.security.oauth2.client.registration.google.client-id=your_client_id
spring.security.oauth2.client.registration.google.client-secret=your_client_secret
```

## Building and Running

1. Clone the repository:
```bash
git clone https://github.com/yourusername/parking-system.git
cd parking-system
```

2. Build the project:
```bash
mvn clean install
```

3. Run the application:
```bash
mvn spring-boot:run
```

The application will be available at `http://localhost:8080/api`

## API Documentation

Once the application is running, you can access the Swagger UI at:
`http://localhost:8080/api/swagger-ui.html`

### Main Endpoints

#### Authentication
- `POST /auth/register` - Register as a user or admin
  - **Request Body**:
    ```json
    {
      "name": "John Doe",
      "email": "johndoe@example.com",
      "password": "password123",
      "isAdmin": true
    }
    ```
  - **Response**:
    ```json
    {
      "message": "User registered successfully."
    }
    ```

- `POST /auth/login` - Login as a user or admin
  - **Request Body**:
    ```json
    {
      "email": "johndoe@example.com",
      "password": "password123"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Login successful."
    }
    ```

#### User Operations
- `POST /api/users/me` - Get current user details
  - **Response**:
    ```json
    {
      "id": 1,
      "name": "John Doe",
      "email": "johndoe@example.com",
      "role": "USER"
    }
    ```

- `GET /api/users/wallet` - Get wallet details
  - **Response**:
    ```json
    {
      "balance": 500
    }
    ```

- `POST /api/users/wallet/topup` - Top up wallet
  - **Request Body**:
    ```json
    {
      "amount": 1000
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Wallet topped up successfully.",
      "newBalance": 1500
    }
    ```

- `GET /api/users/transactions` - Get transaction history
  - **Response**:
    ```json
    [
      {
        "id": 1,
        "amount": 500,
        "type": "DEBIT",
        "timestamp": "2025-05-06T10:00:00Z"
      },
      {
        "id": 2,
        "amount": 1000,
        "type": "CREDIT",
        "timestamp": "2025-05-06T11:00:00Z"
      }
    ]
    ```

#### Booking Operations
- `POST /api/bookings` - Create new booking
  - **Request Body**:
    ```json
    {
      "slotId": 1,
      "startTime": "2025-05-06T10:00:00Z"
    }
    ```
  - **Response**:
    ```json
    {
      "bookingId": 1,
      "slotId": 1,
      "startTime": "2025-05-06T10:00:00Z",
      "status": "ACTIVE"
    }
    ```

- `GET /api/bookings/user` - Get user's bookings
  - **Response**:
    ```json
    [
      {
        "bookingId": 1,
        "slotId": 1,
        "startTime": "2025-05-06T10:00:00Z",
        "status": "ACTIVE"
      }
    ]
    ```

- `GET /api/bookings/active` - Get user's active booking
  - **Response**:
    ```json
    {
      "bookingId": 1,
      "slotId": 1,
      "startTime": "2025-05-06T10:00:00Z",
      "status": "ACTIVE"
    }
    ```

- `POST /api/bookings/{bookingId}/complete` - Complete a booking
  - **Response**:
    ```json
    {
      "message": "Booking completed successfully."
    }
    ```

#### Admin Operations
- `POST /api/admin/parking/areas` - Create parking area
  - **Request Body**:
    ```json
    {
      "name": "Main Parking Area",
      "location": "Downtown",
      "totalSlots": 50
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Parking area created successfully.",
      "areaId": 1
    }
    ```

- `GET /api/admin/parking/areas` - Get all parking areas
  - **Response**:
    ```json
    [
      {
        "areaId": 1,
        "name": "Main Parking Area",
        "location": "Downtown",
        "totalSlots": 50,
        "isActive": true
      }
    ]
    ```

- `DELETE /api/admin/parking/areas/{areaId}` - Deactivate parking area
  - **Response**:
    ```json
    {
      "message": "Parking area deactivated successfully."
    }
    ```

- `PATCH /api/admin/parking/slots/{slotId}` - Update slot status
  - **Request Body**:
    ```json
    {
      "status": "OCCUPIED"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Slot status updated successfully."
    }
    ```

## Security

The application uses:
- OAuth2 for authentication
- JWT for session management
- Role-based access control
- HTTPS for all communications (in production)

## Business Rules

- Bookings are same-day only
- Fixed 12-hour slot duration
- Fixed rate of Rs.50 per slot
- One active booking per user
- Wallet top-up through EasyPaisa or JazzCash only

## Error Handling

The application provides detailed error responses:
- Validation errors with field-level details
- Business rule violations
- Authentication/Authorization errors
- System errors

## Testing

Run the tests using:
```bash
mvn test
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the Apache License 2.0 - see the LICENSE file for details.

## Application Flow

1. **Registration**:
   - Users and admins can register via `/auth/register`.
   - Admins manage parking areas, while users book slots.

2. **Login**:
   - Users and admins log in via `/auth/login`.

3. **Admin Operations**:
   - Admins create and manage parking areas and slots.

4. **User Operations**:
   - Users book slots, view wallet details, and manage bookings.

5. **Security**:
   - OAuth2 and JWT ensure secure authentication and session management.