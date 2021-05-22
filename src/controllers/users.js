const { signJwtToken, getJwtTokenData } = require('../utils/jwt');

const errorBuilder = require('../utils/error-builder');
const { validateEmail, validateSha256 } = require('../utils/validators');
const { sha256, isNumeric } = require('../utils/helpers');
const UsersRepository = require('../models/users/repository');
const userToDto = require('./dtos/user');
const userPreferenceToDto = require('./dtos/user-preference');

const PREFERENCES_ACTIONS = {
  add: 'add',
  delete: 'delete',
};

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

    const resultUser = userToDto(user);

    ctx.ok({
      result: true,
      response: {
        signature: signJwtToken({
          id: user.id,
          ...resultUser,
        }),
        user: resultUser,
      },
    });
  }

  async managePreferences (ctx) {
    const { signature, action, id } = ctx.request.body;

    const user = getJwtTokenData(signature);

    if (!user) {
      throw errorBuilder.buildInvalidTokenError();
    }
    if (!isNumeric(id)) {
      throw errorBuilder.buildBadRequestError('\'id\' is not valid');
    }

    const preference = await UsersRepository.findPreference({
      skillId: id,
      userId: user.id,
    });

    if (action === PREFERENCES_ACTIONS.add) {
      if (preference) {
        throw errorBuilder.buildBadRequestError('This preference already exists');
      }

      await UsersRepository.addPreference({
        skillId: id,
        userId: user.id,
      });
    } else if (action === PREFERENCES_ACTIONS.delete) {
      if (!preference) {
        throw errorBuilder.buildBadRequestError('This preference does not exists');
      }

      await UsersRepository.deletePreference({
        preferenceId: preference.id,
      });
    } else {
      throw errorBuilder.buildBadRequestError('Unknown action');
    }
    ctx.ok({ result: true });
  }

  async getPreferences (ctx) {
    const { signature } = ctx.request.body;

    const user = getJwtTokenData(signature);

    if (!user) {
      throw errorBuilder.buildInvalidTokenError();
    }

    const rawResnpose = await UsersRepository.findAllUserPreferences({
      userId: user.id,
    });

    const response = rawResnpose.reduce((total, pref) => {
      const dtoPref = userPreferenceToDto(pref);
      return Object.assign(total, { [dtoPref.skillId]: dtoPref });
    }, {});

    ctx.ok({
      result: true,
      response: response,
    });
  }
}

module.exports = new UsersController();
