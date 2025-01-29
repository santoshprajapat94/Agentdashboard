import { Box, Typography, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import * as React from 'react';
import ForumIcon from '@mui/icons-material/Forum';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';

const AgentTabs = ({handleTabChange,tab}) => {

    const TabsNavData = [
        {
            tab_name: 'General info',
            tab_icon: <ForumIcon />
        },
        {
            tab_name: 'Knowledge',
            tab_icon: <InboxIcon />
        },
        {
            tab_name: 'Actions(optional)',
            tab_icon: <DraftsIcon />
        },
        {
            tab_name: 'Deploy',
            tab_icon: <SendIcon />
        }
    ];

    return (
        <Box className="w-1/8 p-3 transition-all">
            <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 600, textAlign: 'left' }}>
                Create Agent
            </Typography>

            <List sx={{ maxWidth: 360, minWidth: 100 }} component="nav" aria-labelledby="nested-list-subheader">
                {TabsNavData.map((item, idx) => (
                    <ListItemButton
                        key={idx}
                        onClick={() => handleTabChange(idx)}
                        sx={{
                            backgroundColor: tab === idx ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                            '&:hover': {
                                backgroundColor: tab === idx ? 'rgba(0, 0, 0, 0.12)' : 'rgba(0, 0, 0, 0.04)',
                            },
                        }}
                    >
                        <ListItemIcon>{item?.tab_icon}</ListItemIcon>
                        <ListItemText primary={item?.tab_name} />
                    </ListItemButton>
                ))}
            </List>
        </Box>
    );
};

export default AgentTabs;
