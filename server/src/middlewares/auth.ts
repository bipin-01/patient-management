import { IncomingHttpHeaders } from 'http';
import { Request, Response, NextFunction } from 'express';

import TokenError from 'errors/token';
import { addToStore } from 'utils/store';
import { TOKEN_TYPE } from 'constants/auth';
import { fetchUserByToken } from 'services/auth';

/**
 * Extract token from headers in http request.
 */
function extractTokenFromHeaders(
  headers: IncomingHttpHeaders,
  tokenType: string = TOKEN_TYPE.USER
): { isValid: boolean; token?: string } {
  const { authorization = '' } = headers;

  const [tokenTag, token] = authorization.split(' ').filter(Boolean);

  if (tokenTag !== tokenType || !token) {
    return {
      isValid: false
    };
  }

  return {
    isValid: true,
    token
  };
}

/**
 * Validate token and return the corresponding user.
 */
async function authenticateUser(request: Request) {
  const { isValid, token } = extractTokenFromHeaders(
    request.headers,
    TOKEN_TYPE.USER
  );

  if (!isValid) {
    throw new TokenError('Invalid token');
  }

  const user = await fetchUserByToken(token);

  return { user, token };
}

/**
 * Authenticates the request.
 * If the request is from a user, it will validate the token.
 * If the request is from a user is validated, it will set the user in the store.
 */
export async function authenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      headers: { authorization }
    } = req;

    if (!authorization) {
      return next(new TokenError('No Authorization Token'));
    }

    const [requestAuthenticationTag] =
      authorization && authorization.split(' ').filter(Boolean);

    if (requestAuthenticationTag === 'Bearer') {
      const { user, token } = await authenticateUser(req);

      addToStore({ user });
      addToStore({ userToken: token });

      return next();
    }

    return next(new TokenError('Invalid Authorization Schema'));
  } catch (error) {
    next(new TokenError('Invalid Token'));
  }
}

export default authenticationMiddleware;
