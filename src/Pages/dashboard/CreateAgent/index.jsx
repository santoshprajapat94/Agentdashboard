import React from 'react';
import { Box, Typography, Slider, TextField, Button, Avatar, IconButton, Grid2, Grid } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import { useState } from 'react';
import AgentTabs from './AgentTabs';
import AgentMainSection from './AgentMainSection';
import KnowledgeSection from './KnowledgeSection';
import AgentAction from './AgentAction';
import AgentDeploy from './AgentDeploy';
import ChatComponent from './AgentReview';
import { Height } from '@mui/icons-material';

const CreateAgent = () => {
     const [tab, setTab] = React.useState(0);
     const [agentData, setAgentData] = useState([])
     console.log('agent',agentData)
     const handleTabChange = (index) => {
      setTab(index); 
  };

   const renderTabContent = () => {
          switch (tab) {
              case 0: 
                  return <AgentMainSection setAgentData={setAgentData} agentData={agentData} setTab={setTab} />;
              case 1: 
                  return <KnowledgeSection setAgentData={setAgentData} agentData={agentData} setTab={setTab} />;
              case 2:
                  return <AgentAction setAgentData={setAgentData} agentData={agentData} setTab={setTab} />;
              case 3: 
                  return <AgentDeploy setAgentData={setAgentData} agentData={agentData} setTab={setTab} />;
              default:
                  return null;
          }
      };

  return (
    <Grid container spacing={2}  className="p-1  bg-gray-50 rounded-lg shadow-md">
      <Grid item xs={12} md={6} lg={3}>
        <AgentTabs  handleTabChange={handleTabChange} tab={tab}/>
      </Grid>
      <Grid item xs={12} md={6} lg={5} style={{overflow:'auto'}}>
      {renderTabContent()}
      </Grid> 
      <Grid item xs={12} md={6} lg={4}>
        <ChatComponent />
      </Grid>
    </Grid>

  );
};

export default CreateAgent;
