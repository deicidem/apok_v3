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

  async function setCookie() {
    await userApi.setCookie();
  }

  async function auth() {
    const { configsMap } = useConfigsStore();
    try {
      user.value = (await userApi.auth()).data.data;

      UserChannel.setChannel(user.value!.id);
      AdminChannel.setChannel();

      const time: number = Number(configsMap['user_auth_check_interval'].value) * 60 * 1000;
      createTimer(time, async () => {
        await auth();
      });
    } catch (error) {
      user.value = null;
      UserChannel.removeChannel();
      AdminChannel.removeChannel();
    }
  }

  async function login(email: string, password: string, remember: boolean) {
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
  }

  async function regUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    passwordConfirmation: string,
    organisation: string,
    phoneNumber: string,
  ) {
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
  }

  async function updateUser(
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    organisation: string,
  ) {
    const { addSuccessAlert } = useAlertsStore();

    await userApi.update(firstName, lastName, email, phoneNumber, organisation);

    addSuccessAlert({
      title: 'Информация о вас успешно обновлена',
    } as Alert);

    await auth();
  }

  async function updatePassword(
    email: string,
    currentPassword: string,
    password: string,
    passwordConfirmation: string,
  ) {
    const { addSuccessAlert } = useAlertsStore();

    await userApi.updatePassword(email, currentPassword, password, passwordConfirmation);

    addSuccessAlert({
      title: 'Пароль успешно изменен',
    } as Alert);

    await auth();
  }

  async function forgotPassword(email: string) {
    const { addSuccessAlert } = useAlertsStore();

    await userApi.forgotPassword(email);

    addSuccessAlert({
      title: 'На вашу электроную почту было отправлено письмо для восстановления пароля',
    } as Alert);

    await auth();
  }

  async function resetPassword(
    email: string,
    password: string,
    passwordConfirmation: string,
    token: string,
  ) {
    const { addSuccessAlert } = useAlertsStore();

    await userApi.resetPassword(email, password, passwordConfirmation, token);

    addSuccessAlert({
      title: 'На вашу электроную почту было отправлено письмо для восстановления пароля',
    } as Alert);

    await auth();
  }

  async function logout() {
    const { addSuccessAlert } = useAlertsStore();

    await userApi.logout();
    user.value = null;

    addSuccessAlert({
      title: 'Вы вышли из системы',
    } as Alert);

    // dispatch("notifications/disconnectFromEcho", null, {root: true});
  }

  async function sendEmailVerification() {
    const { addSuccessAlert } = useAlertsStore();

    await userApi.sendEmailVerification();

    addSuccessAlert({
      title: 'На вашу почту было отправлено письмо для подтверждения',
    } as Alert);
  }

  async function verifyEmail(url: string) {
    const { addSuccessAlert } = useAlertsStore();

    await userApi.verifyEmail(url);

    addSuccessAlert({
      title: 'Ваша почта успешно подтверждена',
    } as Alert);

    await auth();
  }

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

  async function createTimer(time: number, callback: Function) {
    if (authTimer.value) {
      clearTimeout(authTimer.value);
    }
    authTimer.value = Number(
      setTimeout(async () => {
        await callback;
      }, time),
    );
  }

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
