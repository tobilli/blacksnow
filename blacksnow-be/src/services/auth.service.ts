import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';

const ACCESS_SECRET = () => process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = () => process.env.JWT_REFRESH_SECRET!;
const ACCESS_EXPIRES = () => process.env.JWT_ACCESS_EXPIRES ?? '15m';
const REFRESH_EXPIRES_DAYS = 7;

const signAccess = (payload: { userId: string; email: string; role: string }) =>
  jwt.sign(payload, ACCESS_SECRET(), { expiresIn: ACCESS_EXPIRES() } as jwt.SignOptions);

const signRefresh = (userId: string) =>
  jwt.sign({ userId }, REFRESH_SECRET(), { expiresIn: `${REFRESH_EXPIRES_DAYS}d` } as jwt.SignOptions);

export const register = async (email: string, password: string) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw Object.assign(new Error('Email already in use'), { code: 'DUPLICATE' });

  const passwordHash = await bcrypt.hash(password, 12);
  return prisma.user.create({
    data: { email, passwordHash },
    select: { id: true, email: true, role: true, createdAt: true },
  });
};

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  const valid = user && await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw Object.assign(new Error('Invalid credentials'), { code: 'INVALID_CREDS' });

  const accessToken = signAccess({ userId: user.id, email: user.email, role: user.role });
  const refreshToken = signRefresh(user.id);

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + REFRESH_EXPIRES_DAYS);

  await prisma.refreshToken.create({ data: { token: refreshToken, userId: user.id, expiresAt } });

  return {
    accessToken,
    refreshToken,
    user: { id: user.id, email: user.email, role: user.role },
  };
};

export const refresh = async (token: string) => {
  let payload: { userId: string };
  try {
    payload = jwt.verify(token, REFRESH_SECRET()) as { userId: string };
  } catch {
    throw Object.assign(new Error('Invalid refresh token'), { code: 'INVALID_TOKEN' });
  }

  const stored = await prisma.refreshToken.findUnique({ where: { token }, include: { user: true } });
  if (!stored || stored.expiresAt < new Date()) {
    throw Object.assign(new Error('Refresh token expired or revoked'), { code: 'INVALID_TOKEN' });
  }

  const { user } = stored;
  const accessToken = signAccess({ userId: user.id, email: user.email, role: user.role });
  return { accessToken };
};

export const logout = async (token: string) => {
  await prisma.refreshToken.deleteMany({ where: { token } });
};
