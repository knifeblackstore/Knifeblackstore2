const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const db = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Sincronizar base de datos
db.sequelize.sync().then(() => {
    console.log("✅ Base de datos sincronizada.");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`🚀 Servidor en ejecución en el puerto ${PORT}`);
    });
}).catch(err => {
    console.error("❌ Error al sincronizar la base de datos:", err);
});
