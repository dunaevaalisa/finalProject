import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import  Snackbar  from '@mui/material/Snackbar';
import { Button } from "@mui/material";
import { fetchCustomers} from "./customerapi";
import AddCustomer from "./AddCustomer";
import EditCustomer from './EditCustomer';
import AddTraining from "./AddTraining";
import { CSVLink } from 'react-csv';


function Customerlist() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [trainingOpen, setTrainingOpen] = useState(false)

    useEffect(() => {
        fetchCustomers(setCustomers); 
      }, []);

      useEffect(() => {
        getCustomers();
    }, [])

    const getCustomers = () => {
        fetchCustomers()
        .then(data => setCustomers(data.content))
    }
    

     const deleteCustomer= (url) => {
         if (window.confirm("Are you sure?")) {
             fetch(url, { method: 'DELETE' })
             .then(response => {
                 if(!response.ok) {
                     throw new Error("Error in deletion: " + response.statusText);
                 } else {
                     setOpen(true);
                     fetchCustomers();
                 }
             })
             .then(() => fetchCustomers())
             .catch(err => console.error(err))
     }
    }

    const [columnDefs] = useState([
        { field: 'firstname', sortable: true, filter: true, width: 125},
        { field: 'lastname', sortable: true, filter: true, width: 125},
        { field: 'email', sortable: true, filter: true, width:175},
        { field: 'phone', sortable: true, filter: true, width: 145 },
        { field: 'streetaddress', sortable: true, filter: true, width:160 },
        { field: 'postcode', sortable: true, filter: true, width:125 },
        { field: 'city', sortable: true, filter: true, width:105 },
        {
            cellRenderer: params => <EditCustomer customerdata={params.data} fetchCustomers={fetchCustomers} />,
            width: 115
          },
          {
            cellRenderer: params => <Button size="small"  onClick={() => deleteCustomer(params.data.links[0].href)}>Delete</Button>,
            width: 115
          },
          {
            cellRenderer: params => <AddTraining customerdata={params.data} fetchCustomers={fetchCustomers} setTrainingOpen={setTrainingOpen} />,
            width: 185
          },
    ])
    

    const linkStyle = {
      textDecoration: 'none',
      padding: '8px 12px',
      borderRadius: '4px',
      color: '#DAA520',
      border: '1px solid #DAA520',
      marginLeft: '50px',
      marginRight: '50px',
      fontWeight: 'bold', 
    };
   
    const headers = [
      { label: 'Firstname', key: 'firstname' },
      { label: 'Lastname', key: 'lastname' },
      { label: 'Email', key: 'email' },
      { label: 'Phone' , key: 'phone'},
      { label: 'Streetaddress', key: 'streetaddress'},
      { label: 'Postcode', key: 'postcode'},
      { lebal: 'City', key: 'city'}
    ];
  

    return(
        <>
         <CSVLink data={customers} headers={headers} filename={'customers.csv'} style={linkStyle}>
        Export Customers
      </CSVLink>
      <AddCustomer fetchCustomers={fetchCustomers} />
      <div className='ag-theme-material' style={{ width: '100%', height: 650 }}>
      
        <AgGridReact 
          rowData={customers}
          columnDefs={columnDefs}
          pagination={true}
          paginationAutoPageSize={true}
        />
      </div>
      <Snackbar 
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message="Customer deleted succesfully"
      />
      <Snackbar
                open={trainingOpen}
                autoHideDuration={3000}
                onClose={() => setTrainingOpen(false)}
                message="Training added succesfully"
            />
    </>
    );
}

export default Customerlist;