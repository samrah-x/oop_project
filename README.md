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