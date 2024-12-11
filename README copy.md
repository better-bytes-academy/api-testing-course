# Hệ Thống Quản Lý Thư Viện

Ứng dụng quản lý thư viện được xây dựng bằng NestJS với đầy đủ chức năng quản lý sách, danh mục và người dùng.

## Yêu Cầu Hệ Thống

- Node.js (phiên bản 14.0.0 trở lên)
- npm hoặc yarn
- SQLite3

## Cài Đặt

1. Clone dự án về máy:
```bash
git clone [url-của-dự-án]
cd book-app
```

2. Cài đặt các dependencies:
```bash
npm install
```

## Cấu Hình

1. Tạo file `.env` từ file mẫu:
```bash
cp .env.example .env
```

2. Cập nhật các biến môi trường trong file `.env`:
```
JWT_SECRET=your_jwt_secret_key
DATABASE_PATH=./data/database.sqlite
PORT=3000
```

## Chạy Ứng Dụng

1. Khởi chạy ở môi trường phát triển:
```bash
npm run start:dev
```

2. Khởi chạy ở môi trường production:
```bash
npm run build
npm run start:prod
```

Ứng dụng sẽ chạy tại `http://localhost:3000`

## API Documentation

Truy cập Swagger UI để xem tài liệu API:
```
http://localhost:3000/api/docs
```

## Tính Năng Chính

1. Quản lý người dùng:
   - Đăng ký
   - Đăng nhập
   - Phân quyền (USER, LIBRARIAN, ADMIN)

2. Quản lý sách:
   - Thêm, sửa, xóa sách
   - Mượn/trả sách
   - Tìm kiếm sách

3. Quản lý danh mục:
   - Thêm, sửa, xóa danh mục
   - Phân loại sách theo danh mục

## Cấu Trúc Thư Mục

```
src/
├── auth/           # Xác thực và phân quyền
├── books/          # Module quản lý sách
├── categories/     # Module quản lý danh mục
├── entities/       # Các entity của TypeORM
├── public/         # Frontend static files
└── main.ts         # Entry point
```

## Bảo Mật

- Sử dụng JWT cho xác thực
- Mã hóa mật khẩu với bcrypt
- Phân quyền dựa trên vai trò (RBAC)

## Tài Khoản Mặc Định

Sau khi chạy seed, hệ thống sẽ tạo sẵn 3 tài khoản với các vai trò khác nhau:

1. Tài khoản Admin:
   - Username: admin
   - Password: Test123!
   - Role: ADMIN
   - Email: admin@example.com

2. Tài khoản Thủ Thư:
   - Username: librarian
   - Password: Test123!
   - Role: LIBRARIAN
   - Email: librarian@example.com

3. Tài khoản Người Dùng:
   - Username: user
   - Password: Test123!
   - Role: USER
   - Email: user@example.com

## Chạy Seed Data

Để tạo dữ liệu mẫu với các tài khoản mặc định, chạy lệnh sau:
```bash
npm run seed
```

Lệnh này sẽ tạo 3 tài khoản mặc định:
- Admin (quyền ADMIN)
- Thủ thư (quyền LIBRARIAN)
- Người dùng thông thường (quyền USER)

Mật khẩu cho tất cả tài khoản mặc định là: `Test123!`

Bạn có thể sử dụng các tài khoản này để test các chức năng khác nhau của hệ thống:
- Tài khoản admin: Quản lý người dùng, danh mục, sách
- Tài khoản thủ thư: Quản lý danh mục và sách
- Tài khoản người dùng: Mượn/trả sách

*Lưu ý: Nếu các tài khoản đã tồn tại, script sẽ bỏ qua việc tạo tài khoản đó và thông báo trong console.*

## Reset Database (Chỉ dùng cho môi trường test)

Để xóa toàn bộ dữ liệu và tạo lại dữ liệu mặc định, gọi API sau:

```bash
curl -X POST http://localhost:3000/database/reset
```

API này sẽ:
1. Xóa toàn bộ dữ liệu hiện có
2. Tạo 3 tài khoản mặc định:
   - Admin (admin@example.com)
   - Thủ thư (librarian@example.com)
   - Người dùng (user@example.com)
3. Tạo các danh mục sách mẫu:
   - Văn học
   - Khoa học
   - Thiếu nhi
4. Tạo một số sách mẫu trong mỗi danh mục

*Lưu ý: API này chỉ nên được sử dụng trong môi trường test. Không sử dụng trong môi trường production.*

Mật khẩu cho tất cả tài khoản mặc định là: `Test123!`

## Người Đóng Góp

- minhphong306