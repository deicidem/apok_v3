import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { addErrorHandler } from '@/api/http';
import App from '@/App.vue';
import router from '@/router';
import './index.css';
import AppButton from '@/components/controls/AppButton.vue';
import { useAlertsStore } from '@/stores/alerts';
import * as a from "axios";

const app = createApp(App);
app.component("AppButton", AppButton)
app.use(createPinia());
app.use(router);
addErrorHandler(setErrorHandler);

app.mount('#app');
function setErrorHandler(error: any) {
  // if(error.response.status === 401 && error.config.silence401 !== true){
  //   //await
  //   store.dispatch('user/cleanUser');
  //   router.push({ name: 'login' }, function(){
  //     // document.location.reload(); // опционально, либо чистим склад
  //   });
  // }

  // if(!('errorSuppression' in error.config)){
  //   return Promise.reject(error);
  // }

  // let es = error.config.errorSuppression;

  // if('exclude' in es && es.exclude.includes(error.response.status)){
  //   return Promise.reject(error);
  // }

  // if('text' in es){
  //   let alert = { text: `Ошибка ответа от сервера ${es.text}` };

  //   if('critical' in es){
  //     alert.text += ' Рекомендуем перезагрузить страницу!';
  //   }
  //   else{
  //     alert.timeout = 3000;
  //   }

  //   store.dispatch('alerts/add', alert);
  // }
  // return { data: { ok: false } };
  const config = error.config;
  const alert: any = {};
  if (config.ignore || error.response.status == 401) {
    return Promise.reject(error);
  }
  if (config.errorMessage) {
    alert.title = config.errorMessage;
  } else {
    alert.title = 'Ошибка';
  }
  if (error?.response?.data?.message) {
    alert.message = error.response.data.message;
  } else {
    alert.message = 'На сервере что-то пошло не так';
  }
  alert.theme = 'error';
  useAlertsStore().addErrorAlert(alert);
  // store.dispatch("alerts/addAlert", alert);
  throw error;
}
