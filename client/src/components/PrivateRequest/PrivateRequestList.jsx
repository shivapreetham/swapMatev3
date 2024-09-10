import React from 'react';
import { Box, Button, Typography, List, ListItem, ListItemText, Paper, Stack } from '@mui/material';
import { styled } from '@mui/system';
import GavelIcon from '@mui/icons-material/Gavel';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ChatIcon from '@mui/icons-material/Chat';

const CustomPaper = styled(Paper)({
  backgroundColor: 'rgba(24, 24, 24, 0.8)',
  color: '#ffffff',
  borderRadius: '12px',
  padding: '24px',
  boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  maxWidth: '1000px',
  margin: '0 auto', // Center the content horizontally
});

const CustomButton = styled(Button)({
  color: '#ffffff',
  borderRadius: '8px',
  textTransform: 'none',
  padding: '8px 20px',
  '&:hover': {
    backgroundColor: '#333333',
  },
});

const AcceptButton = styled(CustomButton)({
  backgroundColor: 'rgba(76, 175, 80, 0.8)',
  '&:hover': {
    backgroundColor: 'rgba(56, 142, 60, 0.8)',
  },
});

const RejectButton = styled(CustomButton)({
  backgroundColor: 'rgba(244, 67, 54, 0.8)',
  '&:hover': {
    backgroundColor: 'rgba(211, 47, 47, 0.8)',
  },
});

const NegotiateButton = styled(CustomButton)({
  backgroundColor: 'rgba(255, 152, 0, 0.8)',
  '&:hover': {
    backgroundColor: 'rgba(245, 124, 0, 0.8)',
  },
});

const PrivateRequestList = () => {
  const requests = [
    { id: 1, subject: 'Math', classDate: '2024-08-15', initialOffer: 100 },
    { id: 2, subject: 'Science', classDate: '2024-08-16', initialOffer: 120 },
  ];

  return (
    <CustomPaper>
      <Typography variant="h4" sx={{ marginBottom: 3, display: 'flex', alignItems: 'center' }}>
        <GavelIcon sx={{ marginRight: 1, color: '#ff9800' }} />
        Private Requests
      </Typography>
      <List>
        {requests.map((request) => (
          <ListItem
            key={request.id}
            sx={{
              borderBottom: '1px solid rgba(68, 68, 68, 0.6)',
              padding: '16px',
              '&:last-child': { borderBottom: 'none' },
            }}
          >
            <ListItemText
              primary={<Typography variant="h6" sx={{ color: '#ffffff' }}>{`${request.subject} on ${request.classDate}`}</Typography>}
              secondary={
                <Typography variant="body2" sx={{ color: '#cccccc' }}>
                  Offer: ${request.initialOffer}
                </Typography>
              }
            />
            <Stack direction="row" spacing={2}>
              <AcceptButton startIcon={<ThumbUpIcon />}>Accept</AcceptButton>
              <RejectButton startIcon={<ThumbDownIcon />}>Reject</RejectButton>
              <NegotiateButton startIcon={<ChatIcon />}>Negotiate</NegotiateButton>
            </Stack>
          </ListItem>
        ))}
      </List>
    </CustomPaper>
  );
};

export default PrivateRequestList;
