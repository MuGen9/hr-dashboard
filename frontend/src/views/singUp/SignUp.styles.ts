import { SxProps } from '@mui/material';

export const box: SxProps = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  minHeight: '100vh'
};

export const paper: SxProps = {
  p: 2,
  width: '450px',
  borderRadius: 3,
  display: { xs: 'contents', sm: 'block' }
};

export const typography: SxProps = {
  fontSize: '2.4rem',
  fontWeight: 'medium',
  margin: '1rem',
  textAlign: 'center',
  wordBreak: 'break-all'
};

export const stack: SxProps = {
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
};
