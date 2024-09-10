import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography, Paper } from '@mui/material';
import GlobalRequestCreate from '../components/GlobalRequest/GlobalRequestCreate';
import GlobalRequestList from '../components/GlobalRequest/GlobalRequestList';
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

function GlobalRequestsPage() {
  const [currentTab, setCurrentTab] = useState(0);

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <DarkPaper>
      <Typography variant="h3" sx={{ marginBottom: 4, color: '#ffffff' }}>Global Requests</Typography>
      <StyledTabs value={currentTab} onChange={handleChange} aria-label="global requests tabs">
        <StyledTab label="Create Request" />
        <StyledTab label="View Requests" />
      </StyledTabs>
      <Box sx={{ marginTop: 4 }}>
        {currentTab === 0 && <GlobalRequestCreate />}
        {currentTab === 1 && <GlobalRequestList />}
      </Box>
    </DarkPaper>
  );
}

export default GlobalRequestsPage;
