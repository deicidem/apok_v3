import Echo from '@/ws/Echo';
import type { Channel } from 'laravel-echo';

class AdminChannel {
  channel: Channel | null;
  constructor() {
    this.channel = null;
  }
  setChannel() {
    this.channel = Echo.private('Admin');
  }
  removeChannel() {
    Echo.leaveChannel('Admin');
    this.channel = null;
  }
}

export default new AdminChannel();
