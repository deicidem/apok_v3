import { ref, computed } from 'vue';
import * as userApi from '@/api/user';
import { defineStore } from 'pinia';
import type { User } from '@/models/User';
import { useAlertsStore } from './alerts';
import type { Alert } from '@/models/Alert';
import UserChannel from '@/ws/UserChannel';
import AdminChannel from '@/ws/AdminChannel';
import { useConfigsStore } from './configs';

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null);
  const pending = ref<boolean>(false);
  const emailVerificationLink = ref<string | null>(null);
  const authTimer = ref<number>(0);
  const notificationConfig = ref({});

  const isAuth = computed<boolean>(() => {
    return user.value != null;
  });

  const isVerified = computed<boolean>(() => {
    return user.value?.isVerified as boolean;
  });

  const isAdmin = computed<boolean>(() => {
    return user.value?.role.slug == 'admin';
  });

  const setCookie = async () => {
    await userApi.setCookie();
  };

  const auth = async () => {
    const { getConfigsMap } = useConfigsStore();
    try {
      user.value = (await userApi.auth()).data.data;

      UserChannel.setChannel(user.value!.id);
      AdminChannel.setChannel();

      const time: number = Number(getConfigsMap['user_auth_check_interval'].value) * 60 * 1000;
      createTimer(time, async () => {
        await auth();
      });
    } catch (error) {
      user.value = null;
      UserChannel.removeChannel();
      AdminChannel.removeChannel();
    }
  };

  const login = async (email: string, password: string, remember: boolean) => {
    const { addSuccessAlert } = useAlertsStore();

    await userApi.login(email, password, remember);

    addSuccessAlert({
      title: 'Вы успешно авторизованы',
      message: 'Вы будете перенаправлены на главную страницу',
    } as Alert);

    await auth();
    // dispatch("notifications/connectToEcho", null, {root: true});

    if (emailVerificationLink.value) {
      await verifyEmail(emailVerificationLink.value);
      emailVerificationLink.value = null;
    }
  };

  const regUser = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    passwordConfirmation: string,
    organisation: string,
    phoneNumber: string,
  ) => {
    const { addSuccessAlert } = useAlertsStore();

    await userApi.register(
      firstName,
      lastName,
      email,
      password,
      passwordConfirmation,
      organisation,
      phoneNumber,
    );

    addSuccessAlert({
      title: 'Вы успешно зарегистрированы',
      message:
        'На вашу почту было отправлено письмо для подтверждения. Сейчас вы будете перенаправлены на главную страницу',
    } as Alert);

    await auth();
  };

  const updateUser = async (
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    organisation: string,
  ) => {
    const { addSuccessAlert } = useAlertsStore();

    await userApi.update(firstName, lastName, email, phoneNumber, organisation);

    addSuccessAlert({
      title: 'Информация о вас успешно обновлена',
    } as Alert);

    await auth();
  };

  const updatePassword = async (
    email: string,
    currentPassword: string,
    password: string,
    passwordConfirmation: string,
  ) => {
    const { addSuccessAlert } = useAlertsStore();

    await userApi.updatePassword(email, currentPassword, password, passwordConfirmation);

    addSuccessAlert({
      title: 'Пароль успешно изменен',
    } as Alert);

    await auth();
  };

  const forgotPassword = async (email: string) => {
    const { addSuccessAlert } = useAlertsStore();

    await userApi.forgotPassword(email);

    addSuccessAlert({
      title: 'На вашу электроную почту было отправлено письмо для восстановления пароля',
    } as Alert);

    await auth();
  };

  const resetPassword = async (
    email: string,
    password: string,
    passwordConfirmation: string,
    token: string,
  ) => {
    const { addSuccessAlert } = useAlertsStore();

    await userApi.resetPassword(email, password, passwordConfirmation, token);

    addSuccessAlert({
      title: 'На вашу электроную почту было отправлено письмо для восстановления пароля',
    } as Alert);

    await auth();
  };

  const logout = async () => {
    const { addSuccessAlert } = useAlertsStore();

    await userApi.logout();
    user.value = null;

    addSuccessAlert({
      title: 'Вы вышли из системы',
    } as Alert);

    // dispatch("notifications/disconnectFromEcho", null, {root: true});
  };

  const sendEmailVerification = async () => {
    const { addSuccessAlert } = useAlertsStore();

    await userApi.sendEmailVerification();

    addSuccessAlert({
      title: 'На вашу почту было отправлено письмо для подтверждения',
    } as Alert);
  };

  const verifyEmail = async (url: string) => {
    const { addSuccessAlert } = useAlertsStore();

    await userApi.verifyEmail(url);

    addSuccessAlert({
      title: 'Ваша почта успешно подтверждена',
    } as Alert);

    await auth();
  };

  // async fetchNotificationsConfig({ commit }) {
  //   commit("setPending", true);
  //   let res = await userApi.getNotificationsConfig();
  //   commit("setNotificationsConfig", res.data.data);
  //   commit("setPending", false);
  // },
  // async updateNotificationsConfig({ commit, dispatch }, payload) {
  //   commit("setPending", true);
  //   await userApi.updateNotificationsConfig(JSON.stringify(payload));
  //   dispatch(
  //     "alerts/addSuccessAlert",
  //     {
  //       title: "Настройки уведомлений успешно изменены",
  //     },
  //     { root: true }
  //   );
  //   commit("setPending", false);
  // },

  const createTimer = async (time: number, callback: Function) => {
    if (authTimer.value) {
      clearTimeout(authTimer.value);
    }
    authTimer.value = Number(
      setTimeout(async () => {
        await callback;
      }, time),
    );
  };

  return {
    user,
    pending,
    emailVerificationLink,
    authTimer,
    notificationConfig,
    isAuth,
    isVerified,
    isAdmin,
    setCookie,
    auth,
    login,
    regUser,
    updateUser,
    updatePassword,
    forgotPassword,
    resetPassword,
    logout,
    sendEmailVerification,
    verifyEmail,
    createTimer,
  };
});
