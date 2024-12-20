# Authentication và Authorization là gì?
Authentication (Xác thực) là quá trình xác minh danh tính của người dùng hoặc hệ thống - kiểm tra xem "bạn có phải là người mà bạn nói bạn là không?". Ví dụ như:
- Đăng nhập bằng username/password 
- Xác thực qua token (JWT, OAuth tokens)
- Xác thực 2 yếu tố (2FA)

Authorization (Ủy quyền) là quá trình xác định quyền hạn của người dùng đã được xác thực - kiểm tra xem "bạn được phép làm gì?". Ví dụ:
- Phân quyền admin/user thông thường
- Quyền đọc/ghi/xóa tài nguyên
- Role-based access control (RBAC)

# Tầm quan trọng
1. Bảo mật hệ thống:
- Ngăn chặn truy cập trái phép vào tài nguyên nhạy cảm
- Bảo vệ dữ liệu người dùng
- Giảm thiểu rủi ro bị tấn công

2. Quản lý truy cập:
- Kiểm soát được ai có thể truy cập vào hệ thống
- Phân quyền rõ ràng cho từng đối tượng
- Theo dõi được hoạt động của người dùng

3. Tuân thủ quy định:
- Đáp ứng các tiêu chuẩn bảo mật
- Bảo vệ thông tin cá nhân theo quy định
- Đảm bảo tính minh bạch

# Phân biệt Authentication và Authorization
1. Thời điểm xử lý:
- Authentication xảy ra trước, xác minh danh tính người dùng
- Authorization xảy ra sau khi đã xác thực thành công

2. Mục đích:
- Authentication trả lời câu hỏi "Bạn là ai?"
- Authorization trả lời câu hỏi "Bạn được phép làm gì?"

3. Dữ liệu sử dụng:
- Authentication: credentials (username/password), tokens, certificates
- Authorization: roles, permissions, policies

## Bảng phân biệt

| **Tiêu chí**          | **Authentication**                                     | **Authorization**                                   |
|--------------------------|-------------------------------------------------------|---------------------------------------------------|
| **Khái niệm**          | Xác minh danh tính người hoặc hệ thống truy cập API. | Quyết định quyền truy cập của đối tượng. |
| **Câu hỏi trả lời** | "Bạn là ai?"                                        | "Bạn được làm gì?"                                  |
| **Thời điểm**         | Thực hiện trước khi phân quyền truy cập.            | Thực hiện sau khi xác minh danh tính.       |
| **Phương pháp**        | Sử dụng API keys, OAuth, JWT, Basic Auth.         | Sử dụng roles, permissions, policies.       |


# Test Authentication và Authorization cần test những gì?

## Test Authentication:

1. Test đăng nhập cơ bản:
- Đăng nhập thành công với credentials hợp lệ
- Đăng nhập thất bại với credentials không hợp lệ
- Xử lý tài khoản bị khóa sau nhiều lần đăng nhập sai

2. Test token:
- Kiểm tra token có được tạo đúng format
- Kiểm tra thời gian hết hạn của token
- Kiểm tra refresh token flow

3. Test bảo mật:
- Kiểm tra password policy
- Test chống brute force attack
- Test 2FA nếu có

## Test Authorization:

1. Test phân quyền:
- Kiểm tra truy cập với từng role khác nhau
- Test các trường hợp không có quyền truy cập
- Test các trường hợp nâng/hạ quyền

2. Test resource access:
- Kiểm tra quyền CRUD trên các tài nguyên
- Test cross-user resource access
- Test inherited permissions

3. Test edge cases:
- Test với token hết hạn
- Test với role bị disable
- Test với permissions bị conflict

# Cách test Authentication và Authorization trong API testing

1. Setup test environment:
```javascript
// Setup test data
const testUsers = [
  {username: "admin", password: "admin123", role: "admin"},
  {username: "user", password: "user123", role: "user"}
];

// Setup test endpoints
const endpoints = {
  login: "/api/auth/login",
  getUsers: "/api/users",
  updateUser: "/api/users/{id}"
};
```

2. Test Authentication:
```javascript
// Test successful login
test("Login success", async () => {
  const response = await api.post(endpoints.login, {
    username: testUsers[0].username,
    password: testUsers[0].password
  });
  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty("token");
});

// Test invalid credentials
test("Login failure", async () => {
  const response = await api.post(endpoints.login, {
    username: "invalid",
    password: "invalid"
  });
  expect(response.status).toBe(401);
});
```

3. Test Authorization:
```javascript
// Test admin access
test("Admin can access all users", async () => {
  const token = await getAdminToken();
  const response = await api.get(endpoints.getUsers, {
    headers: { Authorization: `Bearer ${token}` }
  });
  expect(response.status).toBe(200);
});

// Test unauthorized access
test("Regular user cannot update other users", async () => {
  const token = await getUserToken();
  const response = await api.put(endpoints.updateUser.replace("{id}", "123"), {
    headers: { Authorization: `Bearer ${token}` }
  });
  expect(response.status).toBe(403);
});
```

4. Test best practices:
- Sử dụng test fixtures để quản lý test data
- Mock các external services không cần thiết
- Clean up test data sau mỗi test case
- Tổ chức test cases theo nhóm chức năng
- Đặt tên test cases rõ ràng, dễ hiểu
- Cover đầy đủ các edge cases và error cases