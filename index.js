const express = require("express");
const request = require("request-promise");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

// const apiKey = "c1caeda9d2f668bf620ba03764950b49";

const returnScraperApiUrl = (apiKey) => `https://api.scraperapi.com/?api_key=${apiKey}&autoparse=true`;

//Welcome route
app.get("/", async (req, res) => {
    res.send("Welcome to the Amazon Scrapper API.");
});

//get product details
app.get("/products/:productId", async (req, res) => {
    const { productId } = req.params;
    const { apiKey } = req.query;
    try {
        const response = await request(`${returnScraperApiUrl(apiKey)}&url=https://www.amazon.com/dp/${productId}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json({ error: error.message });
    }
});

//get product reviews
app.get("/products/:productId/reviews", async (req, res) => {
    const { productId } = req.params;
    const { apiKey } = req.query;

    try {
        const response = await request(`${returnScraperApiUrl(apiKey)}&url=https://www.amazon.com/product-reviews/${productId}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json({ error: error.message });
    }
});

//get product offers
app.get("/products/:productId/offers", async (req, res) => {
    const { productId } = req.params;
    const { apiKey } = req.query;

    try {
        const response = await request(`${returnScraperApiUrl(apiKey)}&url=https://www.amazon.com/gp/offer-listing/${productId}`);
        
        res.json(JSON.parse(response));
    } catch (error) {
        res.json({ error: error.message });
    }
});

//get search results
app.get("/search/:searchQuery", async (req, res) => {
    const { searchQuery } = req.params;
    const { apiKey } = req.query;
    try {
        const response = await request(`${returnScraperApiUrl(apiKey)}&url=https://www.amazon.com/s?k=${searchQuery}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json({ error: error.message });
    }
});

//get deals
app.get("/deals", async (req, res) => {
    const { apiKey } = req.query;

    try {
        const response = await request(`${returnScraperApiUrl(apiKey)}&url=https://www.amazon.com/gp/goldbox?ref_=nav_cs_gb`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json({ error: error.message });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));