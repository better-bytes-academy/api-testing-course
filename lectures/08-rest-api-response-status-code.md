# Hiểu Kỹ Về API Response - Status Code

## Giới thiệu
- Status code (mã trạng thái) là một phần quan trọng trong giao tiếp HTTP, giúp client hiểu được kết quả của request gửi đến server. Mỗi status code là một số gồm 3 chữ số, được chia thành 5 nhóm chính.

## Các nhóm Status Code

### 1. Nhóm 1xx - Informational
Đây là nhóm thông tin, cho biết request đã được server tiếp nhận và đang được xử lý. Ví dụ:
- **100 Continue**: Server đã nhận được headers của request
- **101 Switching Protocols**: Server đồng ý chuyển đổi giao thức theo yêu cầu của client

### 2. Nhóm 2xx - Success 
Nhóm này cho biết request đã được xử lý thành công. Các mã phổ biến:
- **200 OK**: Request thành công
- **201 Created**: Request thành công và một resource mới đã được tạo
- **204 No Content**: Request thành công nhưng không có nội dung trả về

### 3. Nhóm 3xx - Redirection
Cho biết client cần thực hiện thêm hành động để hoàn tất request. Ví dụ:
- **301 Moved Permanently**: Resource đã được chuyển đến URL mới vĩnh viễn
- **302 Found**: Resource tạm thời được chuyển đến URL khác
- **304 Not Modified**: Resource không thay đổi so với bản cache của client

### 4. Nhóm 4xx - Client Error
Cho biết lỗi từ phía client. Các mã thường gặp:
- **400 Bad Request**: Request không hợp lệ
- **401 Unauthorized**: Client chưa xác thực
- **403 Forbidden**: Client không có quyền truy cập
- **404 Not Found**: Không tìm thấy resource
- **405 Method Not Allowed**: Client gửi một method không hợp lệ
- **408 Request Timeout**: Client gửi request khóa thời gian
- **409 Conflict**: Client gửi request bị xung đột với resource khác
- **422 Unprocessable Entity**: Client gửi request khó xử lý dữ liệu
- **429 Too Many Requests**: Client gửi quá nhiều request trong một khoảng thời gian

### 5. Nhóm 5xx - Server Error
Cho biết lỗi từ phía server. Các mã thường gặp:
- **500 Internal Server Error**: Lỗi không xác định từ server
- **501 Not Implemented**: Server chưa phát triển
- **502 Bad Gateway**: Server gateway nhận được response không hợp lệ
- **503 Service Unavailable**: Server tạm thời không khả dụng
- **504 Gateway Timeout**: Server gateway không nhận được response kịp thời

# Phụ lục: status code phổ biến theo dạng bảng

| Nhóm | Status Code | Tên | Mô tả |
|------|-------------|-----|--------|
| **1xx - Informational** | 100 | Continue | Server đã nhận headers của request |
| | 101 | Switching Protocols | Server đồng ý chuyển đổi giao thức |
| **2xx - Success** | 200 | OK | Request thành công |
| | 201 | Created | Resource mới đã được tạo thành công |
| | 204 | No Content | Request thành công nhưng không có dữ liệu trả về |
| **3xx - Redirection** | 301 | Moved Permanently | Resource đã chuyển vĩnh viễn sang URL khác |
| | 302 | Found | Resource tạm thời ở URL khác |
| | 304 | Not Modified | Resource không thay đổi so với bản cache |
| **4xx - Client Error** | 400 | Bad Request | Request không hợp lệ |
| | 401 | Unauthorized | Client chưa xác thực |
| | 403 | Forbidden | Client không có quyền truy cập |
| | 404 | Not Found | Không tìm thấy resource |
| | 405 | Method Not Allowed | Phương thức HTTP không được phép với resource này |
| | 408 | Request Timeout | Request mất quá nhiều thời gian để hoàn thành |
| | 409 | Conflict | Request xung đột với trạng thái hiện tại của server |
| | 429 | Too Many Requests | Client gửi quá nhiều request |
| **5xx - Server Error** | 500 | Internal Server Error | Lỗi không xác định từ server |
| | 502 | Bad Gateway | Gateway nhận response không hợp lệ từ upstream server |
| | 503 | Service Unavailable | Server tạm thời không khả dụng |
| | 504 | Gateway Timeout | Gateway không nhận được response kịp thời |
