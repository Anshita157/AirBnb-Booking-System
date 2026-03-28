# Airbnb Booking System - Angular Frontend

A fully-functional Airbnb-like hotel booking application built with **Angular 15**, featuring user authentication, hotel search/booking, payment processing, and admin dashboard.

## 🎯 Features

### User Features
- ✅ **Authentication**: Login, Signup, Password Reset
- ✅ **Hotel Search**: Browse and search hotels with filters
- ✅ **Booking System**: Create, view, and manage bookings
- ✅ **Payment Processing**: Multi-method payment (Card, UPI, Net Banking)
- ✅ **User Profile**: Manage personal information and change password
- ✅ **Booking History**: View past and upcoming bookings
- ✅ **Hotel Reviews**: Rate and review hotels

### Admin Features
- ✅ **Admin Dashboard**: Real-time statistics and analytics
- ✅ **Hotel Management**: Add, edit, and delete hotels
- ✅ **Room Management**: Manage room inventory and pricing
- ✅ **Booking Management**: View and update booking status
- ✅ **User Management**: Manage users and roles

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Angular CLI (v15+)

### Installation

1. **Navigate to frontend directory**
   ```bash
   cd Frontend/AirbnbFrontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   ng serve
   ```

4. **Open in browser**
   - Navigate to `http://localhost:4200/`
   - The app will automatically reload on code changes

## 🔑 Test Credentials

### User Account
- **Email**: `demo@example.com`
- **Password**: `demo123` (or any 6+ character string)

### Admin Account
- **Email**: `admin@example.com`
- **Password**: `admin123` (or any 6+ character string)

## 📁 Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── models/          # TypeScript interfaces & models
│   │   ├── services/        # HTTP services (Auth, Hotel, Booking, etc.)
│   │   ├── guards/          # Route guards (AuthGuard, AdminGuard)
│   │   └── interceptors/    # HTTP interceptors (JWT, Error handling)
│   ├── shared/
│   │   └── components/      # Reusable components (Navbar, Footer, HotelCard)
│   ├── auth/                # Authentication module (Login, Signup)
│   ├── home/                # Home module (Landing page, Hotel list)
│   ├── booking/             # Booking module
│   ├── payment/             # Payment module
│   ├── admin/               # Admin module (Dashboard, Management pages)
│   ├── profile/             # User profile module
│   ├── app.module.ts        # Root module
│   ├── app-routing.module.ts # Root routing
│   └── app.component.*      # Root component
├── environments/            # Environment configurations
├── assets/                  # Static assets (images, icons, etc.)
├── styles.css              # Global styles
└── index.html              # Entry HTML

```

## 🔄 Main Routes

| Route | Component | Auth Required | Role |
|-------|-----------|---------------|------|
| `/auth/login` | Login | ❌ | Public |
| `/auth/signup` | Signup | ❌ | Public |
| `/home` | Home Page | ❌ | Public |
| `/booking/booking-page` | Booking Form | ✅ | User |
| `/booking/my-bookings` | My Bookings | ✅ | User |
| `/payment` | Payment | ✅ | User |
| `/payment/success` | Payment Success | ✅ | User |
| `/profile` | User Profile | ✅ | User |
| `/admin` | Dashboard | ✅ | Admin |
| `/admin/manage-hotels` | Hotels | ✅ | Admin |
| `/admin/manage-bookings` | Bookings | ✅ | Admin |
| `/admin/manage-users` | Users | ✅ | Admin |

## 🛠️ Technologies Used

- **Angular 15.2.0** - Frontend framework
- **TypeScript 4.9.4** - Programming language
- **RxJS 7.8.0** - Reactive programming
- **Reactive Forms** - Advanced form handling
- **ngx-toastr 16.1.0** - Toast notifications
- **CSS3** - Responsive styling

## 📱 Responsive Design

The application is fully responsive with breakpoints for:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

All components follow a **mobile-first** design approach.

## 🔐 Security Features

- ✅ **JWT Authentication**: Token-based authentication
- ✅ **Auto Token Refresh**: Automatic refresh on 401 errors
- ✅ **Role-Based Access**: Admin and User roles
- ✅ **Password Validation**: Min 6 characters with strength rules
- ✅ **Secure HTTP Interceptors**: Automatic error handling
- ✅ **Route Guards**: Protected routes based on authentication

## 📊 State Management

Uses **RxJS BehaviorSubjects** for reactive state management:
- `currentUser$` - Current logged-in user
- `authStatus$` - Authentication status
- Observable-based data flow

## 🎨 Design System

- **Primary Gradient**: Linear gradient from #667eea to #764ba2
- **Success Color**: #27ae60
- **Error Color**: #e74c3c
- **Spacing**: 1rem = 16px (REMs for scalability)
- **Border Radius**: 8px-12px
- **Box Shadows**: Subtle shadows for depth

## 📝 API Integration

The app is configured to work with the backend API:

**Development**: `http://localhost:8080/api`  
**Production**: `https://api.airbnbbookingsystem.com/api`

All endpoints are configurable in `environments/` files.

## 🧪 Build & Deployment

### Development Build
```bash
npm start
```

### Production Build
```bash
npm run build
```
Build artifacts are stored in `dist/` directory.

### Serve Production Build
```bash
ng serve --configuration development
```

## 📦 Dependencies

See `package.json` for complete list. Key dependencies:
- @angular/* (15.2.0)
- @angular/animations
- @angular/forms
- @angular/platform-browser
- ngx-toastr (16.1.0)
- rxjs

## 🚦 Code Quality

- ✅ TypeScript strict mode enabled
- ✅ Type-safe models and interfaces
- ✅ Comprehensive error handling
- ✅ Reactive forms validation
- ✅ Consistent code style

## 📚 Further Help

- Angular Documentation: https://angular.io/docs
- Angular CLI: https://angular.io/cli
- RxJS: https://rxjs.dev

## 📄 Implementation Details

For detailed implementation information, see [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)

## 🤝 Contributing

This is a demo project. For production use, ensure:
1. Backend API integration
2. Real payment gateway integration
3. Database setup and migration
4. Security configurations
5. Testing (Unit, E2E, Integration)

## 📞 Support

For issues or questions, check:
- `IMPLEMENTATION_SUMMARY.md` - Detailed feature list
- Component-level TypeScript files - Code documentation
- Template files (*.html) - UI structure

---

**Created**: February 2024  
**Status**: Production-Ready  
**Version**: 1.0.0  
**Angular Version**: 15.2.0

