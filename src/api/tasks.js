import server from '@/api/http';

export async function all(params) {
  return await server.get('tasks', { params }, { errorTitle: 'Ошибка при получении списка задач' });
}

export async function one(id) {
  return await server.get('tasks/' + id, {
    errorTitle: 'Ошибка при получении задачи',
    ignore: true,
  });
}

export async function create({ planId, files, dzzs, vectors, params, links, note }, onUpload) {
  let formData = new FormData();

  formData.append('planId', planId);

  for (let i = 0; i < dzzs.length; i++) {
    formData.append(`dzzs[${i}]`, dzzs[i]);
  }
  for (let i = 0; i < files.length; i++) {
    formData.append(`files[${i}]`, files[i]);
  }
  for (let i = 0; i < vectors.length; i++) {
    formData.append(`vectors[${i}]`, vectors[i]);
  }
  for (let i = 0; i < params.length; i++) {
    formData.append(`params[${i}]`, params[i]);
  }

  formData.append('links', JSON.stringify(links));
  if (note) {
    formData.append('note', note);
  }
  return await server.post('tasks', formData, {
    errorTitle: 'Ошибка при создании задачи',
    onUploadProgress: onUpload,
  });
}

export async function deleteBatch(ids) {
  let params = {};
  for (let i = 0; i < ids.length; i++) {
    params[`ids[${i}]`] = ids[i];
  }
  return await server.delete('tasks', { params }, { errorTitle: 'Ошибка при удалении задач' });
}

export async function deleteOne(id) {
  return await server.delete('tasks/' + id, {
    errorTitle: 'Ошибка при удалении задачи',
  });
}

export async function update(id, params) {
  return await server.put('tasks/' + id, params, {
    errorTitle: 'Ошибка при редактировании задачи',
  });
}

export async function updateGroupsAccess(id, params) {
  return await server.post(
    `tasks/${id}/groups-access`,
    { configs: params },
    {
      errorTitle: 'Ошибка при попытке изменения настроект доступа групп к задаче',
    },
  );
}
