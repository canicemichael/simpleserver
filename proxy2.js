const express = require("express");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");
require('dotenv').config();

const app = express();

// Configuration
const PORT = 3000;
const HOST = "localhost";
const API_BASE_URL = `https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}`;
const API_KEY_VALUE = "3679c76379e9cd968b7f6f6cdc880ba2";

const API_SERVICE_URL = `${API_BASE_URL}?q=London&appid=${API_KEY_VALUE}`

// Logging
app.use(morgan('dev'));

app.use('/weather', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/weather`]: '',
    }
}));

// Start Proxy
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});