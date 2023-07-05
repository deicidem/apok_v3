import server from '@/api/http';

export async function all() {
  return await server.get('satellites').then((data) => {
    data.data._errorMessage = 'Ошибка при получении списка спутников';
    return data;
  });
}
