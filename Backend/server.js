const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const path = require("path")

const IndexRoute = require("./Routers/index")
const connectDatabase = require("./Helpers/database/connectDatabase")
const customErrorHandler = require("./Middlewares/Errors/customErrorHandler")

// Load environment variables
dotenv.config({
    path: './Config/config.env'
})

// Connect to database
connectDatabase()

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// CORS configuration for production
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
        ? [process.env.FRONTEND_URL, 'https://your-frontend.onrender.com'] // Add your frontend URL
        : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:4000'],
    credentials: true,
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

// Routes
app.use("/", IndexRoute)

// Health check endpoint for Render
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        message: 'Server is running',
        timestamp: new Date().toISOString()
    })
})

// Serve static files
app.use(express.static(path.join(__dirname, "public")))

// Error handling middleware
app.use(customErrorHandler)

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    })
})

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`)
    console.log(`📁 Static files served from: ${path.join(__dirname, "public")}`)
})

// Graceful shutdown
process.on("unhandledRejection", (err, promise) => {
    console.log(`❌ Unhandled Rejection: ${err}`)
    server.close(() => {
        process.exit(1)
    })
})

process.on("SIGTERM", () => {
    console.log("🛑 SIGTERM received, shutting down gracefully")
    server.close(() => {
        console.log("✅ Process terminated")
    })
})