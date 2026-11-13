# RSVP → Google Sheet

## Vì sao form báo thành công mà Sheet trống?

Website gửi `fetch(..., mode: 'no-cors')` → trình duyệt **không đọc được** phản hồi. UI hiện “Cảm ơn” chỉ nghĩa là request đã gửi đi, **không** nghĩa là đã ghi Sheet.

Endpoint live hiện trả về bản **cũ** (không có `"version":"v4"`). Cần Deploy lại code `Code.gs` + điền `SPREADSHEET_ID`.

## Checklist sửa (bắt buộc làm đủ)

1. Mở Google Sheet RSVP → copy ID trong URL:

   `https://docs.google.com/spreadsheets/d/`**`ID_Ở_ĐÂY`**`/edit`

2. [Apps Script](https://script.google.com) → project Web App RSVP → dán nội dung `Code.gs` → sửa:

   ```js
   var SPREADSHEET_ID = 'ID_Ở_ĐÂY';
   ```

3. **Save** (Ctrl/Cmd+S)

4. **Deploy → Manage deployments → ✏️ Edit**
   - Version: **New version** (không chọn bản cũ)
   - Execute as: **Me**
   - Who has access: **Anyone** / **Bất kỳ ai**
   - **Deploy**

5. Kiểm tra GET (mở tab ẩn danh):

   URL `/exec` trong `index.html` (form `action=...`)

   Phải thấy JSON dạng:

   ```json
   {"result":"ok","version":"v4","spreadsheet":"...","spreadsheetId":"...","sheet":"RSVP","lastRow":N}
   ```

   Nếu vẫn chỉ thấy `"message":"RSVP endpoint sẵn sàng..."` → **chưa Deploy New version**.

6. Gửi form test trên web → Apps Script → **Executions**:
   - `doPost` phải **Completed** (không Failed)
   - Sheet tab **RSVP** có dòng mới

## Tab Sheet

Script ghi vào sheet tên đúng **`RSVP`** (tạo tự động nếu chưa có). Kiểm tra đúng file Spreadsheet ID đã dán, không nhầm file khác.
