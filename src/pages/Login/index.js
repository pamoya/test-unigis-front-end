import * as React from 'react';
import { SignInPage } from '@toolpad/core/SignInPage';
import { AppProvider } from '@toolpad/core/AppProvider';
import { useTheme } from '@mui/material/styles';
import { Card, CardContent , CardActions, Button, Typography } from '@mui/material';


const providers = [{ id: 'nodemailer', name: 'Email' }];

const goToPage = async () => {
  window.location = "/puntosventa"
};

export default function Login() {
  const theme = useTheme();
  return (
    <AppProvider theme={theme}>
      <Card className='begin-card' sx={{ minWidth: 275, maxWidth: 500 }}>
        <CardContent>
          <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 25 }}>
            Sistema de Gestión de Puntos de Venta
          </Typography>
          <Typography variant="body2">
            Ingresa para porder ver los puntos de venta
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={goToPage}>Da click aqui para continuar</Button>
        </CardActions>
      </Card>
    </AppProvider>
  );
}