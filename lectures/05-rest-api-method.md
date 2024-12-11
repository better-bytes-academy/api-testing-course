# Hiểu kĩ API request - method
# Method là gì?
- **HTTP Method** (hay HTTP Verb) là phương thức định nghĩa trong giao thức HTTP để chỉ ra hành động mà client muốn thực hiện với tài nguyên trên server.\

# Một số thuật ngữ sẽ dùng
- **Idempotent**: gọi nhiều lần vẫn cho kết quả giống nhau
    - Ví dụ:
        - GET /api/products lần 1
            - Response: `[{"id": 1, "name": "Laptop"}, {"id": 2, "name": "Phone"}]`
        - GET /api/products lần 2
            - Response: `[{"id": 1, "name": "Laptop"}, {"id": 2, "name": "Phone"}]`
- **Non-idempotent**: gọi nhiều lần khác nhau cho kết quả khác nhau
    - Ví dụ: quan sát sẽ thấy id trả về của mỗi lần gọi sẽ khác nhau
        - POST /api/products lần 1
            - Request body: `{"name": "Laptop", "price": 999}`
            - Response: `{"id": 123, "name": "Laptop", "price": 999}`
        - POST /api/products lần 2
            - Request body: `{"name": "Laptop", "price": 999}`
            - Response: `{"id": 124, "name": "Laptop", "price": 999}`
- **Cache**: Lưu trữ thông tin trong bộ nhớ tạm.
    - Lấy dữ liệu trong cache trước, giúp tiết kiệm thời gian gọi lên server lấy dữ liệu.

# Bảng liệt kê các method phổ biến
| HTTP Method | Mục đích | Đặc điểm |
|------------|----------|-----------|
| GET | Lấy dữ liệu từ server | - Không thay đổi dữ liệu<br>- Dữ liệu gửi qua URL<br>- Có thể cache |
| POST | Tạo mới dữ liệu trên server | - Tạo mới resource<br>- Dữ liệu trong request body<br>- Không thể cache |
| PUT | Cập nhật toàn bộ resource | - Thay thế hoàn toàn resource<br>- Idempotent<br>- Dữ liệu trong request body |
| PATCH | Cập nhật một phần resource | - Chỉ thay đổi trường được chỉ định<br>- Dữ liệu trong request body |
| DELETE | Xóa resource | - Xóa resource chỉ định<br>- Idempotent<br>- Thường không có body |
| HEAD | Lấy metadata của resource | - Giống GET không có body<br>- Kiểm tra resource/headers |
| OPTIONS | Lấy thông tin về methods | - Trả về các methods được phép<br>- Dùng trong CORS |


# Một số method phổ biến
## GET
- Dùng để lấy dữ liệu từ server, là phương thức phổ biến nhất
- Không thay đổi dữ liệu trên server (read-only)
- Parameters được gửi qua URL query string
- Response trả về đầy đủ dữ liệu trong response body
- Thường kiểm tra các headers:
    - **Content-Type**: Định dạng dữ liệu trả về (application/json, text/html,...)
    - **Cache-Control**: Chỉ thị caching cho client
    - **ETag**: Định danh version của resource
- Status code phổ biến:
    - **200**: Thành công
    - **404**: Không tìm thấy resource
    - **304**: Not Modified (khi dùng conditional GET)
- Ví dụ: 
    - GET /api/products/123
        - Response: `{"id": 123, "name": "iPhone", "price": 999}`
    - GET /api/products?category=electronics&sort=price
        - Response: `[{"id": 1, "name": "Laptop"}, {"id": 2, "name": "Phone"}]`
    - GET /api/posts?author=alex&tag=api_testing
        - Response: `[{"id": 1, "title": "API Testing Guide"}]`

### Note thêm về 304 - not modified
Conditional GET là một kỹ thuật tối ưu hiệu suất trong HTTP, cho phép client và server tiết kiệm băng thông bằng cách tránh gửi lại dữ liệu không thay đổi. Hãy tìm hiểu cách nó hoạt động:

1. Cách thức hoạt động:
- Khi client lần đầu GET một resource, server sẽ trả về response kèm theo các headers đặc biệt:
  - `ETag`: Một mã định danh duy nhất cho phiên bản hiện tại của resource
  - `Last-Modified`: Thời điểm resource được cập nhật lần cuối

2. Ở những request tiếp theo:
- Client sẽ gửi thêm một trong hai headers:
  - `If-None-Match`: Kèm theo giá trị ETag đã nhận trước đó
  - `If-Modified-Since`: Kèm theo giá trị Last-Modified đã nhận

3. Server sẽ kiểm tra:
- Nếu resource chưa thay đổi:
  - Trả về status code 304 (Not Modified)
  - Không gửi lại dữ liệu trong response body
  - Client sẽ sử dụng dữ liệu đã cache

- Nếu resource đã thay đổi:
  - Trả về status code 200
  - Gửi dữ liệu mới trong response body
  - Kèm theo ETag/Last-Modified mới

Ví dụ thực tế:
```http
# Request lần đầu
GET /api/products/1 HTTP/1.1

# Response từ server
HTTP/1.1 200 OK
ETag: "abc123"
Last-Modified: Wed, 21 Oct 2024 07:28:00 GMT
Content-Type: application/json

{data: "product info"}

# Request lần sau
GET /api/products/1 HTTP/1.1
If-None-Match: "abc123"

# Response nếu chưa có thay đổi
HTTP/1.1 304 Not Modified
```

Lợi ích chính:
- Giảm băng thông sử dụng
- Giảm tải cho server
- Tăng tốc độ tải trang cho người dùng
- Đảm bảo dữ liệu luôn được đồng bộ
## POST
- Dùng để gửi dữ liệu lên server để **tạo mới** resource
- Thay đổi dữ liệu trên server (non-idempotent)
- Dữ liệu được gửi trong request body
- Thường kiểm tra các headers:
    - **Content-Type**: Định dạng dữ liệu gửi lên (application/json, multipart/form-data,...)
    - **Content-Length**: Kích thước của request body
    - **Authorization**: Thông tin xác thực
- Status code phổ biến:
    - **201**: Created thành công
    - **400**: Bad Request (dữ liệu không hợp lệ)
    - **401**: Unauthorized
    - **409**: Conflict (resource đã tồn tại)
- Ví dụ:
    - POST `/api/register`
        - **Request body**: `{"username": "alex", "password": "123456"}`
        - **Response**: `{"id": 1, "username": "alex", "created_at": "2024-12-10T05:11:51+07:00"}`
    - POST `/api/posts`
        - **Request body**: `{"title": "Better Bytes Academy", "content": "API Testing"}`
        - **Response**: `{"id": 123, "title": "Better Bytes Academy", "status": "published"}`
    - POST `/api/upload`
        - **Content-Type**: multipart/form-data
        - **Request body**: form data với file đính kèm
        - **Response**: `{"file_id": "abc123", "url": "https://example.com/files/abc123"}`

## PUT
- Dùng để cập nhật/thay thế toàn bộ resource có sẵn
- Idempotent - thực hiện nhiều lần cho kết quả giống nhau
- Phải gửi đầy đủ dữ liệu của resource, các trường không gửi sẽ bị xóa/set null
- Thường kiểm tra các headers:
    - **Content-Type**: Định dạng dữ liệu gửi lên
    - **If-Match**: ETag để kiểm tra version
    - **Authorization**: Thông tin xác thực
- Status code phổ biến:
    - **200**: Updated thành công
    - **204**: No Content (update thành công, không trả về body)
    - **400**: Bad Request
    - **404**: Resource không tồn tại
    - 412: Precondition Failed (ETag không khớp)
- Ví dụ:
    - PUT /api/users/123
        - **Request body**: `{"username": "alex", "email": "alex@example.com", "address": "Vietnam"}`
        - **Response**: `{"id": 123, "username": "alex", "email": "alex@example.com", "address": "Vietnam"}`
    - PUT /api/posts/123
        - **Request body**: `{"title": "Playwright VN", "content": "Học Kĩ, Hiểu Bản Chất", "status": "published"}`
        - **Response**: 204 No Content

## PATCH
- Dùng để cập nhật một phần của resource
- Non-idempotent - kết quả có thể khác nhau mỗi lần gọi
- Chỉ gửi các trường cần thay đổi, các trường khác giữ nguyên
- Thường kiểm tra các headers:
    - **Content-Type**: application/json hoặc application/json-patch+json
    - **If-Match**: ETag để kiểm tra version
    - **Authorization**: Thông tin xác thực
- Status code phổ biến:
    - **200**: Updated thành công
    - **204**: No Content
    - **400**: Bad Request
    - **404**: Resource không tồn tại
    - 409: Conflict
- Ví dụ:
    - PATCH `/api/users/123`
        - **Request body**: `{"email": "alex@betterbytesvn.com"}`
        - **Response**: `{"id": 123, "email": "alex@betterbytesvn.com", ...}`
    - PATCH `/api/posts/123`
        - **Content-Type**: `application/json-patch+json`
        - **Request body**: [
            {"op": "replace", "path": "/title", "value": "New Title"},
            {"op": "add", "path": "/tags", "value": ["api", "testing"]}
        ]

## DELETE
- Dùng để xóa resource trên server
- Idempotent - gọi nhiều lần vẫn cho kết quả giống nhau
- Thường không cần request body
- Thường kiểm tra các headers:
    - **Authorization**: Thông tin xác thực
    - **If-Match**: ETag để tránh xóa nhầm version
- Status code phổ biến:
    - **204**: Xóa thành công (No Content)
    - **202**: Accepted (xóa bất đồng bộ)
    - **404**: Resource không tồn tại
    - **409**: Conflict (không thể xóa do ràng buộc)
- Ví dụ:
    - **DELETE** /api/posts/123
        - **Response**: 204 No Content
    - **DELETE** /api/users/123
        - **Response**: {"message": "User deleted successfully"}
    - **DELETE** /api/products/123?force=true
        - **Response**: 202 Accepted

## HEAD
- Kiểm tra tài nguyên có tồn tại không mà không cần tải về toàn bộ nội dung.
- HEAD request trả về cùng metadata như GET request nhưng không có response body
- Thường kiểm tra các headers:
    - **Last-Modified**: Xem thời gian tài nguyên được cập nhật lần cuối
    - **Content-Length**: Xem kích thước của tài nguyên
    - **Content-Type**: Xem kiểu dữ liệu của tài nguyên
- Kiểm tra tình trạng của server/tài nguyên thông qua status code mà không tốn bandwidth tải về nội dung.
- Thực hiện cache validation - kiểm tra xem tài nguyên đã cache có còn hiệu lực không thông qua ETag hoặc Last-Modified headers.
- Kiểm tra URL có hoạt động không trước khi thực hiện GET request đầy đủ.
- Ví dụ: 

## OPTIONS
- Dùng để kiểm tra các phương thức HTTP và tùy chọn được phép với resource
- Thường dùng trong CORS (Cross-Origin Resource Sharing) preflight request
- Không có request body
- Thường kiểm tra các headers trong response:
    - **Allow**: Liệt kê các HTTP methods được phép (GET, POST, PUT,...)
    - **Access-Control-Allow-Methods**: Các methods được phép trong CORS
    - **Access-Control-Allow-Headers**: Các headers được phép trong CORS
    - **Access-Control-Max-Age**: Thời gian cache preflight response
- Status code phổ biến:
    - **200**: OK
    - **204**: No Content
    - **403**: Forbidden
- Ví dụ:
    - **OPTIONS** /api/posts
        - **Response headers**:
            - **Allow**: GET, POST, HEAD
            - **Access-Control-Allow-Methods**: GET, POST, PUT, DELETE
            - **Access-Control-Allow-Headers**: Content-Type, Authorization
            - **Access-Control-Max-Age**: 86400
    - **OPTIONS** /api/users
        - **Response headers**:
            - **Allow**: GET, POST, PUT, PATCH, DELETE
            - Access-Control-Allow-Origin: *
            Access-Control-Allow-Headers: *

# Mỗi HTTP method đều có đặc điểm riêng:
- **Idempotent**: GET, PUT, DELETE, HEAD - Thực hiện nhiều lần cho cùng kết quả với lần đầu
- **Safe**: GET, HEAD - Không làm thay đổi dữ liệu trên server
- **Cacheable**: GET, HEAD - Có thể cache response để dùng lại

> Việc sử dụng đúng HTTP method rất quan trọng trong việc thiết kế RESTful API và đảm bảo ngữ nghĩa của API.
