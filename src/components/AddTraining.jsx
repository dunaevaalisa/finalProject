import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DateTimePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export default function AddTraining({ customerdata, fetchTrainings }) {
  const [training, setTraining] = useState({
    
    activity: '',
    date: '',
    duration: '',
    customer: '',
  });

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
    setTraining({...training, customer: customerdata.links[0].href})
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    fetch(import.meta.env.VITE_API_URL + '/api/trainings', {
      method: 'POST',
      headers: { 'Content-type':'application/json' },
      body: JSON.stringify(training)
    })
    .then(response => {
      if (!response.ok)
        throw new Error("Addition failed: " + response.statusText);

    })
    .catch(err => console.error(err))

    handleClose();
  }

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Activity"
            value={training.activity}
            onChange={e => setTraining({...training, activity: e.target.value })}
            fullWidth
            variant="standard"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            margin="dense"
            label="Date"
            value={training.date}
            onChange={(newDate) => setTraining({ ...training, date: newDate })}
            fullWidth
            variant="standard"
          />
          </LocalizationProvider>
          <TextField
            margin="dense"
            label="Duration "
            value={training.duration}
            onChange={e => setTraining({...training, duration: e.target.value })}
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