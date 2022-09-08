import Swal from 'sweetalert2';
import callApi from '../utils/callAPI';
import { setUser } from './slice/userSlice';

export const registerAction = (data) => async (dispatch) => {
  const result = {
    status: 'error',
    token: '',
    action: '',
    message: '',
  };
  if (data.account.password !== data.confirmPassword) {
    Swal.fire({
      icon: 'error',
      title: 'Mật khẩu không khớp!',
      text: 'Vui lòng kiểm tra lại mật khẩu',
    });
    result.status = 'error';
  } else {
    Swal.fire({
      title: 'Đang hoàn tất đăng ký',
      text: 'Vui lòng chờ giây lát...',
      icon: 'info',
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const userResp = await callApi('users', 'POST', data.user);
    if (userResp.success && userResp.data) {
      data.account.userId = userResp.data.id;
      const accResp = await callApi(
        `users/${userResp.data.id}/accounts`,
        'POST',
        data.account
      );
      if (accResp.success && accResp.data) {
        result.status = 'ok';
        await Swal.fire({
          title: 'Đăng ký thành công!',
          text: 'Tự động đăng nhập vào web ngay?',
          icon: 'success',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Đăng nhập ngay!',
          cancelButtonText: 'Về trang đăng nhập',
        }).then((res) => {
          if (res.isConfirmed) {
            result.token = userResp.data.id;
            result.action = 'login';
          }
        });
      } else {
        result.status = 'error';
        result.message = accResp.message;
      }
    } else {
      result.status = 'error';
      result.message = userResp.message;
    }

    if (result.status === 'error') {
      Swal.fire({
        title: 'Lỗi!',
        text: result.message,
        icon: 'error',
      });
    }
  }
  return result;
};

export const loginAction = (data, setToken) => async (dispatch) => {
  Swal.fire({
    title: 'Đang đăng nhập',
    text: 'Vui lòng chờ giây lát...',
    icon: 'info',
    didOpen: () => {
      Swal.showLoading();
    },
  });
  const accRes = await callApi(`users/${data.email}/accounts`);
  if (accRes.success) {
    const acc = accRes.data[0];
    if (data.password !== acc.password)
      Swal.fire({
        title: 'Thông tin đăng nhập sai!',
        text: 'Vui lòng kiểm tra lại tài khoản và mật khẩu!',
        icon: 'warning',
      });
    else {
      const userRes = await callApi(`users/${data.email}`);
      if (userRes.success) {
        await Swal.fire({
          title: 'Đăng nhập thành công!',
          icon: 'success',
          timer: 800,
          showConfirmButton: false,
        });
        setToken(userRes.data.id);
        dispatch(setUser(userRes.data));
      } else
        Swal.fire({
          title: 'Lỗi kết nối!',
          text: userRes.message,
          icon: 'error',
        });
    }
  } else
    Swal.fire({
      title: 'Lỗi kết nối!',
      text: accRes.message,
      icon: 'error',
    });
};
