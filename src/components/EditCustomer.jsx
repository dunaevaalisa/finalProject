import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditCustomer({ customerdata, fetchCustomer }) {
  const [customer, setCustomer] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    streetaddress: '',
    postcode: '',
    city: '',
  });
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    console.log(customerdata);
    setCustomer({
      firstname: customerdata.firstname,
      lastname: customerdata.lastname,
      email: customerdata.email,
      phone: customerdata.phone,
      streetaddress: customerdata.streetaddress,
      postcode: customerdata.postcode,
      city: customerdata.city,
    })
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    fetch(customerdata.links[0].href, {
      method: 'PUT',
      headers: { 'Content-type':'application/json' },
      body: JSON.stringify(customer)
    })
    .then(response => {
      if (!response.ok)
        throw new Error("Error in edit: " + response.statusText);

      fetchCustomers();
    })
    .catch(err => console.error(err))
    
    handleClose();
  }

  return (
    <>
      <Button size="small" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Customer</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Firstname"
            value={customer.firstname}
            onChange={e => setCustomer({...customer, firstname: e.target.value })}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Lastname"
            value={customer.lastname}
            onChange={e => setCustomer({...customer, lastname: e.target.value })}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Email"
            value={customer.email}
            onChange={e => setCustomer({...customer, email: e.target.value })}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Phone"
            value={customer.phone}
            onChange={e => setCustomer({...customer, phone: e.target.value })}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Streetaddress"
            value={customer.streetaddress}
            onChange={e => setCustomer({...customer, streetaddress: e.target.value })}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Postcode"
            value={customer.postcode}
            onChange={e => setCustomer({...customer, postcode: e.target.value })}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}