import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

import dayjs from 'dayjs';

function Trainingslist() {
  const [trainings, setTrainings] = useState([]);

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

  const [columnDefs] = useState([
    { field: 'actions', headerName: 'Actions', width: 100 },
    { field: 'activity', headerName: 'Activity', sortable: true, filter: true, width: 150 },
    { field: 'date', headerName: 'Date', sortable: true, filter: true, width: 200, cellRenderer: formatDate },
    { field: 'duration', headerName: 'Duration', sortable: true, filter: true, width: 150 },
    {
      field: 'customerName',
      headerName: 'Customer',
      sortable: true,
      filter: true,
      width: 200,
      valueGetter: params => params.data.customer.firstname + ' ' + params.data.customer.lastname
    }
  ]);



  return (
    <div className="ag-theme-material" style={{ width: '90%', height: 600 }}>
      <AgGridReact
        rowData={trainings}
        columnDefs={columnDefs}
        pagination={true}
        paginationAutoPageSize={true}
      />
    </div>
  );
}

export default Trainingslist;
