import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import  Snackbar  from '@mui/material/Snackbar';

import { fetchCustomers} from "./customerapi";

function Customerlist() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchCustomers(setCustomers); 
      }, []);

    //const [open, setOpen] = useState(false);

    // const deleteCustomer= (url) => {
    //     if (window.confirm("Are you sure?")) {
    //         fetch(url, { method: 'DELETE' })
    //         .then(response => {
    //             if(!response.ok) {
    //                 throw new Error("Error in deletion: " + response.statusText);
    //             } else {
    //                 setOpen(true);
    //                 fetchCustomers();
    //             }
    //         })
    //         .then(() => fetchCustomers())
    //         .catch(err => console.error(err))
    // }
    // }

    const [columnDefs] = useState([
        { field: 'firstname', sortable: true, filter: true, width: 120},
        { field: 'lastname', sortable: true, filter: true, width: 120},
        { field: 'email', sortable: true, filter: true, width:200},
        { field: 'phone', sortable: true, filter: true, width:100 },
        { field: 'streetaddress', sortable: true, filter: true, width:180 },
        { field: 'postcode', sortable: true, filter: true, width:120 },
        { field: 'city', sortable: true, filter: true, width:120 },
       // {
            //cellRenderer: params => <EditCustomers  customerdata = {params.data}  fetchCustomers = {fetchCustomers}/>,
            //width: 120
        //},
       // {
            //cellRenderer: params => <Button onClick={() => deleteCustomer(params.data._links.customer.href)}>Delete</Button>, width:120
        //}
    ])

    useEffect(() => {
        getCustomers();
    }, [])

    const getCustomers = () => {
        fetchCustomers()
        .then(data => setCustomers(data.content))
    }
    

   

    return(
        <>
        <div className = "ag-grid-community/styles/ag-theme-material" style = {{ width: '90%', height: 600 }}>
            <AgGridReact 
            rowData = {customers}
            columnDefs = {columnDefs}
            pagination = {true}
            paginationAutoPageSize = {true}
            />
        </div>
        </>
    );
}

export default Customerlist;