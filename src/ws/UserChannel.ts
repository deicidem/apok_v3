import Echo from '@/ws/Echo';
import type { Channel } from 'laravel-echo';

class UserChannel {
  channel: Channel | null;
  userId: number | null;
  constructor(userId: number | null) {
    this.channel = null;
    this.userId = null;
    if (userId != null) {
      this.setChannel(userId);
    }
  }
  setChannel(userId: number) {
    this.channel = Echo.private('App.Models.User.' + userId);
    this.userId = userId;
  }
  removeChannel() {
    Echo.leaveChannel('App.Models.User.' + this.userId);
    this.channel = null;
    this.userId = null;
  }
}

export default new UserChannel(null);
