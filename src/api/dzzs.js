import server from '@/api/http';

export async function all(params) {
  return await server.get(
    'dzzs',
    { params },
    { errorTitle: 'Ошибка при получении списка снимков' },
  );
}

export async function create(formData, onUpload) {
  return await server.post('dzzs', formData, {
    errorTitle: 'Ошибка при добавлении снимка',
    onUploadProgress: onUpload,
  });
}

export async function update(formData, id) {
  return await server.post('dzzs/' + id, formData, {
    errorTitle: 'Ошибка при добавлении снимка',
  });
}

export async function deleteBatch(ids) {
  let params = {};
  for (let i = 0; i < ids.length; i++) {
    params[`ids[${i}]`] = ids[i];
  }
  return await server.delete(
    'dzzs',
    { params },
    {
      errorTitle: 'Ошибка при удалении снимков',
    },
  );
}

export async function deleteOne(id) {
  return await server.delete('dzzs/' + id, {
    errorTitle: 'Ошибка при удалении снимка',
  });
}

export async function search(
  { startDate, endDate, startCloudiness, endCloudiness, months, satellites, polygon },
  params,
) {
  let globalSearch = {
    startDate: startDate.toJSON(),
    endDate: endDate.toJSON(),
    startCloudiness,
    endCloudiness,
    polygon,
  };
  for (let i = 0; i < months.length; i++) {
    globalSearch[`months[${i}]`] = months[i].cnt;
    // params[`months[${i}]`] = months[i];
  }
  for (let i = 0; i < satellites.length; i++) {
    globalSearch[`satellites[${i}]`] = satellites[i];
  }
  return await server.get('dzzs/search', {
    params: {
      ...params,
      ...globalSearch,
    },
    errorTitle: 'Ошибка при поиске снимков',
  });
}

export async function updateGroupsAccess(id, params) {
  return await server.post(
    `dzzs/${id}/groups-access`,
    { configs: params },
    {
      errorTitle: 'Ошибка при попытке изменения настроект доступа групп к снимку',
    },
  );
}
