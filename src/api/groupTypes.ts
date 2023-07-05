import server from '@/api/http';

export async function all() {
  return await server.get('group-types').then((data) => {
    data.data._errorMessage = 'Ошибка при получении списка типов групп';
    return data;
  });
}
