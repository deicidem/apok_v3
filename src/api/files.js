import server from '@/api/http';

export async function all(params) {
  return await server.get(
    'files',
    { params },
    { errorTitle: 'Ошибка при получении списка файлов' },
  );
}

export async function deleteBatch(ids) {
  let params = {};
  for (let i = 0; i < ids.length; i++) {
    params[`ids[${i}]`] = ids[i];
  }
  return await server.delete('files', { params }, { errorTitle: 'Ошибка при удалении файлов' });
}

export async function deleteOne(id) {
  return await server.delete('files/' + id, {
    errorTitle: 'Ошибка при удалении файла',
  });
}

// Получение geoJSON из загруженного файла для отображения на карте
export async function getPolygon(formData) {
  let data = await server.post('files/polygon', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    errorTitle: 'Ошибка при получении полигона',
  });
  return data;
}

export async function download(fileId) {
  let data = await server.get(
    'download',
    { params: { fileId } },
    { errorTitle: 'Ошибка при скачивании файла' },
  );
  return data;
}
