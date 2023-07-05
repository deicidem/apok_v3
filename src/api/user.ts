import server from '@/api/http';

export async function setCookie() {
  return await server.get('csrf-cookie');
}

export async function auth() {
  return await server
    .get('user/auth', {
      validateStatus: () => true,
    })
    .then((data) => {
      data.data._errorMessage = 'Ошибка при попытке аутентификации';
      return data;
    });
}

export async function isAuth() {
  return await server.get('user/check-auth');
}

export async function login(email: string, password: string, remember: boolean) {
  return await server.post('login', { email, password, remember }).then((data) => {
    data.data._errorMessage = 'Ошибка при попытке входа в систему';
    return data;
  });
}

export async function logout() {
  return await server.post('logout').then((data) => {
    data.data._errorMessage = 'Ошибка при попытке выхода из системы';
    return data;
  });
}

export async function register(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  password_confirmation: string,
  organisation: string,
  phoneNumber: string,
) {
  return await server
    .post('register', {
      firstName,
      lastName,
      email,
      password,
      password_confirmation,
      organisation,
      phoneNumber,
    })
    .then((data) => {
      data.data._errorMessage = 'Ошибка при попытке регистрации в системе';
      return data;
    });
}

export async function update(
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  organisation: string,
) {
  return await server
    .put('user/profile-information', {
      firstName,
      lastName,
      email,
      phoneNumber,
      organisation,
    })
    .then((data) => {
      data.data._errorMessage = 'Ошибка при изменить личные данные';
      return data;
    });
}

export async function updatePassword(
  email: string,
  currentPassword: string,
  password: string,
  passwordConfirmation: string,
) {
  return await server
    .put('user/password', {
      email,
      current_password: currentPassword,
      password,
      password_confirmation: passwordConfirmation,
    })
    .then((data) => {
      data.data._errorMessage = 'Ошибка при попытке смены пароля';
      return data;
    });
}
export async function forgotPassword(email: string) {
  return await server
    .post(
      'forgot-password',
      {
        email,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      },
    )
    .then((data) => {
      data.data._errorMessage = 'Ошибка при попытке восстановить пароль';
      return data;
    });
}
export async function resetPassword(
  email: string,
  password: string,
  passwordConfirmation: string,
  token: string,
) {
  return await server
    .post(
      'reset-password',
      {
        email,
        password,
        password_confirmation: passwordConfirmation,
        token,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      },
    )
    .then((data) => {
      data.data._errorMessage = 'Ошибка при попытке восстановить пароль';
      return data;
    });
}

export async function sendEmailVerification() {
  return await server.post('email/verification-notification').then((data) => {
    data.data._errorMessage =
      'Ошибка при попытке отправить письмо для подтверждения электронной почты';
    return data;
  });
}

export async function verifyEmail(url: string) {
  return await server.get(url).then((data) => {
    data.data._errorMessage = 'Ошибка при попытке подтверждения электронной почты';
    return data;
  });
}

export async function getNotificationsConfig() {
  return await server.get('notifications-config').then((data) => {
    data.data._errorMessage = 'Ошибка при попытке получения настроек уведомлений';
    return data;
  });
}

export async function updateNotificationsConfig(params: any) {
  return await server.post('notifications-config', { configs: params }).then((data) => {
    data.data._errorMessage = 'Ошибка при попытке получения настроек уведомлений';
    return data;
  });
}
