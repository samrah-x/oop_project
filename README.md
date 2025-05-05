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

#### User Operations
- `POST /api/users/me` - Get current user details
- `GET /api/users/wallet` - Get wallet details
- `POST /api/users/wallet/topup` - Top up wallet
- `GET /api/users/transactions` - Get transaction history

#### Booking Operations
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/user` - Get user's bookings
- `GET /api/bookings/active` - Get user's active booking
- `POST /api/bookings/{bookingId}/complete` - Complete a booking

#### Admin Operations
- `POST /api/admin/parking/areas` - Create parking area
- `GET /api/admin/parking/areas` - Get all parking areas
- `DELETE /api/admin/parking/areas/{areaId}` - Deactivate parking area
- `PATCH /api/admin/parking/slots/{slotId}` - Update slot status

## Testing  
**These tests were written by AI. I have no clue if they'll work and if they even function properly. Please don't touch this. Please.**
Run the tests using:
```bash
mvn test
```
