import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { config } from './index';
import { prisma, User } from 'src/lib/prisma';

passport.serializeUser((user: User, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: config.googleClientId || '',
      clientSecret: config.googleClientSecret || '',
      callbackURL: `${config.appUrl}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      // Handle Google user data here
    }
  )
);

// Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: config.facebookAppId || '',
      clientSecret: config.facebookAppSecret || '',
      callbackURL: `${config.appUrl}/auth/facebook/callback`,
      profileFields: ['id', 'emails', 'name'],
    },
    async (accessToken, refreshToken, profile, done) => {
      // Handle Facebook user data here
    }
  )
);

export default passport;
