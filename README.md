# Pharmacy Management System

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

A comprehensive web application for managing pharmacy operations, built with modern web technologies. This system allows pharmacists to manage their accounts, handle customer information, and track medicine sales efficiently.

## Features

- **User Authentication**: Secure login and registration system with JWT tokens and bcrypt password hashing
- **Account Management**: View, update, and delete pharmacist profiles
- **Customer Management**: Add and verify customer information
- **Sales Tracking**: Record medicine sales with pricing and purchase dates
- **Dashboard**: Overview of pharmacy operations and sales data
- **Responsive Design**: Modern UI built with Material-UI components
- **Docker Support**: Easy deployment with containerized services

## Tech Stack

### Frontend
- **React 19** - Modern JavaScript library for building user interfaces
- **TypeScript** - Typed superset of JavaScript
- **Vite** - Fast build tool and development server
- **Material-UI** - React components implementing Google's Material Design
- **React Router** - Declarative routing for React
- **Axios** - HTTP client for API requests
- **React Toastify** - Toast notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **SQLite** - Lightweight database engine
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

### DevOps
- **Docker** - Containerization platform
- **Docker Compose** - Multi-container orchestration

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **Docker** and **Docker Compose** (optional, for containerized deployment)

## Installation

### Manual Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/Pharmacy_Mgmt.git
   cd Pharmacy_Mgmt
   ```

2. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   # or
   yarn install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../server
   npm install
   ```

4. **Environment Configuration**
   
   Create a `.env` file in the `server` directory with the following variables:
   ```env
   PORT=5000
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

5. **Database Setup**
   
   The application uses SQLite, which will be automatically initialized when the server starts. The database schema is defined in `server/database.sql`.

6. **Start the application**

   **Terminal 1 - Backend:**
   ```bash
   cd server
   npm run dev
   # or
   npm start
   ```

   **Terminal 2 - Frontend:**
   ```bash
   cd client
   npm run dev
   ```

7. **Access the application**
   
   Open your browser and navigate to `http://localhost:5173`

### Docker Setup (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/Pharmacy_Mgmt.git
   cd Pharmacy_Mgmt
   ```

2. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

## Usage

### For Pharmacists

1. **Register**: Create a new account with your personal and professional details
2. **Login**: Authenticate using your username and password
3. **Dashboard**: View your profile and pharmacy overview
4. **Manage Customers**: Add new customers and verify existing ones
5. **Record Sales**: Add medicine sales with customer details and pricing
6. **View Sales**: Check sales records by date
7. **Account Settings**: Update your profile information or delete your account

### API Endpoints

The backend provides the following REST API endpoints:

- `POST /register` - Register a new pharmacist
- `POST /login` - Authenticate pharmacist login
- `POST /auth` - Verify JWT token
- `POST /getaccount` - Retrieve pharmacist account details
- `POST /updateaccount` - Update pharmacist account
- `POST /deleteaccount` - Delete pharmacist account
- `POST /checkcust` - Check if customer exists
- `POST /addcust` - Add new customer
- `POST /addmed` - Record medicine sale
- `POST /getsales` - Get sales for specific date
- `GET /` - Health check endpoint

## Project Structure

```
Pharmacy_Mgmt/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Account/    # Account management
│   │   │   ├── Cust/       # Customer management
│   │   │   ├── Home/       # Dashboard
│   │   │   ├── Login/      # Authentication
│   │   │   ├── Nav/        # Navigation
│   │   │   ├── Register/   # User registration
│   │   │   ├── Sell/       # Sales recording
│   │   │   └── Update/     # Account updates
│   │   ├── App.tsx         # Main app component
│   │   └── config.ts       # API configuration
│   └── package.json
├── server/                 # Node.js backend
│   ├── database.sql        # SQLite schema
│   ├── db.js               # Database connection
│   ├── server.js           # Express server
│   ├── utils/
│   │   └── jwtGen.js       # JWT utilities
│   └── package.json
├── compose.yaml            # Docker Compose configuration
└── README.md
```

## Database Schema

The application uses three main tables:

- **Pharmacist**: Stores pharmacist account information
- **Customer**: Contains customer details
- **Medicine**: Records medicine sales with foreign key relationships

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with modern web technologies for efficient pharmacy management
- Uses Material-UI for consistent and accessible user interface design
- Implements secure authentication practices with JWT and bcrypt

---

**Note**: This application is designed for educational and demonstration purposes. For production use, consider additional security measures and database optimizations.
