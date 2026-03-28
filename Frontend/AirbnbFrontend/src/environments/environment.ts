export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  endpoints: {
    // Auth endpoints
    auth: {
      login: '/auth/login',
      signup: '/auth/signup',
      logout: '/auth/logout',
      refresh: '/auth/refresh',
      forgotPassword: '/auth/forgot-password',
      resetPassword: '/auth/reset-password',
      verifyToken: '/auth/verify-token'
    },
    // Hotel endpoints
    hotels: {
      list: '/hotels',
      details: '/hotels/:id',
      search: '/hotels/search',
      reviews: '/hotels/:id/reviews',
      stats: '/hotels/stats'
    },
    // Booking endpoints
    bookings: {
      create: '/bookings',
      list: '/bookings',
      details: '/bookings/:id',
      cancel: '/bookings/:id/cancel',
      history: '/bookings/history'
    },
    // Payment endpoints
    payments: {
      create: '/payments',
      verify: '/payments/verify',
      history: '/payments/history',
      refund: '/payments/:id/refund'
    },
    // User endpoints
    users: {
      profile: '/users/profile',
      update: '/users/profile',
      changePassword: '/users/change-password',
      all: '/users',
      delete: '/users/:id'
    },
    // Admin endpoints
    admin: {
      dashboard: '/admin/dashboard',
      hotels: {
        create: '/admin/hotels',
        update: '/admin/hotels/:id',
        delete: '/admin/hotels/:id'
      },
      rooms: {
        create: '/admin/rooms',
        update: '/admin/rooms/:id',
        delete: '/admin/rooms/:id'
      },
      bookings: {
        list: '/admin/bookings',
        update: '/admin/bookings/:id'
      },
      users: {
        list: '/admin/users',
        update: '/admin/users/:id',
        delete: '/admin/users/:id'
      }
    }
  }
};
