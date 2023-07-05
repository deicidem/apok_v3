import server from '@/api/http';

export async function all(params) {
  return await server.get(
    'groups',
    { params },
    { errorTitle: 'Ошибка при получении списка  групп' },
  );
}

export async function one(id) {
  return await server.get('groups/' + id, {
    errorTitle: 'Ошибка при получении группы',
  });
}

export async function getUsersByGroup(groupId, params) {
  return await server.get('groups/' + groupId + '/users', {
    params,
    errorTitle: 'Ошибка при получении списка пользователей группы',
  });
}

export async function create(params) {
  return await server.post('groups', params, {
    errorTitle: 'Ошибка при создании группы',
  });
}

export async function deleteBatch(groupsIds) {
  let params = {};
  for (let i = 0; i < groupsIds.length; i++) {
    params[`ids[${i}]`] = groupsIds[i];
  }
  return await server.delete('groups', { params }, { errorTitle: 'Ошибка при удалении групп' });
}

export async function deleteOne(id) {
  return await server.delete('groups/' + id, {
    errorTitle: 'Ошибка при удалении группы',
  });
}

export async function getInviteLink(id, params) {
  return await server.get(
    'groups/' + id + '/invite',
    { params },
    { errorTitle: 'Ошибка при генерации приглашения' },
  );
}

export async function exclude(id, userId) {
  return await server.delete('groups/' + id + '/users/' + userId, {
    errorTitle: 'Ошибка при попытке исключить пользователя',
  });
}
export async function excludeBatch(groupId, userIds) {
  let params = {};
  for (let i = 0; i < userIds.length; i++) {
    params[`ids[${i}]`] = userIds[i];
  }
  return await server.delete(
    'groups/' + groupId + '/users',
    { params },
    { errorTitle: 'Ошибка при попытке исключить пользователя' },
  );
}

export async function verify(id, userId) {
  return await server.put('groups/' + id + '/users/' + userId, {
    errorTitle: 'Ошибка при попытке добавить пользователя в группу',
  });
}

export async function quit(id) {
  return await server.delete('groups/' + id + '/quit', {
    errorTitle: 'Ошибка при попытке выйти из группы',
  });
}

export async function update(id, params) {
  return await server.put('groups/' + id, params, {
    errorTitle: 'Ошибка при обновлении информации о группе',
  });
}

export async function addUsers({ groupId, users }) {
  let formData = new FormData();
  for (let i = 0; i < users.length; i++) {
    formData.append(`users[${i}]`, users[i]);
  }
  return await server.post(`groups/${groupId}/users`, formData, {
    errorTitle: 'Ошибка при добавлении пользователей в группу',
  });
}
