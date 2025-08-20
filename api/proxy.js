// api/proxy.js 파일 내용
export default async function handler(request, response) {
  const targetUrl = request.query.url;
  if (!targetUrl) {
    return response.status(400).send('URL is required');
  }

  try {
    const fetchResponse = await fetch(targetUrl);
    const body = await fetchResponse.text();

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Content-Type', 'application/xml; charset=utf-8');
    response.status(200).send(body);
  } catch (error) {
    response.status(500).send(error.message);
  }
}
