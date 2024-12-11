# Hiểu kĩ API request - header

# Header là gì?
- **HTTP Headers** là các cặp key-value trong request/response HTTP để truyền tải thông tin bổ sung giữa client và server.

# Phân loại Headers
Headers được chia thành 4 nhóm chính:

1. **General Headers**
   - Áp dụng cho cả request và response
   - Chứa thông tin chung về message

2. **Request Headers**
   - Chỉ có trong request
   - Chứa thông tin về resource được yêu cầu hoặc về client

3. **Response Headers**
   - Chỉ có trong response
   - Chứa thông tin bổ sung về response

4. **Entity Headers**
   - Mô tả nội dung trong body của request/response

# Các Headers phổ biến

## Authentication Headers
- **Authorization**
  - Chứa thông tin xác thực của client
  - Định dạng: `<type> <credentials>`
  - Ví dụ: 
    - `Authorization: Bearer eyJhbGciOiJIUzI1NiIs...`
    - `Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=`

- **WWW-Authenticate**
  - Server yêu cầu client xác thực
  - Chỉ ra phương thức xác thực được chấp nhận
  - Ví dụ: `WWW-Authenticate: Basic realm="Access to the staging site"`

## Content Headers
- **Content-Type**
  - Định dạng của dữ liệu trong body
  - Ví dụ:
    - `Content-Type: application/json`
    - `Content-Type: multipart/form-data`
    - `Content-Type: text/html; charset=UTF-8`

- **Content-Length**
  - Kích thước của body tính bằng bytes
  - Ví dụ: `Content-Length: 348`

- **Content-Encoding**
  - Kiểu nén được áp dụng
  - Ví dụ: `Content-Encoding: gzip`

## Caching Headers
- **Cache-Control**
  - Chỉ thị về caching cho tất cả các caching systems
  - Các giá trị phổ biến:
    - `no-cache`: Phải validate với server trước khi dùng cache
    - `no-store`: Không được cache
    - `max-age=<seconds>`: Thời gian cache có hiệu lực
  - Ví dụ: `Cache-Control: public, max-age=31536000`

- **ETag**
  - Định danh version của resource
  - Dùng cho conditional requests
  - Ví dụ: `ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"`

- **Last-Modified**
  - Thời điểm resource được sửa đổi lần cuối
  - Ví dụ: `Last-Modified: Wed, 21 Oct 2024 07:28:00 GMT`

## CORS Headers
- **Access-Control-Allow-Origin**
  - Chỉ ra domain được phép truy cập resource
  - Ví dụ: 
    - `Access-Control-Allow-Origin: *`
    - `Access-Control-Allow-Origin: https://example.com`

- **Access-Control-Allow-Methods**
  - Các HTTP methods được phép trong CORS
  - Ví dụ: `Access-Control-Allow-Methods: GET, POST, PUT, DELETE`

- **Access-Control-Allow-Headers**
  - Các headers được phép trong CORS request
  - Ví dụ: `Access-Control-Allow-Headers: Content-Type, Authorization`

## Security Headers
- **Strict-Transport-Security**
  - Bắt buộc browser chỉ kết nối qua HTTPS
  - Ví dụ: `Strict-Transport-Security: max-age=31536000; includeSubDomains`

- **X-XSS-Protection**
  - Bảo vệ chống XSS trong browser cũ
  - Ví dụ: `X-XSS-Protection: 1; mode=block`

- **X-Frame-Options**
  - Kiểm soát việc trang web có thể bị embed trong iframe
  - Ví dụ: `X-Frame-Options: DENY`

# Best Practices khi sử dụng Headers
1. Luôn set `Content-Type` header cho request/response có body
2. Sử dụng các security headers để bảo vệ ứng dụng
3. Cấu hình CORS headers phù hợp để tránh lỗi cross-origin
4. Sử dụng caching headers để tối ưu performance
5. Validate kỹ các headers trước khi xử lý request

# Headers trong các trường hợp đặc biệt

## Upload file
```http
POST /upload HTTP/1.1
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryABC123
Content-Length: 234567

------WebKitFormBoundaryABC123
Content-Disposition: form-data; name="file"; filename="example.jpg"
Content-Type: image/jpeg

[Binary file data]
------WebKitFormBoundaryABC123--
```

## Download file
```http
HTTP/1.1 200 OK
Content-Type: application/pdf
Content-Disposition: attachment; filename="report.pdf"
Content-Length: 123456
```

> Headers đóng vai trò quan trọng trong việc điều khiển hành vi của HTTP requests/responses và đảm bảo tính bảo mật, hiệu suất của ứng dụng web.