import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { Button } from '@mui/material';
import { Snackbar } from '@mui/material';
import AddTraining from './AddTraining';


import dayjs from 'dayjs';

function Trainingslist() {
  const [trainings, setTrainings] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchTrainings()
}, [])

const fetchTrainings = () => {
    fetch(import.meta.env.VITE_API_URL + '/gettrainings')
      .then((response) => {
        if (!response.ok)
          throw new Error("Something went wrong: " + response.statusText)
        return response.json()
      })
      .then(data => setTrainings(data)) 
      .catch(error => console.error("Error fetching trainings:", error))
  }

  const formatDate = (params) => {
    return dayjs(params.value).format('YYYY-MM-DD HH:MM');
  };


  const deleteTraining= (id) => {
    if (window.confirm("Are you sure?")) {
      fetch(import.meta.env.VITE_API_URL + "/api/trainings/" + id, {method: "DELETE"}) 
        .then(response => {
            if(!response.ok) {
                throw new Error("Error in deletion: " + response.statusText);
            } else {
                setOpen(true);
                fetchTrainings();
            }
        })
        .catch(err => console.error(err))
}
}
const [columnDefs] = useState([
  { field: 'activity', headerName: 'Activity', sortable: true, filter: true, width: 150 },
  { field: 'date', headerName: 'Date', sortable: true, filter: true, width: 200, cellRenderer: formatDate },
  { field: 'duration', headerName: 'Duration', sortable: true, filter: true, width: 120 },
  {
    field: 'customerName',
    headerName: 'Customer',
    sortable: true,
    filter: true,
    width: 200,
    valueGetter: params => params.data.customer.firstname + ' ' + params.data.customer.lastname,
  },
  {
    headerName: 'Delete', 
    width: 120,
    cellRenderer: params => (
      <Button size="small" onClick={() => deleteTraining(params.data.id)}>
        Delete
      </Button>
    ),
  },
]);



  return (
    <>
  
    <div className="ag-theme-material" style={{ width: '90%', height: 600 }}>
      <AgGridReact
        rowData={trainings}
        columnDefs={columnDefs}
        pagination={true}
        paginationAutoPageSize={true}
      />
      <Snackbar 
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message="Training deleted succesfully"
      />
    </div>
    </>
  );
}

export default Trainingslist;
