import { get, has } from 'lodash/object';

export const createAuthUser = firebaseUser => {
  if (!firebaseUser || !firebaseUser.uid) {
    return null;
  }
  return {
    id: get(firebaseUser, 'uid'),
    email: get(firebaseUser, 'email'),
    emailVerified: has(firebaseUser, 'emailVerified')
      ? get(firebaseUser, 'emailVerified') // Firebase JS SDK
      : get(firebaseUser, 'email_verified'), // Firebase admin SDK
    displayName: get(firebaseUser, 'displayName')
  };
};

export const createAuthUserInfo = ({
  firebaseUser = null,
  token = null
} = {}) => {
  return {
    AuthUser: createAuthUser(firebaseUser),
    token
  };
};
