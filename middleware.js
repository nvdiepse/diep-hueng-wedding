// Bot Facebook/Messenger scrape /m/... → redirect về / (đã có thumbnail cache).
// Người dùng bấm link vẫn vào /m/... để mở đúng thiệp mời.
const BOT_UA =
  /facebookexternalhit|Facebot|meta-externalagent|FacebookBot|WhatsApp|Twitterbot|LinkedInBot|Slackbot|Discordbot/i;

export const config = {
  matcher: '/m/:path*',
};

export default function middleware(request) {
  const ua = request.headers.get('user-agent') || '';
  if (BOT_UA.test(ua)) {
    const home = new URL('/', request.url);
    return Response.redirect(home, 302);
  }
}
