# Parking Management System

i have lost my sanity. please don't send help  
As of right now, these are not the final endpoints I'll add more when I can :)  

### Some tiny things to note:  
- OAuth2 for authentication
- JWT for session authentication
- HTTPS for all communications (in production)
  
## Configuration

### Database Setup

The database is user dependent since it's all local. Please follow these steps below and replace the credentials specific to my machine with yours :)  
You have to download PostgreSQL and open pgadmin for your server. Set up the server, then **create a database "parking_system" on the port 5432.** It's important you do this or else errors will occur

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
I'M NOT SURE IF THIS CAN WORK BUT TRY IGNORING THIS SETUP; MY OAUTH2 CLOUD CREDENTIALS ARE SET IN SO IT SHOULDN'T REALLY CAUSE ANY ISSUE

1. Create a project in Google Cloud Console
2. Enable OAuth2 APIs
3. Create OAuth2 credentials
4. Configure the following in `application.properties`:
```properties
spring.security.oauth2.client.registration.google.client-id=your_client_id
spring.security.oauth2.client.registration.google.client-secret=your_client_secret
```

## Building and Running
You may skip this if you have an IDE. Yes, just run the main function when you open it from there. Please make sure to install all dependencies via extensions or else it may cause issues.

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

## Testing  
**These tests were written by AI. I have no clue if they'll work and if they even function properly. Please don't touch this. Please.**
Run the tests using:
```bash
mvn test
```
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

