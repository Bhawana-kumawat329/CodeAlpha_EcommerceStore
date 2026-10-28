const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const app = express();
const SECRET_KEY = "codealpha_secret_key_change_in_production";

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ users: [], products: [], orders: [] }).write();

const cleanProducts = [
    {
        id: 1,
        name: "Pro Wireless Headphones",
        brand: "AudioTech",
        price: 3499,
        quality_rating: "4.8 / 5.0 (Premium Build)",
        description: "Active Noise Canceling (ANC) over-ear wireless headphones with 40h battery life.",
        specs: ["Bluetooth 5.3", "40-hour Battery", "Active Noise Cancellation", "Memory Foam Earcups"],
        in_stock: true,
        image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
    },
    {
        id: 2,
        name: "Smart Fitness Watch",
        brand: "FitPulse",
        price: 2499,
        quality_rating: "4.6 / 5.0 (High Durability)",
        description: "Water-resistant smartwatch featuring 24/7 heart rate monitoring and AMOLED display.",
        specs: ["5 ATM Water Resistance", "14-Day Battery", "SpO2 & Heart Rate Tracker", "AMOLED Screen"],
        in_stock: true,
        image_url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
    },
    {
        id: 3,
        name: "Mechanical Gaming Keyboard",
        brand: "KeyForge",
        price: 4999,
        quality_rating: "4.9 / 5.0 (Esports Grade)",
        description: "Tactile mechanical keyboard featuring customizable RGB backlighting.",
        specs: ["Hot-swappable Switches", "Per-Key RGB", "Aluminum Top Plate", "Detachable Type-C"],
        in_stock: true,
        image_url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400"
    },
    {
        id: 4,
        name: "Ergonomic Wireless Mouse",
        brand: "TechGrip",
        price: 1299,
        quality_rating: "4.5 / 5.0 (Ergonomic Approved)",
        description: "Precision wireless mouse designed for vertical grip comfort.",
        specs: ["4000 DPI Sensor", "Silent Click Switches", "Dual Bluetooth/2.4Ghz"],
        in_stock: true,
        image_url: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400"
    },
    {
        id: 5,
        name: "4K Ultra-HD 27-inch Monitor",
        brand: "ViewMaster",
        price: 24999,
        quality_rating: "4.8 / 5.0 (Pro Display)",
        description: "Color-accurate 4K IPS display ideal for video editing and gaming.",
        specs: ["99% sRGB Color", "HDR400 Support", "USB-C 65W Power", "144Hz Refresh Rate"],
        in_stock: true,
        image_url: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400"
    },
    {
        id: 6,
        name: "Studio USB Microphone",
        brand: "VocalPro",
        price: 3999,
        quality_rating: "4.7 / 5.0 (Studio Quality)",
        description: "Plug-and-play cardioid USB microphone with zero-latency monitoring.",
        specs: ["24-bit/192kHz Sample", "Gain Control Knob", "Built-in Pop Filter"],
        in_stock: true,
        image_url: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400"
    },
    {
        id: 7,
        name: "Portable Bluetooth Speaker",
        brand: "SoundBoom",
        price: 2999,
        quality_rating: "4.6 / 5.0 (Heavy Bass)",
        description: "IPX7 Waterproof outdoor speaker with 360-degree surround audio.",
        specs: ["IPX7 Waterproof", "20-Hour Playtime", "Dual Bass Radiators"],
        in_stock: true,
        image_url: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400"
    },
    {
        id: 8,
        name: "Noise-Canceling Earbuds",
        brand: "AirSound",
        price: 4499,
        quality_rating: "4.8 / 5.0 (Top Rated)",
        description: "True wireless earbuds with adaptive ANC and crystal-clear microphone.",
        specs: ["Active Noise Canceling", "Wireless Charging Case", "Touch Controls"],
        in_stock: true,
        image_url: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400"
    },
    {
        id: 9,
        name: "Ultra-Fast NVMe SSD 1TB",
        brand: "DataSpeed",
        price: 6999,
        quality_rating: "4.9 / 5.0 (High Speed)",
        description: "PCIe Gen4 M.2 SSD delivering read speeds up to 7450MB/s.",
        specs: ["7450MB/s Read Speed", "Heatsink Included", "PCIe 4.0 NVMe"],
        in_stock: true,
        image_url: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400"
    },
    {
        id: 10,
        name: "Full HD Web Camera 1080p",
        brand: "VisionCam",
        price: 1999,
        quality_rating: "4.5 / 5.0 (Clear Video)",
        description: "Auto-focus streaming webcam with built-in noise reducing dual mics.",
        specs: ["1080p 60FPS", "Privacy Shutter", "Auto Light Correction"],
        in_stock: true,
        image_url: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400"
    },
    {
        id: 11,
        name: "RGB Laptop Cooling Pad",
        brand: "ChillTech",
        price: 1499,
        quality_rating: "4.4 / 5.0 (Silent Fans)",
        description: "Heavy-duty laptop cooler with 6 silent fans and adjustable height stand.",
        specs: ["6 Turbo Fans", "RGB Lighting", "Dual USB Ports"],
        in_stock: true,
        image_url: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400"
    },
    {
        id: 12,
        name: "USB-C Multi-Port Hub",
        brand: "PortMax",
        price: 1899,
        quality_rating: "4.7 / 5.0 (7-in-1 Aluminum)",
        description: "7-in-1 USB-C Docking Station with 4K HDMI, 100W Power Delivery & SD Reader.",
        specs: ["4K HDMI", "100W Pass-Through Power", "SD/TF Card Reader"],
        in_stock: true,
        image_url: "https://images.unsplash.com/photo-1544652478-6653e09f18a2?w=400"
    },
    {
        id: 13,
        name: "Fast Wireless Charger Pad",
        brand: "PowerWave",
        price: 999,
        quality_rating: "4.6 / 5.0 (15W Qi Fast)",
        description: "15W Qi-certified wireless charging pad with LED indicator and non-slip pad.",
        specs: ["15W Fast Charge", "Qi Certified", "Overheat Protection"],
        in_stock: true,
        image_url: "https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=400"
    },
    {
        id: 14,
        name: "High-Capacity Power Bank 20000mAh",
        brand: "VoltCharge",
        price: 2199,
        quality_rating: "4.8 / 5.0 (22.5W Fast Charge)",
        description: "20000mAh portable charger with Power Delivery for laptops and phones.",
        specs: ["20000mAh Capacity", "22.5W Fast Charging", "Digital Display"],
        in_stock: true,
        image_url: "https://images.unsplash.com/photo-1609592424009-5996dd9edbab?w=400"
    },
    {
        id: 15,
        name: "Smart RGB Desk Lamp",
        brand: "Lumina",
        price: 1599,
        quality_rating: "4.5 / 5.0 (App Controlled)",
        description: "Dimmable LED desk lamp with touch controls, wireless charger & timer.",
        specs: ["16 Million RGB Colors", "Wireless Charger Base", "Eye Care Dimming"],
        in_stock: true,
        image_url: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400"
    }
];

db.set('products', cleanProducts).write();

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: "Access token required" });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid or expired session token" });
        req.user = user;
        next();
    });
}

app.post('/api/auth/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: "All fields are required" });

    const existingUser = db.get('users').find({ email }).value();
    if (existingUser) return res.status(400).json({ error: "Email already registered" });

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { id: Date.now(), name, email, password: hashedPassword };
        db.get('users').push(newUser).write();

        const token = jwt.sign({ id: newUser.id, name, email }, SECRET_KEY, { expiresIn: '24h' });
        res.json({ message: "Account created successfully!", token, user: { id: newUser.id, name, email } });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    const user = db.get('users').find({ email }).value();
    if (!user) return res.status(400).json({ error: "Invalid email or password" });

    bcrypt.compare(password, user.password, (err, isValid) => {
        if (!isValid) return res.status(400).json({ error: "Invalid email or password" });

        const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, SECRET_KEY, { expiresIn: '24h' });
        res.json({ message: "Login successful!", token, user: { id: user.id, name: user.name, email: user.email } });
    });
});

app.get('/api/products', (req, res) => {
    res.json(db.get('products').value());
});

app.post('/api/orders', authenticateToken, (req, res) => {
    const { items, total_price, payment_method, shipping_address } = req.body;
    if (!items || items.length === 0) return res.status(400).json({ error: "Shopping cart is empty" });

    const paymentStatus = payment_method === 'COD' ? 'Pending (Pay on Delivery)' : 'Paid (UPI Verified)';

    const newOrder = {
        id: Date.now(),
        user_id: req.user.id,
        items,
        total_price,
        payment_method,
        payment_status: paymentStatus,
        shipping_address,
        created_at: new Date().toISOString()
    };
    db.get('orders').push(newOrder).write();

    res.json({ message: "Order placed successfully!", orderId: newOrder.id, status: paymentStatus });
});

app.get('/api/orders', authenticateToken, (req, res) => {
    const orders = db.get('orders').filter({ user_id: req.user.id }).value();
    res.json(orders);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`E-Commerce application running on http://localhost:${PORT}`));
