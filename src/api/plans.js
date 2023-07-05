import server from '@/api/http';
export async function all(theme) {
  return await server.get('plans', {
    params: { theme },
    errorTitle: 'Ошибка при получении списка доступных задач',
  });
}

export async function update(id, params, preview = null, macros = null) {
  let formData = new FormData();
  formData.append('plan', JSON.stringify(params));
  if (preview != null) {
    formData.append('preview', preview);
  }
  if (macros != null) {
    formData.append('macros', macros);
  }
  return await server.post('plans/' + id, formData, {
    errorTitle: 'Ошибка при обновлении задачи',
  });
}

export async function create(theme) {
  let formData = new FormData();
  formData.append('theme', theme);
  return await server.post('plans', formData, {
    errorTitle: 'Ошибка при создании задачи',
  });
}

export async function deleteOne(id) {
  return await server.delete('plans/' + id);
}
