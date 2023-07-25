import server from '@/api/http';

type NotificationsQuery = {
  page: number;
  size: number;
};

export async function all(params: NotificationsQuery) {
  return await server.get('notifications', {
    params,
    errorMessage: 'Ошибка при получения списка уведомлений',
  });
}

export async function unreadCount() {
  return await server.get('notifications/unread-count', {
    errorMessage: 'Ошибка при получении количества непрочитанных уведомлений',
    ignore: true,
  });
}

// export async function deleteBatch(ids) {
//   let params = {};
//   for (let i = 0; i < ids.length; i++) {
//     params[`ids[${i}]`] = ids[i];
//   }
//   return await server.delete('user/notifications',
//     params, {
//       errorTitle: "Ошибка при удалении уведомлений"
//     });
// }

export async function deleteOne(id: number) {
  return await server.delete('notifications/' + id, {
    errorMessage: 'Ошибка при удалении уведомления',
  });
}

export async function deleteAll() {
  return await server.delete('notifications', {
    errorMessage: 'Ошибка при удалении уведомления',
  });
}

export async function markAsRead(id: number) {
  return await server.put(
    'notifications/' + id,
    {},
    {
      errorMessage: 'Ошибка при прочтении уведомления',
    },
  );
}

export async function markAsReadAll() {
  return await server.put(
    'notifications',
    {},
    {
      errorMessage: 'Ошибка при прочтении уведомления',
    },
  );
}
