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

### Google OAuth2 Authentication Flow

#### Setup
1. Create a project in Google Cloud Console
2. Enable OAuth2 APIs and create credentials
3. Configure OAuth consent screen with authorized domains
4. Add OAuth2 credentials in `application.properties`:
```properties
spring.security.oauth2.client.registration.google.client-id=your_client_id
spring.security.oauth2.client.registration.google.client-secret=your_client_secret
spring.security.oauth2.client.registration.google.redirect-uri={baseUrl}/login/oauth2/code/google
```

#### Authentication Flow

##### Sign Up Process
1. User clicks "Sign in with Google" button
2. User is redirected to Google's consent page
3. After consent, Google sends an authorization code to our redirect URI
4. Our server:
   - Exchanges the code for Google OAuth2 tokens
   - Retrieves user information from Google:
   ```json
   {
     "sub": "115...", // Google's unique user ID
     "name": "John Doe",
     "given_name": "John",
     "family_name": "Doe",
     "picture": "https://lh3.googleusercontent.com/a/...",
     "email": "john@gmail.com",
     "email_verified": true,
     "locale": "en"
   }
   - Creates a new user account if one doesn't exist
   - Generates a JWT token for subsequent requests
   - Returns the JWT token and user info:
   ```json
   {
     "token": "eyJhbGciOiJIUzI1...",
     "user": {
       "id": 1,
       "name": "John Doe",
       "email": "john@example.com",
       "role": "USER"
     }
   }
   ```

##### Sign In Process
1. User clicks "Sign in with Google" button
2. User is redirected to Google's consent page (if not already authenticated with Google)
3. After consent/authentication:
   - Server receives Google OAuth2 tokens:
   ```json
   {
     "access_token": "ya29.a0AfB_...",
     "expires_in": 3599,
     "scope": "email profile openid",
     "token_type": "Bearer",
     "id_token": "eyJhbGciOiJSUzI..."
   }
   - Verifies user exists in our database
   - Generates a new JWT token
   - Returns the JWT token and user info:
   ```json
   {
     "token": "eyJhbGciOiJIUzI1...",
     "user": {
       "id": 1,
       "name": "John Doe",
       "email": "john@example.com",
       "role": "USER"
     }
   }
   ```

##### JWT Token Usage
- All subsequent API requests must include the JWT token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```
- JWT tokens are valid for a configured period (default: 24 hours)
- Tokens can be refreshed using the refresh token endpoint

##### Error Handling
- Invalid/Expired tokens return 401 Unauthorized
- Missing permissions return 403 Forbidden
- Failed Google authentication returns 401 with error details

##### Security Notes
- HTTPS is required in production
- JWT tokens are signed with a secure key
- Refresh tokens are stored securely
- User permissions are checked on every request

#### Frontend Implementation
To implement Google Sign-In in your frontend application:

1. Simple Link/Button Approach (No Library Required):
```html
<a href="/api/oauth2/authorization/google">Sign in with Google</a>
```
This redirects to Google's authentication page and handles the entire OAuth2 flow.

2. After successful authentication:
- User is redirected to `/auth/google/callback`
- Backend processes the authentication
- Frontend receives JWT token and user info in response
- Store the token (e.g., in localStorage) for future API calls

3. Using the token in API calls:
```javascript
fetch('/api/endpoint', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
```

4. Token refresh:
- When token expires (401 response), call refresh endpoint
- Send expired token in Authorization header
- Receive new token in response
- Update stored token and retry failed request

## Building and Running

### Prerequisites
1. Java 17 or higher
2. Maven 3.6 or higher
3. PostgreSQL 12 or higher
4. Git

### Building the Project
1. Clone the repository:
```bash
git clone https://github.com/yourusername/parking-system.git
cd parking-system
```

2. Build with all dependencies:
```bash
mvn clean install -DskipTests    # Skip tests for first build
mvn dependency:resolve           # Resolve and download all dependencies
mvn dependency:tree             # (Optional) View dependency hierarchy
```

3. Build with tests:
```bash
mvn clean install               # Full build with tests
```

### Running the Application

1. Method 1 - Maven:
```bash
mvn spring-boot:run
```

2. Method 2 - JAR file:
```bash
java -jar target/parking-system-0.0.1-SNAPSHOT.jar
```

3. Method 3 - IDE:
- Open project in your IDE (IntelliJ IDEA, Eclipse, VS Code)
- Run ParkingSystemApplication.java

The application will be available at `http://localhost:8080/api`

### Verifying Installation
1. Check Dependencies:
```bash
mvn verify                      # Verify project and dependencies
mvn dependency:analyze         # Analyze dependency usage
```

2. Check Application:
- Access Swagger UI: `http://localhost:8080/api/swagger-ui/index.html`
- Run Postman collection (provided in repository)
- Check actuator health: `http://localhost:8080/api/actuator/health`

## API Documentation

Once the application is running, you can access the Swagger UI at:
`http://localhost:8080/api/swagger-ui/index.html`

### Main Endpoints

### Required Headers
For all authenticated endpoints:
```
Authorization: Bearer <jwt_token>
```

For endpoints with request bodies:
```
Content-Type: application/json
```

#### Authentication
- `POST /auth/register` - Register as a user or admin
  - **Request Body**:
    ```json
    {
      "name": "John Doe",
      "email": "johndoe@example.com",
      "password": "password123",
      "role": "ADMIN"  // Use "ADMIN" or "USER"
    }
    ```
  - **Response**:
    ```json
    {
      "token": "eyJhbGciOiJIUzI1...",
      "user": {
        "id": 1,
        "name": "John Doe",
        "email": "johndoe@example.com",
        "role": "ADMIN"
      }
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
      "token": "eyJhbGciOiJIUzI1...",
      "user": {
        "id": 1,
        "name": "John Doe",
        "email": "johndoe@example.com",
        "role": "ADMIN"
      }
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

##### Parking Areas
All endpoints require the following headers:
```
Authorization: Bearer <jwt_token>
Content-Type: application/json  (for POST and PATCH requests)
```

- `POST /api/admin/parkingAreas` - Create parking area
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

- `GET /api/admin/parkingAreas` - Get all parking areas
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

- `DELETE /api/admin/parkingAreas/{areaId}` - Deactivate parking area
  - **Response**:
    ```json
    {
      "message": "Parking area deactivated successfully."
    }
    ```

- `PATCH /api/admin/parkingAreas/slots/{slotId}` - Update slot status
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

- `GET /api/admin/parkingAreas/{id}` - Get parking slots for a specific area
  - **Response**:
    ```json
    [
      {
        "id": 1,
        "slotNumber": "001",
        "isAvailable": true,
        "vehicleType": "CARS_ONLY"
      }
    ]
    ```

- `POST /api/admin/parkingAreas/{id}` - Add parking slots to an area
  - **Request Body**:
    ```json
    {
      "additionalSlots": 5
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Parking slots added successfully"
    }
    ```

##### Bookings Management
All endpoints require the following headers:
```
Authorization: Bearer <jwt_token>
```

- `GET /api/admin/bookings/active` - Get all active bookings
  - **Response**:
    ```json
    [
      {
        "id": 1,
        "user": {
          "name": "John Doe",
          "email": "john@example.com"
        },
        "parkingSlot": {
          "slotNumber": "001",
          "area": "Main Parking"
        },
        "startTime": "2025-05-06T10:00:00Z",
        "endTime": "2025-05-06T14:00:00Z",
        "status": "ACTIVE"
      }
    ]
    ```

- `GET /api/admin/bookings/past` - Get all past bookings
  - **Response**:
    ```json
    [
      {
        "id": 1,
        "user": {
          "name": "John Doe",
          "email": "john@example.com"
        },
        "parkingSlot": {
          "slotNumber": "001",
          "area": "Main Parking"
        },
        "startTime": "2025-05-05T10:00:00Z",
        "endTime": "2025-05-05T14:00:00Z",
        "status": "COMPLETED"
      }
    ]
    ```

- `GET /api/admin/bookings/all` - Get all bookings (active and past)
  - **Response**:
    ```json
    [
      {
        "id": 1,
        "user": {
          "name": "John Doe",
          "email": "john@example.com"
        },
        "parkingSlot": {
          "slotNumber": "001",
          "area": "Main Parking"
        },
        "startTime": "2025-05-06T10:00:00Z",
        "endTime": "2025-05-06T14:00:00Z",
        "status": "ACTIVE"
      }
    ]
    ```

##### Reports
All endpoints require the following headers:
```
Authorization: Bearer <jwt_token>
```

- `GET /api/admin/reports/revenue` - Get revenue report
  - **Response**:
    ```json
    {
      "totalRevenue": 5000.00,
      "totalBookings": 50
    }
    ```

- `GET /api/admin/reports/occupancy` - Get occupancy report
  - **Response**:
    ```json
    {
      "areas": {
        "Main Parking": {
          "totalSlots": 50,
          "availableSlots": 30,
          "occupiedSlots": 20,
          "occupancyRate": "40.00%"
        },
        "VIP Parking": {
          "totalSlots": 20,
          "availableSlots": 15,
          "occupiedSlots": 5,
          "occupancyRate": "25.00%"
        }
      }
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

