# Hiểu Kỹ Về API Response - Headers

## Response Header là gì?
Response headers là phần thông tin metadata được server gửi kèm trong response trả về cho client. Chúng chứa các thông tin quan trọng về cách xử lý response, bảo mật, caching và nhiều thông số kỹ thuật khác. Response headers được định dạng dưới dạng cặp key-value, ví dụ: `Content-Type: application/json`.

## Response Header có tác dụng gì?
Response headers đóng vai trò quan trọng trong giao tiếp client-server:

- Cung cấp thông tin về nội dung response (kiểu dữ liệu, encoding, độ dài...)
- Kiểm soát caching để tối ưu hiệu năng
- Thiết lập các chính sách bảo mật
- Quản lý phiên làm việc và cookie
- Hướng dẫn browser cách xử lý dữ liệu nhận được
- Hỗ trợ cross-origin resource sharing (CORS)

## Các response header phổ biến

1. Content Headers:
- **Content-Type**: Xác định kiểu dữ liệu và encoding của response
  - Cú pháp: `Content-Type: <media-type>; charset=<charset>`
  - Ví dụ:
    ```http
    // JSON response
    Content-Type: application/json; charset=utf-8
    
    // HTML response
    Content-Type: text/html; charset=utf-8
    
    // Form data
    Content-Type: multipart/form-data; boundary=boundary123
    
    // Binary file
    Content-Type: application/pdf
    
    // Image
    Content-Type: image/jpeg
    ```
  - Use cases:
    - API trả về JSON data
    - Web server trả về HTML pages
    - Upload/download files
    - Xử lý multimedia content

- **Content-Length**: Chỉ định kích thước của response body tính bằng bytes
  - Cú pháp: `Content-Length: <length>`
  - Ví dụ:
    ```http
    // Response có độ dài 1234 bytes
    Content-Length: 1234
    
    // Kết hợp với streaming response
    Transfer-Encoding: chunked
    // Trong trường hợp này không dùng Content-Length
    ```
  - Use cases:
    - Client có thể biết trước kích thước response
    - Hỗ trợ download progress
    - Kiểm soát memory allocation

- **Content-Encoding**: Xác định phương thức nén dữ liệu
  - Cú pháp: `Content-Encoding: gzip | deflate | br`
  - Ví dụ:
    ```http
    // Nén bằng gzip
    Content-Encoding: gzip
    
    // Nén bằng Brotli
    Content-Encoding: br
    
    // Nhiều encoding
    Content-Encoding: gzip, br
    ```
  - Use cases:
    - Giảm kích thước transfer
    - Tối ưu bandwidth
    - Cải thiện load time

- **Content-Language**: Xác định ngôn ngữ của nội dung
  - Cú pháp: `Content-Language: <language-tag>`
  - Ví dụ:
    ```http
    // Tiếng Anh
    Content-Language: en
    
    // Tiếng Việt
    Content-Language: vi
    
    // Nhiều ngôn ngữ
    Content-Language: en-US, vi-VN
    ```
  - Use cases:
    - Hỗ trợ đa ngôn ngữ
    - SEO optimization
    - User experience localization

2. Caching Headers:
- **Cache-Control**: Kiểm soát cách client và intermediaries cache response
  - Cú pháp: `Cache-Control: <directive>[, <directive>]*`
  - Ví dụ các directives phổ biến:
    ```http
    // Không cache
    Cache-Control: no-store, no-cache
    
    // Cache trong 1 giờ
    Cache-Control: public, max-age=3600
    
    // Cache riêng cho từng user
    Cache-Control: private, max-age=3600
    
    // Validate lại với server trước khi dùng cache
    Cache-Control: public, must-revalidate, max-age=3600
    
    // Cache cho static assets
    Cache-Control: public, max-age=31536000, immutable
    ```
  - Use cases:
    - Static files (CSS, JS, images): Cache dài hạn
    - API responses: Cache ngắn hạn hoặc không cache
    - User-specific content: Private cache
    - Sensitive data: No-store

- **ETag**: Token unique đại diện cho version của resource
  - Cú pháp: `ETag: "<etag-value>"`
  - Ví dụ:
    ```http
    // Strong ETag
    ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"
    
    // Weak ETag
    ETag: W/"weakkey"
    ```
  - Use cases:
    - Validate cache hiệu quả
    - Tránh race conditions khi update
    - Optimistic concurrency control

- **Last-Modified**: Thời điểm resource được sửa đổi lần cuối
  - Cú pháp: `Last-Modified: <day-name>, <day> <month> <year> <hour>:<minute>:<second> GMT`
  - Ví dụ:
    ```http
    Last-Modified: Wed, 21 Oct 2023 07:28:00 GMT
    ```
  - Use cases:
    - Cache validation
    - Conditional requests
    - Resource monitoring

- **Expires**: Thời điểm cụ thể response hết hạn
  - Cú pháp: `Expires: <http-date>`
  - Ví dụ:
    ```http
    // Hết hạn sau 1 giờ
    Expires: Wed, 21 Oct 2023 08:28:00 GMT
    
    // Đã hết hạn (force revalidation)
    Expires: 0
    ```
  - Use cases:
    - Legacy cache control
    - Fixed expiration time
    - Backwards compatibility

3. Security Headers:
- **X-Frame-Options** 
   - Đây là header bảo mật dùng để ngăn chặn clickjacking attacks
   - Nó kiểm soát website của bạn có thể được nhúng vào frame/iframe trên các domain khác không
   - Có 3 giá trị chính:

   ```http
   # DENY - Không cho phép nhúng frame từ bất kỳ domain nào 
   X-Frame-Options: DENY

   # SAMEORIGIN - Chỉ cho phép nhúng frame từ cùng origin (domain)
   X-Frame-Options: SAMEORIGIN  

   # ALLOW-FROM - Cho phép nhúng từ một domain cụ thể (đã deprecated)
   X-Frame-Options: ALLOW-FROM https://example.com
   ```

- **Content-Security-Policy (CSP)**
   - Là một layer bảo mật chống lại các dạng tấn công injection như XSS, clickjacking
   - Cho phép kiểm soát chi tiết những resource nào được phép load trên trang
   - Các directive phổ biến:

   ```http
   Content-Security-Policy: 
      # default-src: fallback cho các directive khác
      default-src 'self';
      
      # script-src: kiểm soát JavaScript sources  
      script-src 'self' https://trusted.com;
      
      # style-src: kiểm soát CSS sources
      style-src 'self' https://fonts.googleapis.com;
      
      # img-src: kiểm soát image sources
      img-src 'self' data: https:;
   ```

- **Strict-Transport-Security (HSTS)**
   - Là header bắt buộc browser chỉ kết nối qua HTTPS 
   - Giúp ngăn chặn downgrade attacks và cookie hijacking
   - Các directive:

   ```http
   # Basic usage - cache trong 1 năm  
   Strict-Transport-Security: max-age=31536000

   # Include subdomains
   Strict-Transport-Security: max-age=31536000; includeSubDomains

   # Thêm preload để đăng ký vào HSTS preload list của browser
   Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
   ```

- **X-XSS-Protection**
   - Kích hoạt XSS protection có sẵn của trình duyệt
   - Có 4 mode:

   ```http
   # Tắt XSS filter 
   X-XSS-Protection: 0

   # Bật XSS filter - browser sẽ sanitize page
   X-XSS-Protection: 1

   # Bật và block rendering nếu phát hiện attack
   X-XSS-Protection: 1; mode=block

   # Bật và report về URL được chỉ định
   X-XSS-Protection: 1; report=<reporting-uri>
   ```

4. CORS Headers:
- **Access-Control-Allow-Origin**: Xác định những domain được phép truy cập API
  - Cú pháp: `Access-Control-Allow-Origin: <origin> | *`
  - Ví dụ:
    ```http
    // Cho phép một domain cụ thể
    Access-Control-Allow-Origin: https://example.com
    
    // Cho phép tất cả các domain (không khuyến khích trong production)
    Access-Control-Allow-Origin: *
    ```
  - Use cases:
    - Giới hạn truy cập API chỉ từ frontend domain được tin cậy
    - Cho phép chia sẻ tài nguyên giữa các subdomain
    - Kiểm soát truy cập từ môi trường development/staging

- **Access-Control-Allow-Methods**: Xác định các HTTP methods được phép sử dụng
  - Cú pháp: `Access-Control-Allow-Methods: <method>[, <method>]*`
  - Ví dụ:
    ```http
    // Cho phép các methods cụ thể
    Access-Control-Allow-Methods: POST, GET, OPTIONS
    
    // Cho phép tất cả methods phổ biến
    Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS
    ```
  - Use cases:
    - Giới hạn các operations được phép trên API
    - Mở rộng dần các methods theo nhu cầu
    - Đảm bảo an toàn bằng cách chỉ cho phép methods cần thiết

- **Access-Control-Allow-Headers**: Xác định các custom headers được phép gửi trong request
  - Cú pháp: `Access-Control-Allow-Headers: <header-name>[, <header-name>]*`
  - Ví dụ:
    ```http
    // Cho phép các headers authentication và content type
    Access-Control-Allow-Headers: Authorization, Content-Type
    
    // Cho phép nhiều headers custom
    Access-Control-Allow-Headers: X-Custom-Header, X-API-Key, Origin, Content-Type
    ```
  - Use cases:
    - Cho phép gửi token authentication
    - Hỗ trợ các headers đặc thù của ứng dụng
    - Xác thực và xử lý content type

- **Access-Control-Max-Age**: Xác định thời gian browser cache kết quả preflight request
  - Cú pháp: `Access-Control-Max-Age: <delta-seconds>`
  - Ví dụ:
    ```http
    // Cache trong 1 giờ
    Access-Control-Max-Age: 3600
    
    // Cache trong 24 giờ
    Access-Control-Max-Age: 86400
    ```
  - Use cases:
    - Giảm số lượng preflight requests
    - Tối ưu performance cho cross-origin requests
    - Cân bằng giữa performance và tính cập nhật của CORS policy
- **Strict-Transport-Security (HSTS)**: Buộc browser chỉ kết nối qua HTTPS
  - Cú pháp: `Strict-Transport-Security: max-age=<expire-time>[; includeSubDomains][; preload]`
  - Ví dụ:
    ```http
    // Cơ bản - chỉ định thời gian cache HSTS policy
    Strict-Transport-Security: max-age=31536000
    
    // Nâng cao - áp dụng cho cả subdomain và đăng ký preload
    Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
    ```
  - Use cases:
    - Bảo vệ khỏi downgrade attacks
    - Tự động chuyển HTTP sang HTTPS
    - Đảm bảo mọi kết nối đều được mã hóa

- **X-Frame-Options**: Ngăn chặn clickjacking bằng cách kiểm soát iframe
  - Cú pháp: `X-Frame-Options: DENY | SAMEORIGIN | ALLOW-FROM https://example.com`
  - Ví dụ:
    ```http
    // Không cho phép nhúng trang trong bất kỳ iframe nào
    X-Frame-Options: DENY
    
    // Chỉ cho phép iframe từ cùng origin
    X-Frame-Options: SAMEORIGIN
    
    // Chỉ cho phép iframe từ domain cụ thể
    X-Frame-Options: ALLOW-FROM https://trusted-site.com
    ```
  - Use cases:
    - Bảo vệ form đăng nhập
    - Bảo vệ trang thanh toán
    - Kiểm soát widget embedding

- **X-XSS-Protection**: Kích hoạt tính năng chặn XSS của browser
  - Cú pháp: `X-XSS-Protection: 0 | 1[; mode=block]`
  - Ví dụ:
    ```http
    // Bật tính năng XSS filtering
    X-XSS-Protection: 1
    
    // Bật và chặn toàn bộ trang nếu phát hiện XSS
    X-XSS-Protection: 1; mode=block
    
    // Tắt XSS filtering (nếu dùng CSP)
    X-XSS-Protection: 0
    ```
  - Use cases:
    - Layer bảo vệ thêm cho user input
    - Ngăn chặn reflected XSS attacks
    - Backup cho CSP

- **Content-Security-Policy (CSP)**: Kiểm soát chi tiết nguồn tài nguyên được phép load
  - Cú pháp phức tạp với nhiều directives
  - Ví dụ:
    ```http
    // CSP cơ bản - chỉ cho phép tài nguyên từ cùng origin
    Content-Security-Policy: default-src 'self'
    
    // CSP chi tiết cho website hiện đại
    Content-Security-Policy: default-src 'self';
        script-src 'self' 'unsafe-inline' 'unsafe-eval' https://trusted-scripts.com;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        img-src 'self' https: data:;
        font-src 'self' https://fonts.gstatic.com;
        frame-src 'self' https://www.youtube.com;
        connect-src 'self' https://api.example.com;
    
    // CSP cho Single Page Application
    Content-Security-Policy: default-src 'self';
        script-src 'self' 'unsafe-inline';
        style-src 'self' 'unsafe-inline';
        img-src 'self' data: https:;
        connect-src 'self' https://api.example.com ws://localhost:*;
    ```
  - Use cases:
    - Ngăn chặn XSS bằng cách kiểm soát script sources
    - Kiểm soát loading của images, fonts, styles
    - Bảo vệ khỏi clickjacking và injection attacks

## Các trường hợp sử dụng phổ biến của Response header

1. Quản lý Cache:
```http
Cache-Control: max-age=3600, public
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"
```

2. Bảo mật API:
```http
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'
```

3. CORS cho APIs:
```http
Access-Control-Allow-Origin: https://example.com
Access-Control-Allow-Methods: GET, POST, PUT
```

4. Xử lý Content:
```http
Content-Type: application/json; charset=utf-8
Content-Encoding: gzip
```

## Test response header thì test gì?

1. Kiểm tra tính chính xác:
- Xác nhận các header bắt buộc có mặt đầy đủ
- Kiểm tra giá trị của header có đúng format
- Validate các header phụ thuộc lẫn nhau

2. Kiểm tra bảo mật:
- Xác minh presence của security headers
- Test CORS configuration
- Kiểm tra SSL/TLS headers

3. Kiểm tra performance:
- Test caching headers
- Verify compression settings
- Kiểm tra content negotiation

4. Test các trường hợp đặc biệt:
- Response với status codes khác nhau
- Headers trong error responses
- Xử lý charset và encoding
- Custom headers của ứng dụng

5. Automation test:
```python
def test_security_headers(response):
    assert response.headers['Strict-Transport-Security']
    assert response.headers['X-Frame-Options'] == 'DENY'
    assert 'Content-Security-Policy' in response.headers
```