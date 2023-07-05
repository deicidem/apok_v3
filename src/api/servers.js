import server from '@/api/http';

export async function all() {
  return await server.get('servers', {
    errorTitle: 'Ошибка при получении списка серверов',
  });
}

export async function one(id) {
  return await server.get('servers/' + id, {
    errorTitle: 'Ошибка при получении сервера',
  });
}

export async function deleteOne(id) {
  return await server.delete('servers/' + id, {
    errorTitle: 'Ошибка при удалении сервера',
  });
}

export async function update(id, params) {
  return await server.put('servers/' + id, params, {
    errorTitle: 'Ошибка при редактировании сервера',
  });
}

export async function create(params) {
  return await server.post('servers', params, {
    errorTitle: 'Ошибка при создани сервера',
  });
}
