import server from '@/api/http';

export async function all() {
  return await server.get('data-types', {
    errorMessage: "Ошибка при получении списка типов данных",
    ignore: false
  });
}
