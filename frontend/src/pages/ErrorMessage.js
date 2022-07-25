import React from 'react'
import Alert from '@mui/material/Alert';

function ErrorMessage({variant = 'danger' , children}) {
  return (
  
    <Alert variant={variant} style={{fontSize:15 , color:"red"}} >
        <strong>{children}</strong>
    </Alert>
  )
}

export default ErrorMessage;