import server from '@/api/http';

export async function all() {
  return await server
    .get('roles', {
      validateStatus: () => true,
    })
    .then((data) => {
      data.data._errorMessage = 'Ошибка при получении списка ролей';
      return data;
    });
}
