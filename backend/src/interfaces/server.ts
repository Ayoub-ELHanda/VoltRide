import express from 'express';
import cors from 'cors';

import scooterRoutes from './routes/ScooterRoutes';

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.use('/scooters', scooterRoutes);

app.listen(PORT, () => {
    console.log(`API déployée sur http://localhost:${PORT}`);
});
