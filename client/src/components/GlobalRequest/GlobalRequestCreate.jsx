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

function GlobalRequestCreate() {
  const [formData, setFormData] = useState({
    subject: '',
    classDate: dayjs(),
    startTime: dayjs(),
    duration: '',
    minBid: '',
    maxBid: '',
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
        backgroundColor: 'rgba(30, 30, 30, 0.8)',
        padding: 4,
        borderRadius: 3,
        boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        maxWidth: '1000px',
        margin: '0 auto',
      }}>
        <Typography variant="h5" sx={{ color: '#fff', display: 'flex', alignItems: 'center' }}>
          <CreateIcon sx={{ marginRight: 1 }} /> Create Global Request
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
              '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
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
                  '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
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
                  '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
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
              '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
            },
          }}
        />
        <TextField
          name="minBid"
          label="Minimum Bid"
          type="number"
          variant="outlined"
          value={formData.minBid}
          onChange={handleChange}
          sx={{
            '& .MuiInputBase-input': { color: '#fff' },
            '& .MuiInputLabel-root': { color: '#ccc' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
            },
          }}
        />
        <TextField
          name="maxBid"
          label="Maximum Bid"
          type="number"
          variant="outlined"
          value={formData.maxBid}
          onChange={handleChange}
          sx={{
            '& .MuiInputBase-input': { color: '#fff' },
            '& .MuiInputLabel-root': { color: '#ccc' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
            },
          }}
        />
        <Button variant="contained" sx={{
          backgroundColor: 'rgba(98, 0, 234, 0.8)',
          '&:hover': { backgroundColor: 'rgba(55, 0, 179, 0.8)' },
          padding: '10px 20px',
          borderRadius: '8px',
          textTransform: 'none',
        }} onClick={handleSubmit}>
          Create Request
        </Button>
      </Box>
    </LocalizationProvider>
  );
}

export default GlobalRequestCreate;
