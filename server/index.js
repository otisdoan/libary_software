const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const connectDB = require("./config/db");
const User = require("./models/User");
const UserProfile = require("./models/UserProfile");
const userRepository = require("./repositories/userRepository");
const routes = require('./routes');

// Load environment variables
dotenv.config({ path: path.join(__dirname, ".env") });

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
app.use('/api', routes);

// Logging requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`, req.body);
    next();
});

// Connect to database
connectDB();

// Google Auth Route
app.post("/api/auth/google-auth", async (req, res) => {
    const { credential } = req.body.credential; // Extract the nested credential
    console.log("Google Auth Request:", req.body);
    const clientId = process.env.GOOGLE_CLIENT_ID;

    console.log("Google Auth Request:", { credential: credential ? "Received" : "Missing" });

    if (!clientId || !credential) {
        return res.status(400).json({ error: "Credential bị thiếu" });
    }

    if (typeof credential !== "string") {
        console.error("Invalid credential format:", credential);
        return res.status(400).json({ error: "Credential không hợp lệ" });
    }

    try {
        const client = new OAuth2Client(clientId);
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: clientId,
        });

        const payload = ticket.getPayload();
        const { email, given_name, family_name, email_verified } = payload;

        if (!email_verified) {
            return res.status(400).json({ error: "Email chưa được xác thực" });
        }

        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({ email, status: "active" });
            await UserProfile.create({
                userId: user.id,
                fullName: `${given_name} ${family_name}`,
            });
        }

        const accessToken = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_ACCESS_EXPIRE_TIME }
        );
        const refreshToken = jwt.sign(
            { userId: user.id },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: process.env.JWT_REFRESH_EXPIRE_TIME }
        );

        await userRepository.saveToken({
            userId: user.id,
            accessToken,
            refreshToken,
        });

        res.json({
            user: {
                id: user.id,
                email: user.email,
                role: user.role || "user",
            },
            tokens: { accessToken, refreshToken },
        });
    } catch (err) {
        console.error("Error during Google Authentication:", err);
        res.status(400).json({ error: "Xác thực Google thất bại", details: err.message });
    }
});
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
