import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography, Paper } from '@mui/material';
import PrivateRequestCreate from '../components/PrivateRequest/PrivateRequestCreate';
import PrivateRequestList from '../components/PrivateRequest/PrivateRequestList';
import { styled } from '@mui/system';

const DarkPaper = styled(Paper)({
  backgroundColor: '#121212',
  color: '#ffffff',
  borderRadius: '12px',
  padding: '24px',
  boxShadow: '0 6px 15px rgba(0,0,0,0.5)',
});

const StyledTabs = styled(Tabs)({
  borderBottom: '1px solid #333',
});

const StyledTab = styled(Tab)({
  textTransform: 'none',
  color: '#ffffff',
  '&.Mui-selected': {
    color: '#1db954',
  },
  '&:hover': {
    color: '#b0b0b0',
  },
});

function PrivateRequestsPage() {
  const [currentTab, setCurrentTab] = useState(0);

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <DarkPaper>
      <Typography variant="h3" sx={{ marginBottom: 4, color: '#ffffff' }}>Private Requests</Typography>
      <StyledTabs value={currentTab} onChange={handleChange} aria-label="private requests tabs">
        <StyledTab label="Create Request" />
        <StyledTab label="View Requests" />
        <StyledTab label="Place Bid" />
      </StyledTabs>
      <Box sx={{ marginTop: 4 }}>
        {currentTab === 0 && <PrivateRequestCreate />}
        {currentTab === 1 && <PrivateRequestList />}
        {currentTab === 2 && <PrivateRequestBid />}
      </Box>
    </DarkPaper>
  );
}

export default PrivateRequestsPage;
