import server from '@/api/http';
import type { Config } from '@/models/Config';
// Получение всех изменяемых настроек. Используется в админ-панели "Управление ресурсами"
// Пока только "Максимальное время задачи"

export async function all() {
  return await server.get('config').then((data) => {
    data.data._errorMessage = 'Ошибка при получении конфигурации';
    return data;
  });
}
export async function update(configs: Array<Config>) {
  const formData = new FormData();
  configs.forEach(({ id, value }, i) => {
    formData.append(`configs[${i}]`, JSON.stringify({ id, value }));
  });

  return await server.post('config', formData).then((data) => {
    data.data._errorMessage = 'Ошибка при изменении конфигурации';
    return data;
  });
}
