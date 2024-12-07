import request from "@/infrastructure/api/request";

async function requestWithCache(url: string, cacheName: string) {
  // Verifica se a resposta já está no cache
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(url);

  try {
    if (cachedResponse) {
      const response = await cachedResponse.json();

      return response.data;
    }

    const response = await request({ url: url, method: "GET" });

    // Armazena a resposta no cache
    cache.put(url, new Response(JSON.stringify(response)));

    return response.data;
  } catch (error) {
    throw new Error("Erro: Consulta sem sucesso");
  }
}

export default requestWithCache;
