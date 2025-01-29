// StatsCard.jsx
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const StateCard = ({ title, value }) => (
  <Card>
    <CardContent>
      <Typography  sx={{ fontWeight:'bold',fontSize:'15px', textAlign: 'left' }}>{title}</Typography>
      <Typography sx={{ fontWeight:'500',fontSize:'14px', textAlign: 'left' }}>{value}</Typography>
    </CardContent>
  </Card>
);

export default StateCard;
