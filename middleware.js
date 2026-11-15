// Facebook/Messenger crawler: trả HTML OG siêu nhẹ (tránh Range + HTML 192KB).
const BOT_UA =
  /facebookexternalhit|Facebot|meta-externalagent|FacebookBot|WhatsApp|Twitterbot|LinkedInBot|Slackbot|Discordbot|TelegramBot/i;

export const config = {
  matcher: ['/', '/m/:path*'],
};

export default function middleware(request) {
  const ua = request.headers.get('user-agent') || '';
  if (!BOT_UA.test(ua)) return;

  const origin = new URL(request.url).origin;
  const image = `${origin}/share.jpg`;
  const pageUrl = `${origin}/`;
  const title = 'Ngô Văn Điệp &amp; Nguyễn Thu Huệ — Đám Cưới 28 &amp; 29/11/2026';
  const description =
    'Trân trọng mời bạn đến chứng kiến ngày Ngô Văn Điệp &amp; Nguyễn Thu Huệ về chung một nhà. 28.11 Nhà Gái · 29.11 Nhà Trai';

  const html = `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="utf-8" />
<title>${title}</title>
<meta property="og:type" content="website" />
<meta property="og:locale" content="vi_VN" />
<meta property="og:url" content="${pageUrl}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:site_name" content="Ngô Văn Điệp &amp; Nguyễn Thu Huệ — Đám Cưới" />
<meta property="og:image" content="${image}" />
<meta property="og:image:secure_url" content="${image}" />
<meta property="og:image:type" content="image/jpeg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Ngô Văn Điệp &amp; Nguyễn Thu Huệ — Đám cưới" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${description}" />
<meta name="twitter:image" content="${image}" />
<link rel="image_src" href="${image}" />
</head>
<body>
<img src="${image}" width="1200" height="630" alt="Ngô Văn Điệp &amp; Nguyễn Thu Huệ" />
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, max-age=0, must-revalidate',
    },
  });
}
