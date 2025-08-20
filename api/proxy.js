export default async function handler(request, response) {
  // 모든 응답에 CORS 헤더를 먼저 설정
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // OPTIONS 요청에 대한 사전 처리 (CORS preflight)
  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  const targetUrl = request.query.url;
  if (!targetUrl) {
    return response.status(400).send('URL is required');
  }

  try {
    const fetchResponse = await fetch(targetUrl);
    const body = await fetchResponse.text();

    if (!fetchResponse.ok) {
        throw new Error(`Failed to fetch from Naver: ${fetchResponse.statusText}`);
    }

    response.setHeader('Content-Type', 'application/xml; charset=utf-8');
    response.status(200).send(body);
  } catch (error) {
    response.status(500).send(error.message);
  }
}
