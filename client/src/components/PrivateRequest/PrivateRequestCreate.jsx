import React, { useState } from 'react';
import { Box, TextField, Button, Typography, MenuItem } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import CreateIcon from '@mui/icons-material/Create';

const subjects = [
  { value: 'subject1', label: 'Subject 1' },
  { value: 'subject2', label: 'Subject 2' },
  { value: 'subject3', label: 'Subject 3' },
  { value: 'subject4', label: 'Subject 4' },
  { value: 'subject5', label: 'Subject 5' },
  { value: 'subject6', label: 'Subject 6' },
  { value: 'subject7', label: 'Subject 7' },
];

function PrivateRequestCreate() {
  const [formData, setFormData] = useState({
    subject: '',
    classDate: dayjs(),
    startTime: dayjs(),
    duration: '',
    initialOffer: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (newValue) => {
    setFormData({ ...formData, classDate: newValue });
  };

  const handleTimeChange = (newValue) => {
    setFormData({ ...formData, startTime: newValue });
  };

  const handleSubmit = () => {
    // Handle form submission
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: 4,
        borderRadius: 2,
        boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        maxWidth: '1000px',
        margin: '0 auto',
      }}>
        <Typography variant="h5" sx={{ color: '#fff', display: 'flex', alignItems: 'center' }}>
          <CreateIcon sx={{ marginRight: 1 }} /> Create Private Request
        </Typography>
        <TextField
          select
          name="subject"
          label="Subject"
          variant="outlined"
          value={formData.subject}
          onChange={handleChange}
          sx={{
            '& .MuiInputBase-input': { color: '#fff' },
            '& .MuiInputLabel-root': { color: '#ccc' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
              '&:hover fieldset': { borderColor: '#fff' },
            },
          }}
        >
          {subjects.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <DatePicker
          label="Class Date"
          value={formData.classDate}
          onChange={handleDateChange}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{
                '& .MuiInputBase-input': { color: '#fff' },
                '& .MuiInputLabel-root': { color: '#ccc' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                  '&:hover fieldset': { borderColor: '#fff' },
                },
              }}
            />
          )}
        />
        <TimePicker
          label="Start Time"
          value={formData.startTime}
          onChange={handleTimeChange}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{
                '& .MuiInputBase-input': { color: '#fff' },
                '& .MuiInputLabel-root': { color: '#ccc' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                  '&:hover fieldset': { borderColor: '#fff' },
                },
              }}
            />
          )}
        />
        <TextField
          name="duration"
          label="Duration (minutes)"
          type="number"
          variant="outlined"
          value={formData.duration}
          onChange={handleChange}
          sx={{
            '& .MuiInputBase-input': { color: '#fff' },
            '& .MuiInputLabel-root': { color: '#ccc' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
              '&:hover fieldset': { borderColor: '#fff' },
            },
          }}
        />
        <TextField
          name="initialOffer"
          label="Initial Offer"
          type="number"
          variant="outlined"
          value={formData.initialOffer}
          onChange={handleChange}
          sx={{
            '& .MuiInputBase-input': { color: '#fff' },
            '& .MuiInputLabel-root': { color: '#ccc' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
              '&:hover fieldset': { borderColor: '#fff' },
            },
          }}
        />
        <Button variant="contained" sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(5px)',
          color: '#fff',
          '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.35)' },
          borderRadius: '8px',
        }} onClick={handleSubmit}>
          Create Request
        </Button>
      </Box>
    </LocalizationProvider>
  );
}

export default PrivateRequestCreate;
