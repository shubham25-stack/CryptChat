# CryptChat

CryptChat is a modern, secure, and real-time chat application built with React, Node.js, Express, MongoDB, and Socket.IO. It features user authentication, profile management, image sharing, and a beautiful responsive UI.

## Features
- Real-time messaging with Socket.IO
- User authentication (signup/login)
- Profile editing with image upload (Cloudinary)
- Online/offline user status
- Unread message badges
- Responsive design (desktop & mobile)
- Modern UI with Tailwind CSS

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, Axios, React Router, React Hot Toast
- **Backend:** Node.js, Express, MongoDB (Mongoose), Socket.IO, Cloudinary

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shubham25-stack/CryptChat.git
   cd CryptChat
   ```

2. **Setup the backend:**
   ```bash
   cd server
   cp .env.example .env  # or create .env manually
   npm install
   # Edit .env with your MongoDB and Cloudinary credentials
   npm run start
   ```

3. **Setup the frontend:**
   ```bash
   cd ../client
   cp .env.example .env  # or create .env manually
   npm install
   npm run dev
   ```

4. **Open the app:**
   - Visit [http://localhost:5173](http://localhost:5173) in your browser.

## Environment Variables

### Backend (`server/.env`)
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
CLOUDNARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDNARY_API_KEY=your_cloudinary_api_key
CLOUDNARY_API_SECRET=your_cloudinary_api_secret
```

### Frontend (`client/.env`)
```
VITE_BACKEND_URL=http://localhost:5000
```

## Folder Structure
```
CryptChat/
├── client/      # React frontend
└── server/      # Node.js backend
```

## Screenshots
- ![Chat UI](./client/public/screenshot-chat.png)
- ![Profile UI](./client/public/screenshot-profile.png)

## Credits
- UI inspired by modern chat apps
- Built by [shubham25-stack](https://github.com/shubham25-stack)

## License
This project is licensed under the MIT License.
