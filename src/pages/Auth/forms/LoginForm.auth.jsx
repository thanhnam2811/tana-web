import React from 'react';

import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Link,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { loginAction } from '../../../redux/auth';
import { useDispatch } from 'react-redux';
import useToken from '../../../hooks/useToken.hook';

export default function LoginForm({ setIsLogin }) {
  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();
  const { setToken } = useToken();

  const onSubmit = (data) => {
    dispatch(loginAction(data, setToken));
  };

  return (
    <Box p={3} display='flex' flexDirection='column' gap={3} flexWrap='nowrap'>
      {/* Header */}
      <Box display='flex' justifyContent='center'>
        <Typography variant='h4' fontWeight={800} color='primary'>
          Đăng nhập
        </Typography>
      </Box>

      {/* Form */}
      <Box
        component='form'
        display='flex'
        flexDirection='column'
        gap='8px'
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          required
          sx={{ borderRadius: '4px' }}
          autoComplete='email'
          label='Email'
          variant='outlined'
          fullWidth
          {...register('email')}
        />
        <TextField
          sx={{ borderRadius: '4px' }}
          required
          autoComplete='current-password'
          label='Mật khẩu'
          variant='outlined'
          fullWidth
          type='password'
          {...register('password')}
        />
        <Button
          sx={{ borderRadius: '4px', height: '56px' }}
          variant='contained'
          type='submit'
        >
          Đăng nhập
        </Button>
      </Box>

      {/* Another login method */}
      <Box>
        <Grid container alignItems='center' gap='8px'>
          <Grid item xs>
            <Divider />
          </Grid>
          <Grid item xs='auto'>
            <Typography variant='body1' color='inActive'>
              đăng nhập với
            </Typography>
          </Grid>
          <Grid item xs>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <Grid container justifyContent='center'>
              <Grid item xs='auto'>
                <Tooltip title='Đăng nhập với Google'>
                  <IconButton>
                    <Avatar
                      src={
                        process.env.PUBLIC_URL + '/static/icons/google-icon.svg'
                      }
                      alt='Google'
                    />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item xs='auto'>
                <Tooltip title='Đăng nhập với Github'>
                  <IconButton>
                    <Avatar
                      src={
                        process.env.PUBLIC_URL + '/static/icons/github-icon.svg'
                      }
                      alt={'Github'}
                    />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/* Register Link */}
      <Box display='flex' justifyContent='center'>
        <Typography variant='body1'>
          Bạn chưa có tài khoản?{' '}
          <Link
            variant='body1'
            color='primary'
            sx={{
              textTransform: 'none',
              display: 'inline',
              cursor: 'pointer',
              textDecoration: 'none',
            }}
            onClick={(e) => {
              e.preventDefault();
              setIsLogin(false);
            }}
          >
            Đăng ký ngay!
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
