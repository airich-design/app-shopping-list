# Shopping List Application

## Docker Setup

This application uses Docker Compose to run MongoDB. Here's how to get started:

### Prerequisites

- Docker
- Docker Compose

### Running MongoDB

1. Start the MongoDB container:
   ```bash
   docker-compose up -d
   ```

2. The MongoDB instance will be available at:
   - Host: localhost
   - Port: 27017
   - Username: root
   - Password: example
   - Authentication Database: admin

### Environment Variables

Create a `.env` file in the server directory with the following variables:
```env
MONGODB_URI=mongodb://root:example@localhost:27017/shopping-list?authSource=admin
PORT=3000
```

### Stopping the Database

To stop the MongoDB container:
```bash
docker-compose down
```

To stop and remove all data:
```bash
docker-compose down -v
```
