import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import GavelIcon from '@mui/icons-material/Gavel';

function GlobalRequestBid() {
  const [bidPrice, setBidPrice] = useState('');

  const handleChange = (e) => {
    setBidPrice(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle bid submission logic here
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{
      padding: 4,
      backgroundColor: '#1e1e1e',
      borderRadius: 2,
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    }}>
      <Typography variant="h4" sx={{ marginBottom: 2, color: '#fff' }}>
        <GavelIcon sx={{ marginRight: 1 }} /> Place Bid
      </Typography>
      <TextField
        label="Bid Price"
        name="bidPrice"
        value={bidPrice}
        onChange={handleChange}
        fullWidth
        sx={{
          marginBottom: 2,
          '& .MuiInputBase-input': { color: '#fff' },
          '& .MuiInputLabel-root': { color: '#ccc' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#555' },
          },
        }}
      />
      <Button type="submit" variant="contained" sx={{
        backgroundColor: '#6200ea',
        '&:hover': { backgroundColor: '#3700b3' }
      }}>Submit Bid</Button>
    </Box>
  );
}

export default GlobalRequestBid;
