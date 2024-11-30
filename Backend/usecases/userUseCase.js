const UserRepository = require('../repositories/userRepository');
const UserMapper = require('../middleware/mapper/userMapper');

class userUseCases {
  async getinfo(userId) {
    const user = await UserRepository.findById(userId);
    if (!user) throw new Error('Cant find user');
    return UserMapper.toResponse(user);
  }
}

module.exports = new userUseCases();
