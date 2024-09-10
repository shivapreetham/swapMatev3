import React, { useState } from 'react';
import { Box, Button, Typography, List, ListItem, ListItemText, Paper, Collapse, TextField, Stack } from '@mui/material';
import { styled } from '@mui/system';
import ViewListIcon from '@mui/icons-material/ViewList';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ChatIcon from '@mui/icons-material/Chat';

const CustomPaper = styled(Paper)({
  backgroundColor: 'rgba(24, 24, 24, 0.8)', // Semi-transparent dark background
  color: '#ffffff',
  borderRadius: '12px',
  padding: '24px',
  boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
  backdropFilter: 'blur(8px)', // Frosted glass effect
  border: '1px solid rgba(255, 255, 255, 0.18)', // Slight border
  maxWidth: '1000px',
  margin: '0 auto', // Center the content horizontally
});

const CustomButton = styled(Button)({
  color: '#ffffff',
  borderRadius: '8px',
  textTransform: 'none',
  padding: '8px 16px',
  '&:hover': {
    backgroundColor: '#333333',
  },
});

const ViewBidButton = styled(CustomButton)({
  backgroundColor: 'rgba(33, 150, 243, 0.8)', // Blue background for viewing and bidding
  '&:hover': {
    backgroundColor: 'rgba(30, 136, 229, 0.8)',
  },
});

const CollapsibleBox = styled(Box)({
  padding: '20px',
  backgroundColor: 'rgba(255, 255, 255, 0.1)', // Light semi-transparent background
  borderRadius: '10px',
  marginBottom: '10px',
  backdropFilter: 'blur(8px)', // Frosted glass effect
  border: '1px solid rgba(255, 255, 255, 0.2)', // Slight border
});

const GlobalRequestList = () => {
  const [expandedRequestId, setExpandedRequestId] = useState(null);

  const requests = [
    { id: 1, subject: 'Math', classDate: '2024-08-15', minBid: 10, maxBid: 50, honorScore: 80 },
    { id: 2, subject: 'Science', classDate: '2024-08-16', minBid: 15, maxBid: 60, honorScore: 90 },
  ];

  const handleExpandClick = (id) => {
    setExpandedRequestId(expandedRequestId === id ? null : id);
  };

  return (
    <CustomPaper>
      <Typography variant="h4" sx={{ marginBottom: 3, display: 'flex', alignItems: 'center' }}>
        <ViewListIcon sx={{ marginRight: 1, color: '#ff9800' }} />
        Global Requests
      </Typography>
      <List>
        {requests.map(request => (
          <Box key={request.id}>
            <ListItem
              sx={{
                borderBottom: '1px solid rgba(255, 255, 255, 0.3)', // Glassy border
                padding: '16px',
                '&:last-child': { borderBottom: 'none' },
              }}
            >
              <ListItemText
                primary={<Typography variant="h6" sx={{ color: '#ffffff' }}>{`${request.subject} on ${request.classDate}`}</Typography>}
                secondary={
                  <Typography variant="body2" sx={{ color: '#cccccc' }}>
                    Min Bid: ${request.minBid} | Max Bid: ${request.maxBid}
                  </Typography>
                }
              />
              <ViewBidButton onClick={() => handleExpandClick(request.id)}>
                {expandedRequestId === request.id ? 'Hide Details' : 'View & Place Bid'}
              </ViewBidButton>
            </ListItem>
            <Collapse in={expandedRequestId === request.id} timeout="auto" unmountOnExit>
              <CollapsibleBox>
                <Typography variant="body2" sx={{ color: '#ffffff' }}>
                  Honor Score: {request.honorScore}
                </Typography>
                <TextField
                  label="Your Bid"
                  type="number"
                  fullWidth
                  variant="outlined"
                  sx={{
                    marginTop: 2,
                    '& .MuiInputBase-input': { color: '#fff' },
                    '& .MuiInputLabel-root': { color: '#ccc' },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: '#555' },
                    },
                  }}
                />
                <Button
                  variant="contained"
                  sx={{ marginTop: 2, backgroundColor: '#1db954', '&:hover': { backgroundColor: '#1ed760' } }}
                >
                  Place Bid
                </Button>
              </CollapsibleBox>
            </Collapse>
          </Box>
        ))}
      </List>
    </CustomPaper>
  );
};

export default GlobalRequestList;
