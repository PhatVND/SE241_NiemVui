# Cấu hình file .env

```
PORT=
MONGODB_LINK=
SECRET_KEY_ACCESS=
EXPIRE_ACCESS=
SECRET_KEY_REFRESH=
EXPIRE_REFRESH=
```

- Lưu ý: Refresh Access phải có thời gian tồn tại lâu hơn access
- Secret key là 1 chuỗi 32 bit để làm hash key cho jwt

Các endpoint hiện có:

- login:
  - / : đăng nhập, trả về access token và refresh token
  - /token: trả về access token, nếu refresh token hết hạn phải login lại, nếu còn chỉ cần lấy access token mới
- user
  - /getinfo: trả về thông tin user
  - /logout: log out

# Document API

- Sử dụng file document.yml, có thể xem bằng các extension hỗ trợ openAPI trên IDE hoặc copy file dán vào [đây](https://editor.swagger.io/)
