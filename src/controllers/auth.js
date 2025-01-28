import { REFRESH_TOKEN_LT } from '../constans/user.js';
import * as authServices from '../services/auth.js';

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + REFRESH_TOKEN_LT),
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + REFRESH_TOKEN_LT),
  });
};

export const registerUserController = async (req, res) => {
  const user = await authServices.registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: {
      name: user.name,
      email: user.email,
      _id: user.id,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  });
};

export const loginUserController = async (req, res) => {
  const session = await authServices.loginUser(req.body);

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged is an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const refreshUsersSessionController = async (req, res) => {
  const session = await authServices.refreshUsersSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await authServices.logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

export const requestResetEmailController = async (req, res) => {
  await authServices.requestResetToken(req.body.email);

  res.status(200).json({
    status: 200,
    message: 'Reset password email has been successfully sent!',
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  await authServices.resetPassword(req.body);

  res.status(200).json({
    status: 200,
    message: 'Password has been successfully reset!',
    data: {},
  });
};
