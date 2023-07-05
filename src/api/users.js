import server from '@/api/http';

export async function all(params) {
  return await server.get(
    'users',
    {
      params,
    },
    { errorTitle: 'Ошибка при получении списка пользователей' },
  );
}

export async function one(id) {
  return await server.get('users/' + id, {
    errorTitle: 'Ошибка при получении пользователя',
  });
}

export async function getLogs(id) {
  return await server.get('users/' + id + '/logs', {
    errorTitle: 'Ошибка при получении логов пользователя',
  });
}

export async function getOnlineSessions(id) {
  return await server.get('users/' + id + '/online-sessions', {
    errorTitle: 'Ошибка при получении сессий пользователя',
  });
}

export async function update(id, params) {
  return await server.put('users/' + id, params, {
    errorTitle: 'Ошибка при обновлении данных пользователя',
  });
}

export async function create(params) {
  console.log(params);
  return await server.post('users', params, {
    errorTitle: 'Ошибка при создании пользователя',
  });
}

export async function deleteOne(id) {
  return await server.delete('users/' + id, {
    errorTitle: 'Ошибка при удалении пользователя',
  });
}

export async function deleteBatch(ids) {
  let params = {};
  for (let i = 0; i < ids.length; i++) {
    params[`ids[${i}]`] = ids[i];
  }
  return await server.delete(
    'users',
    {
      params,
    },
    {
      errorTitle: 'Ошибка при удалении пользователей',
    },
  );
}

export async function verify(id) {
  return await server.post(`users/${id}/verify`, {
    errorTitle: 'Ошибка при верификации пользователя',
  });
}

export async function verifyBatch(ids) {
  let formData = new FormData();
  for (let i = 0; i < ids.length; i++) {
    formData.append(`ids[${i}]`, ids[i]);
  }
  return await server.post('users/verify', formData, {
    errorTitle: 'Ошибка при верификации пользователей',
  });
}

export async function block(id) {
  return await server.post(`users/${id}/block`, {
    errorTitle: 'Ошибка при блокировке пользователя',
  });
}

export async function blockBatch(ids) {
  let formData = new FormData();
  for (let i = 0; i < ids.length; i++) {
    formData.append(`ids[${i}]`, ids[i]);
  }
  return await server.post('users/block', formData, {
    errorTitle: 'Ошибка при блокировке пользователей',
  });
}

export async function unblockBatch(ids) {
  let formData = new FormData();
  for (let i = 0; i < ids.length; i++) {
    formData.append(`ids[${i}]`, ids[i]);
  }
  return await server.post('users/unblock', formData, {
    errorTitle: 'Ошибка при разблокировке пользователей',
  });
}

export async function unblock(id) {
  return await server.post(`users/${id}/unblock`, {
    errorTitle: 'Ошибка при разблокировке пользователя',
  });
}
