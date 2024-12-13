### Hiểu Kỹ Về API Request - Body
## **1. Request Body Là Gì?**

Request body là phần dữ liệu được gửi kèm trong một yêu cầu API. Phần này thường được sử dụng khi chúng ta cần truyền thông tin đến server, chẳng hạn:

- Đăng ký người dùng mới.
- Cập nhật thông tin sản phẩm.
- Tìm kiếm dữ liệu với các tiêu chí phức tạp.

Dữ liệu trong request body thường được gửi dưới định dạng JSON, XML, hoặc Form-Data.

### Ví dụ: Request Body trong JSON
```json
{
    "name": "Nguyễn Văn A",
    "email": "nguyenvana@example.com",
    "age": 30
}
```

### Ví dụ: Request Body trong XML
```xml
<user>
    <name>Nguyễn Văn A</name>
    <email>nguyenvana@example.com</email>
    <age>30</age>
</user>
```

### Ví dụ: Request Body trong Form-Data
```text
name=Nguyễn Văn A
email=nguyenvana@example.com
age=30
```

---

## **2. Tại Sao Cần Request Body?**

- **Tối ưu hoá giao tiếp**: Hiểu đúng cách truyền dữ liệu giúp giảm sai sót trong giao tiếp giữa client và server.
- **Tăng bảo mật**: Request body có thể chứa thông tin nhạy cảm (như mật khẩu), vì vậy cần mã hóa hoặc sử dụng HTTPS. Nếu để thông tin nhạy cảm ở URL, hacker có thể đọc được.
- **Tăng hiệu quả xử lý**: Xây dựng request body hợp lý giúp server xử lý nhanh hơn, tránh lỗi phát sinh.

---

## **3. Lưu Ý Khi Làm Việc Với Request Body**

1. **Sử dụng đúng định dạng**  
   - JSON là định dạng phổ biến nhất vì dễ đọc và xử lý.
   - Nếu sử dụng `Form-Data`, hãy đảm bảo cấu hình đúng headers (`Content-Type: multipart/form-data`).

2. **Xác thực dữ liệu**  
   - Kiểm tra các trường dữ liệu cần thiết trước khi gửi.
   - Loại bỏ dữ liệu không cần thiết để giảm tải cho server.

3. **Mã hóa dữ liệu nhạy cảm**  
   - Đừng bao giờ gửi mật khẩu hoặc thông tin nhạy cảm trong body mà không mã hóa.

4. **Kiểm tra lỗi từ server**  
   - Server trả về lỗi (`400 Bad Request`, `500 Internal Server Error`, v.v.), cần kiểm tra lại cấu trúc body.

# Phụ lục: Quy tắc encode

Tôi sẽ tạo bảng các ký tự thường gặp và cách chúng được encode trong URL:

| Ký tự | URL Encode | Mô tả |
|-------|------------|--------|
| space | %20 hoặc + | Khoảng trắng |
| ! | %21 | Dấu chấm than |
| " | %22 | Dấu ngoặc kép |
| # | %23 | Dấu thăng |
| $ | %24 | Ký hiệu tiền đô |
| % | %25 | Dấu phần trăm |
| & | %26 | Dấu và |
| ' | %27 | Dấu nháy đơn |
| ( | %28 | Mở ngoặc đơn |
| ) | %29 | Đóng ngoặc đơn |
| * | %2A | Dấu sao |
| + | %2B | Dấu cộng |
| , | %2C | Dấu phẩy |
| / | %2F | Dấu gạch chéo |
| : | %3A | Dấu hai chấm |
| ; | %3B | Dấu chấm phẩy |
| < | %3C | Dấu nhỏ hơn |
| = | %3D | Dấu bằng |
| > | %3E | Dấu lớn hơn |
| ? | %3F | Dấu hỏi |
| @ | %40 | Dấu at |
| [ | %5B | Mở ngoặc vuông |
| \ | %5C | Dấu gạch chéo ngược |
| ] | %5D | Đóng ngoặc vuông |
| ^ | %5E | Dấu mũ |
| { | %7B | Mở ngoặc nhọn |
| \| | %7C | Dấu gạch đứng |
| } | %7D | Đóng ngoặc nhọn |
| ~ | %7E | Dấu ngã |
| € | %E2%82%AC | Ký hiệu Euro |
| © | %C2%A9 | Dấu bản quyền |
| ® | %C2%AE | Dấu đăng ký |
| ™ | %E2%84%A2 | Dấu thương hiệu |
| ¥ | %C2%A5 | Ký hiệu Yên |
| £ | %C2%A3 | Ký hiệu Bảng Anh |

Một số lưu ý:
- Các ký tự chữ và số (a-z, A-Z, 0-9) không cần encode
- Một số ký tự đặc biệt như `-`, `.`, `_`, `~` cũng không cần encode
- Các ký tự Unicode sẽ được encode thành chuỗi nhiều byte, ví dụ `€` thành `%E2%82%AC`