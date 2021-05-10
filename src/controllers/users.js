const { signJwtToken } = require('../utils/jwt');

const errorBuilder = require('../utils/error-builder');
const { validateEmail, validateSha256 } = require('../utils/validators');
const { sha256 } = require('../utils/helpers');
const UsersRepository = require('../models/users/repository');

class UsersController {
  async signUp (ctx) {
    const data = ctx.request.body;

    if (!(data.username && data.username.length > 0)) {
      throw errorBuilder.buildInvalidRequestParamsError('Field \'username\' has to be correct');
    } else if (data.email && !validateEmail(data.email)) {
      throw errorBuilder.buildInvalidRequestParamsError('If \'email\' provided then it must be valid');
    } else if (!data.password && !validateSha256(data.password)) {
      throw errorBuilder.buildInvalidRequestParamsError('Field \'password\' has to be correct');
    }

    const user = await UsersRepository.findByUsername({
      username: data.username,
    });

    if (user) {
      throw errorBuilder.buildInvalidRequestParamsError('User with this nickname already exists');
    }

    await UsersRepository.createNew({
      ...data,
      password: sha256(data.password),
    });

    ctx.ok({
      result: true,
    });
  }

  async signIn (ctx) {
    const data = ctx.request.body;

    if (!(data.username && data.username.length > 0)) {
      throw errorBuilder.buildInvalidRequestParamsError('Field \'username\' has to be correct');
    } else if (!data.password && !validateSha256(data.password)) {
      throw errorBuilder.buildInvalidRequestParamsError('Field \'password\' has to be correct');
    }

    const user = await UsersRepository.findByUsername({
      username: data.username,
    });

    if (!user) {
      throw errorBuilder.buildInvalidRequestParamsError('No such user found');
    }

    const dbPassword = user.password;
    const providedPassword = sha256(data.password);

    if (dbPassword !== providedPassword) {
      throw errorBuilder.buildInvalidRequestParamsError('Password is incorrect');
    }

    const resultUser = {
      username: user.username,
      email: user.email,
    };

    ctx.ok({
      result: true,
      response: {
        signature: signJwtToken(resultUser),
        user: resultUser,
      },
    });
  }
}

module.exports = new UsersController();
