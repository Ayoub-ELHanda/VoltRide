import express from 'express';
import cors from 'cors';

import scooterRoutes from './routes/ScooterRoutes';
import maintenanceRoutes from './routes/MaintenanceRoutes';
import notificationRoutes from './routes/NotificationRoutes';
import scooterModelRouter from './routes/ScooterModelRouter';

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use('/scooter-models', scooterModelRouter);

app.use('/scooters', scooterRoutes);
// Route for Maintenances
app.use('/api/maintenances', maintenanceRoutes);

// Route for Notifications
app.use('/api/notifications', notificationRoutes);

app.listen(PORT, () => {
    console.log(`API déployée sur http://localhost:${PORT}`);
});
