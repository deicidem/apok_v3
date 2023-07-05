import Echo from 'laravel-echo';
import 'pusher-js';
// import Pusher from "pusher-js";
console.log(window.location);
const echo = new Echo({
  broadcaster: 'pusher',
  key: '2',
  wsHost: window.location.hostname,
  wsPort: 6001,
  cluster: 'eu',
  forceTLS: false,
  disableStats: true,
  authEndpoint: window.location.origin + '/broadcasting/auth',
});

export default echo;
// export function subToChannel(channel) {
//   return echo.private(channel);
// }
