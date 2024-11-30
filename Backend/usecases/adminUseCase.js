const UserRepository = require('../repositories/userRepository');

class AdminUseCase {

  async deleteUser(email) {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    
    const deleteUser = await UserRepository.deleteByEmail(email)
    return deleteUser;
  }

  async addUser(username, email, password, years, role) {
    const existingUser = await UserRepository.findByEmail(email);
    if (existingUser) throw new Error('Email already in use');

    const user = {
      username,
      email,
      password,
      years,
      role,
    };

    await UserRepository.create(user);

    return user;
  }


}

module.exports = new AdminUseCase();
