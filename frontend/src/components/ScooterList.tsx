import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Box, Typography, Chip } from '@mui/material';
import { Scooter, ScooterStatus } from '../types/Scooter';
import { getScooters, deleteScooter } from '../services/api';

interface ScooterListProps {
  onEdit: (scooter: Scooter) => void;
  onAdd: () => void;
}

const ScooterList: React.FC<ScooterListProps> = ({ onEdit, onAdd }) => {
  const [scooters, setScooters] = useState<Scooter[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchScooters();
  }, []);

  const fetchScooters = async () => {
    try {
      setLoading(true);
      const data = await getScooters();
      setScooters(data);
    } catch (error) {
      console.error('Error fetching scooters:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce scooter ?')) {
      try {
        await deleteScooter(id);
        setScooters(scooters.filter(scooter => scooter.id !== id));
      } catch (error) {
        console.error('Error deleting scooter:', error);
      }
    }
  };

  const getStatusColor = (status: ScooterStatus) => {
    switch (status) {
      case ScooterStatus.AVAILABLE:
        return 'success';
      case ScooterStatus.MAINTENANCE:
        return 'warning';
      case ScooterStatus.RESERVED:
        return 'info';
      case ScooterStatus.IN_USE:
        return 'primary';
      case ScooterStatus.OUT_OF_SERVICE:
        return 'error';
      default:
        return 'default';
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'licensePlate', headerName: 'Plaque', width: 130 },
    {
      field: 'status',
      headerName: 'Statut',
      width: 150,
      renderCell: (params) => (
        <Chip 
          label={params.value} 
          color={getStatusColor(params.value as ScooterStatus) as any}
          size="small"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <Box>
          <Button
            variant="outlined"
            size="small"
            onClick={() => onEdit(params.row as Scooter)}
            sx={{ mr: 1 }}
          >
            Modifier
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleDelete(params.row.id)}
          >
            Supprimer
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5" component="h2">
          Liste des Scooters
        </Typography>
        <Button variant="contained" color="primary" onClick={onAdd}>
          Ajouter un scooter
        </Button>
      </Box>
      <DataGrid
        rows={scooters}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        loading={loading}
      />
    </Box>
  );
};

export default ScooterList;
