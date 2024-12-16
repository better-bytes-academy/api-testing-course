# Hiểu Kỹ Về API Response - Body

## Response Body là gì?
Response Body là phần nội dung chính của phản hồi (response) từ server khi client gửi một request. Đây là nơi chứa dữ liệu thực tế mà server trả về, có thể ở nhiều định dạng khác nhau như JSON, XML, HTML, văn bản thuần túy, hoặc dữ liệu nhị phân.

## Response Body có tác dụng gì?
- Chứa thông tin chính mà client yêu cầu từ server
- Truyền tải dữ liệu giữa client và server một cách có cấu trúc
- Cho phép ứng dụng client xử lý và hiển thị thông tin cho người dùng
- Hỗ trợ việc giao tiếp bất đồng bộ giữa các hệ thống
- Cung cấp thông tin về trạng thái xử lý của request

## Các Response Body phổ biến
| Định dạng | Đặc điểm | Content-Type | Ứng dụng phổ biến |
|-----------|-----------|--------------|-------------------|
| JSON | Dễ đọc, nhẹ, phổ biến | application/json | REST API, Web API |
| XML | Có cấu trúc chặt chẽ, tự mô tả | application/xml | SOAP, RSS, Legacy systems |
| HTML | Định dạng web | text/html | Web pages |
| Plain Text | Đơn giản, không cấu trúc | text/plain | Log, debug info |
| Binary | Dữ liệu nhị phân | application/octet-stream | File download, media |

## Các trường hợp sử dụng phổ biến của Response Body

### 1. Trả về dữ liệu từ database
```json
{
    "user": {
        "id": 123,
        "name": "John Doe",
        "email": "john@example.com"
    }
}
```

### 2. Thông báo kết quả xử lý
```json
{
    "status": "success",
    "message": "User created successfully",
    "data": {
        "userId": 456
    }
}
```

### 3. Trả về danh sách dữ liệu
```json
{
    "items": [
        { "id": 1, "name": "Item 1" },
        { "id": 2, "name": "Item 2" }
    ],
    "total": 2,
    "page": 1
}
```

### 4. Thông báo lỗi
```json
{
    "error": {
        "code": "AUTH_001",
        "message": "Invalid credentials",
        "details": "Username or password is incorrect"
    }
}
```

## Test response body thì test gì?

### 1. Kiểm tra cấu trúc
- Đúng định dạng (JSON, XML,...)
- Đúng schema/cấu trúc dữ liệu
- Các trường bắt buộc có đầy đủ

### 2. Kiểm tra nội dung
- Dữ liệu trả về chính xác
- Encoding đúng (UTF-8, ASCII,...)
- Định dạng ngày tháng, số, chuỗi

### 3. Kiểm tra xử lý lỗi
- Error message rõ ràng
- Error code phù hợp
- Stack trace (trong môi trường dev)

### 4. Kiểm tra hiệu năng
- Kích thước response
- Thời gian phản hồi
- Nén dữ liệu (gzip, deflate)

## Phụ lục: chi tiết về các response body phổ biến

### JSON Response
```json
{
    "status": 200,
    "data": {
        "id": 1,
        "name": "Product",
        "price": 99.99,
        "metadata": {
            "category": "Electronics",
            "tags": ["new", "featured"]
        }
    }
}
```

### XML Response
```xml
<?xml version="1.0" encoding="UTF-8"?>
<response>
    <status>200</status>
    <data>
        <product>
            <id>1</id>
            <name>Product</name>
            <price>99.99</price>
        </product>
    </data>
</response>
```

### HTML Response
```html
<!DOCTYPE html>
<html>
<head>
    <title>Response Page</title>
</head>
<body>
    <h1>Product Details</h1>
    <p>Product ID: 1</p>
    <p>Name: Product</p>
</body>
</html>
```

### Plain Text Response
```text
Status: Success
Product ID: 1
Name: Product
Price: 99.99
```