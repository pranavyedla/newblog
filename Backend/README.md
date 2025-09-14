# Blog Backend API

A Node.js/Express backend for a blog application with GridFS image storage.

## Features

- User authentication (JWT)
- Story CRUD operations
- Comment system
- Image upload and storage (GridFS)
- Email functionality
- Profile management

## Tech Stack

- Node.js
- Express.js
- MongoDB with GridFS
- JWT Authentication
- Multer for file uploads
- Nodemailer for emails

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
JWT_EXPIRE=60m
RESET_PASSWORD_EXPIRE=3600000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASS=your_app_password
GRIDFS_BUCKET_NAME=uploads
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables (see above)

3. Start the development server:
```bash
npm run dev
```

4. Start the production server:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/forgotpassword` - Forgot password
- `POST /auth/resetpassword` - Reset password

### Users
- `GET /user/profile` - Get user profile
- `POST /user/editProfile` - Edit user profile
- `POST /user/changePassword` - Change password

### Stories
- `POST /story/addstory` - Create new story
- `GET /story/:slug` - Get story by slug
- `POST /story/:slug/like` - Like/unlike story
- `POST /story/:slug/edit` - Edit story
- `DELETE /story/:slug/delete` - Delete story

### Comments
- `POST /comment/:storyId/add` - Add comment
- `POST /comment/:commentId/like` - Like comment
- `GET /comment/:storyId` - Get story comments

### Images
- `GET /image/:id` - Get image by ID
- `DELETE /image/:id` - Delete image

## Health Check

- `GET /health` - Server health status

## Deployment on Render

1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Set the following:
   - **Root Directory**: `Backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add environment variables in Render dashboard
5. Deploy!

## Notes

- Images are stored using MongoDB GridFS
- CORS is configured for production
- Health check endpoint available at `/health`
- Graceful shutdown handling implemented
