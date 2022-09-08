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
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerAction } from '../../../redux/auth';
import { getUser } from '../../../redux/slice/userSlice';
import useToken from '../../../hooks/useToken.hook';

export default function RegisterForm({ setIsLogin }) {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { setToken } = useToken();

  const onSubmit = async (data) => {
    data.account.email = data.user.email;

    const result = await dispatch(registerAction(data));

    if (result.status === 'ok') {
      if (result.action === 'login') {
        setToken(result.token);
        dispatch(getUser(result.token));
        nav('/home');
      } else {
        setIsLogin(true);
      }
    }
  };

  return (
    <Box p={3} display='flex' flexDirection='column' gap={3} flexWrap='nowrap'>
      {/* Header */}
      <Box display='flex' justifyContent='center'>
        <Typography variant='h4' fontWeight={800} color='primary'>
          Đăng ký
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
          autoComplete='name'
          label='Họ và tên'
          variant='outlined'
          fullWidth
          {...register('user.name')}
        />
        <TextField
          sx={{ borderRadius: '4px' }}
          autoComplete='email'
          label='Email'
          required
          variant='outlined'
          fullWidth
          {...register('user.email')}
        />
        <TextField
          sx={{ borderRadius: '4px' }}
          autoComplete='current-password'
          label='Mật khẩu'
          required
          variant='outlined'
          fullWidth
          type='password'
          {...register('account.password')}
        />
        <TextField
          sx={{ borderRadius: '4px' }}
          autoComplete='confirmPassword'
          label='Xác nhận lại mật khẩu'
          required
          variant='outlined'
          fullWidth
          type='password'
          {...register('confirmPassword')}
        />
        <Button
          sx={{ borderRadius: '4px', height: '56px' }}
          variant='contained'
          type='submit'
        >
          Đăng ký
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
              đăng ký với
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
          Bạn đã có tài khoản?{' '}
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
              setIsLogin(true);
            }}
          >
            Đăng nhập ngay!
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
