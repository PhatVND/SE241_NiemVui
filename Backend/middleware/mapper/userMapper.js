class UserMapper {
  static toResponse(user) {
    return {
      username: user.username,
      email: user.email,
      years: user.years,
    };
  }
}

module.exports = UserMapper;
