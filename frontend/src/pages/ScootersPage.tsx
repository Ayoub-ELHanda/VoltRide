import React, { useState } from 'react';
import { Container, Paper } from '@mui/material';
import ScooterList from '../components/ScooterList';
import { Scooter } from '../types/Scooter';

const ScootersPage: React.FC = () => {
  const [selectedScooter, setSelectedScooter] = useState<Scooter | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);

  const handleEdit = (scooter: Scooter) => {
    setSelectedScooter(scooter);
    // In a real application, you would open an edit dialog here
    console.log('Editing scooter:', scooter);
  };

  const handleAdd = () => {
    setIsAddDialogOpen(true);
    // In a real application, you would open an add dialog here
    console.log('Adding new scooter');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2 }}>
        <ScooterList onEdit={handleEdit} onAdd={handleAdd} />
      </Paper>
    </Container>
  );
};

export default ScootersPage;
