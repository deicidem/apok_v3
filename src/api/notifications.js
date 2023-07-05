import server from '@/api/http';

export async function all(params) {
  return await server.get(
    'notifications',
    {
      params,
    },
    {
      errorTitle: 'Ошибка при получения списка уведомлений',
    },
  );
}

export async function unreadCount() {
  return await server.get('notifications/unread-count', {
    errorTitle: 'Ошибка при получении количества непрочитанных уведомлений',
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

export async function deleteOne(id) {
  return await server.delete('notifications/' + id, {
    errorTitle: 'Ошибка при удалении уведомления',
  });
}

export async function deleteAll() {
  return await server.delete('notifications', {
    errorTitle: 'Ошибка при удалении уведомления',
  });
}

export async function markAsRead(id) {
  return await server.put('notifications/' + id, {
    errorTitle: 'Ошибка при прочтении уведомления',
  });
}

export async function markAsReadAll() {
  return await server.put('notifications', {
    errorTitle: 'Ошибка при прочтении уведомления',
  });
}
