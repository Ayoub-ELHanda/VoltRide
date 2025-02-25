import express from 'express';
import cors from 'cors';
import MaintenanceRoutes from './routes/MaintenanceRoutes';
import NotificationRoutes from './routes/NotificationRoutes';
import scooterRoutes from './routes/ScooterRoutes';

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());

// ✅ Ajoute les routes avec le bon chemin
app.use('/api', MaintenanceRoutes);
app.use('/api', NotificationRoutes);
app.use('/scooters', scooterRoutes);

app.listen(PORT, () => {
    console.log(`API déployée sur http://localhost:${PORT}`);
});
