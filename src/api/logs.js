import server from '@/api/http';
export async function all(params) {
  return await server.get(
    'logs',
    { params },
    {
      errorTitle: 'Ошибка при получении логов',
    },
  );
}
