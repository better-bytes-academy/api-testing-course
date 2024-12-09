# Outline
- Chữa bài quiz.
- Rest là gì? Lịch sử ra đời? Tại sao ra đời?
- Tại sao dùng Rest API?
- Các thành phần của Rest API.
- Thực hiện gọi REST API đơn giản với Postman.

# Rest API là gì?
- REST = REpresentational State Transfer nghĩa là một công nghệ được sử dụng để xử lý các yêu cầu và trả về dữ liệu.
- Là bộ quy tắc cho phép hai hệ thống giao tiếp với nhau qua giao thức HTTP.
- Lịch sử ra đời:
    - Vào đầu những năm 2000, từ luận văn của tiến sĩ Roy Fielding (https://en.wikipedia.org/wiki/Roy_Fielding)
- Tại sao ra đời:
    - Trước khi REST ra đời, các hệ thống dùng SOAP và RPC để giao tiếp
    - Các giao thức này phức tạp, khó mở rộng, tốn tài nguyên, không tận dụng được tối đa giao thức HTTP
- Ứng dụng thực tiễn
    - REST nhanh chóng được chấp nhận bởi các tổ chức công nghệ lớn do:
        - Sự đơn giản so với SOAP và RPC.
        - Tận dụng giao thức HTTP phổ biến.
        - Dễ dàng tích hợp và mở rộng trên môi trường web.
- Vai Trò của REST trong Phát Triển Hiện Đại
    - Ngày nay, REST đã trở thành tiêu chuẩn phổ biến trong phát triển ứng dụng web và di động. Các hệ thống mới như GraphQL hoặc gRPC cũng xuất hiện, nhưng REST vẫn giữ vai trò quan trọng nhờ:
        - Dễ học và sử dụng.
        - Có thể tạo ra các ứng dụng web đa dạng.
        - Phù hợp với nhiều loại hệ thống.
# Tại sao dùng Rest API?
- Đơn giản
- Phổ biến
- Phù hợp nhiều loại hệ thống

# Các thành phần của Rest API
- **Client**: Người "gọi API"
- **Server**: Máy chủ, người "trả về" dữ liệu API
- **Request**: Yêu cầu
    - **Endpoint/ URL**: Địa chỉ của API
        - **Scheme**: http hoặc https
        - **Subdomain**: tên miền phụ
        - **Domain**: Tên miền
        - **Port number**: Cổng
        - **Path**: Đường dẫn
        - **Query parameters**: Cấu trúc: key=value
            - Theo sau bởi dấu ? hoặc &
            - Param đầu tiên: theo sau ?
            - Từ param thứ hai: theo sau &
        - **Fragment**
    - **Method**: Phương thức để truy vấn API
        | Method | Description | Has Body |
        | --- | --- | --- |
        | GET | Lấy dữ liệu | No |
        | POST | Tạo mới dữ liệu | Yes |
        | PUT | Cập nhật dữ liệu | Yes |
        | PATCH | Cập nhật một phần của dữ liệu | Yes |
        | DELETE | Xóa dữ liệu | No |
        | HEAD | Lấy thông tin về dữ liệu | No |
    - **Headers**: các thông tin đính kèm với request
        - **Content-Type**: kiểu dữ liệu
            - application/json
            - application/x-www-form-urlencoded
            - multipart/form-data
            - text/plain
            - image/png
            - image/jpeg
            - image/gif
            - ...
        - **Content-Length**: kích thước của dữ liệu
        - **Authorization**: các thông tin xác thực
        - **Cookie**: các cookie
        - **User-Agent**: trình duyệt
        - **Referer**: trang web tương tác
        - **Accept**: kiểu dữ liệu được chấp nhận
        - **Accept-Language**: ngôn ngữ được chấp nhận
        - **Accept-Encoding**: mã hóa được chấp nhận
    - **Request Body**: Nội dung của request
        - JSON: dữ liệu được định dạng JSON
        - Form-Data: dữ liệu được định dạng form-data
        - Multipart: dữ liệu được định dạng multipart
        - Raw: dữ liệu không được định dạng
- **Response**: Kết quả trả về
    - Status Code: Mã trạng thái HTTP
        | Status Code | Description |
        | --- | --- |
        | 1xx | Thông tin |
        | 2xx | Thành công |
        | 3xx | Chuyển trang (di chuyển đến một trang khác)|
        | 4xx | Yêu cầu không hợp lệ (lỗi do chúng ta) |
        | 5xx | Lỗi máy chủ (lỗi do máy chủ) |
        
        <table>
            <tr>
                <th>Status Code</th>
                <th>Description</th>
            </tr>
            <tr>
                <td>200 OK</td>
                <td>Thành công</td>
            </tr>
            <tr>
                <td>201 Created</td>
                <td>Tạo thành công</td>
            </tr>
            <tr>
                <td>204 No Content</td>
                <td>Không có dữ liệu</td>
            </tr>
            <tr>
                <td>301 Moved Permanently</td>
                <td>Chuyển hẳn</td>
            </tr>
            <tr>
                <td>302 Temporary Redirect</td>
                <td>Chuyển tạm thời</td>
            </tr>
            <tr>
                <td>400 Bad Request</td>
                <td>Yêu cầu không hợp lệ</td>
            </tr>
            <tr>
                <td>401 Unauthorized</td>
                <td>Không có quyền truy cập vào hệ thống</td>
            </tr>
            <tr>
                <td>403 Forbidden</td>
                <td>Có quyền truy cập hệ thống, nhưng không có quyền truy cập với dữ liệu</td>
            </tr>
            <tr>
                <td>404 Not Found</td>
                <td>Không tìm thấy (sai URL)</td>
            </tr>
            <tr>
                <td>500 Internal Server Error</td>
                <td>Lỗi server (máy chủ không ngỏm nhưng có lỗi)</td>
            </tr>
            <tr>
                <td>503 Service Unavailable</td>
                <td>Máy chủ không sẵn sàng (máy chủ ngỏm)</td>
            </tr>
        </table>

# Sử dụng Chrome Developer Tool để bắt request
- Inspect
- Chọn tab Network
- Click vào một request bất kì

# Thử gọi một REST API với Postman
- Endpoint: https://material.playwrightvn.com/api/01-information.php

# Quiz
- [Link](https://docs.google.com/forms/d/1EMJQOrkNqUmKFSS9TB2xFO2NNbD9rHwyT1dXHTWSEgc/preview)

# What's next?
- Thực hành các API: POST, GET, PUT, DELETE với Postman
- Import request từ Chrome Developer Tool với Postman