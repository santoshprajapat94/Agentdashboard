// components/Loading.jsx
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = ({isLoading}) => {
  return (
    <>
    {
        isLoading && (
            <CircularProgress
             size="3rem"
             animation="border"
             role="status"
             style={{
               position: 'fixed',
               right: '50%',
               left: '50%',
               top: '50%',
               bottom: '50%',
               color: '#13BCAB',
               width: '5rem',
               height: '5rem',
               zIndex: '999',
               display: 'block',
             }} 
            />
        )
    }
    </>
  );
};

export default Loading;
