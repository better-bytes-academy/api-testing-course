# Khóa Học Kiểm Thử API của Better Bytes Academy

## Phần 1: Bài Giảng

- Facebook: https://www.facebook.com/betterbytes.academy
- Cộng đồng:
    - Cộng đồng Playwright Việt Nam: https://www.facebook.com/groups/playwright.automation.test/

### Nội Dung Khóa Học
- Bài 1: Giới thiệu khóa học
    - [Video](https://www.youtube.com/watch?v=ktk5N17-Kws&list=PLM5yUS9s0VYCanBjns8luHhM4wCqNoxlA&ab_channel=PlaywrightVi%E1%BB%87tNam)
    - [Slide]
    - [Quiz]
- Bài 2: Kiểm thử API
- Bài 3: Học gọi API với Python và Postman

## Phần 2: Ứng Dụng Quản Lý Thư Viện

Ứng dụng quản lý thư viện được xây dựng bằng NestJS với đầy đủ chức năng quản lý sách, danh mục và người dùng.

### Yêu Cầu Hệ Thống

- Node.js (phiên bản 14.0.0 trở lên)
- npm hoặc yarn
- SQLite3

### Cài Đặt

1. Clone dự án:
```bash
git clone [đường-dẫn-dự-án]
cd book-app
```

2. Cài đặt các gói phụ thuộc:
```bash
npm install
```

### Cấu Hình

1. Tạo file .env từ file mẫu:
```bash
cp .env.example .env
```

2. Cập nhật các biến môi trường trong file .env:
```
JWT_SECRET=your_jwt_secret_key
DATABASE_PATH=./data/database.sqlite
PORT=3000
```

### Chạy Ứng Dụng

1. Chế độ phát triển:
```bash
npm run start:dev
```

2. Chế độ production:
```bash
npm run build
npm run start:prod
```

Ứng dụng sẽ chạy tại `http://localhost:3000`

### Tài Liệu API

Truy cập Swagger UI để xem tài liệu API:
```
http://localhost:3000/api/docs
```

### Tính Năng Chính

1. Quản lý người dùng:
   - Đăng ký
   - Đăng nhập
   - Phân quyền (NGƯỜI DÙNG, THỦ THƯ, QUẢN TRỊ VIÊN)

2. Quản lý sách:
   - Thêm, sửa, xóa sách
   - Mượn/trả sách
   - Tìm kiếm sách

3. Quản lý danh mục:
   - Thêm, sửa, xóa danh mục
   - Phân loại sách theo danh mục

### Cấu Trúc Thư Mục

```
src/
├── auth/           # Xác thực và phân quyền
├── books/          # Module quản lý sách
├── categories/     # Module quản lý danh mục
├── entities/       # Các entity của TypeORM
├── public/         # Tệp tĩnh frontend
└── main.ts         # Điểm khởi đầu
```

### Bảo Mật

- Xác thực bằng JWT
- Mã hóa mật khẩu với bcrypt
- Phân quyền dựa trên vai trò (RBAC)

### Tài Khoản Mặc Định

Sau khi chạy seed, hệ thống sẽ tạo sẵn 3 tài khoản với các vai trò khác nhau:

1. Tài khoản Quản trị viên:
   - Tên đăng nhập: admin
   - Mật khẩu: Test123!
   - Vai trò: QUẢN TRỊ VIÊN