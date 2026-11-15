// Không redirect bot nữa: / và /m/... đều phục vụ index.html (có OG).
// Redirect 302 từng làm Messenger bỏ / không hiện ảnh trên link có param.
// File giữ lại để Vercel không lỗi nếu còn reference; matcher không chặn gì.
export const config = {
  matcher: ['/__middleware_noop__'],
};

export default function middleware() {
  return;
}
