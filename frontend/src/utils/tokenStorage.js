let listeners = [];

export const tokenStorage = {
  subscribe: listener => {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    }
  },
  emitChange: () => {
    for (const listener of listeners) {
      console.log('emit change');
      listener();
    }
  },
  getAccessToken: () => {
    const accessTokenFromLocalStorage = localStorage.getItem('accessToken');
    if (accessTokenFromLocalStorage) {
      return { accessToken: accessTokenFromLocalStorage, remember: true };
    }

    const accessTokenFromSessionStorage = sessionStorage.getItem('accessToken');
    if (accessTokenFromSessionStorage) {
      return { accessToken: accessTokenFromSessionStorage, remember: false };
    }

    return { accessToken: undefined };
  },
  getAccessTokenRaw: () => {
    const { accessToken } = tokenStorage.getAccessToken();
    return accessToken;
  },
  getRefreshToken: () => {
    const refreshTokenFromLocalStorage = localStorage.getItem('refreshToken');
    if (refreshTokenFromLocalStorage) {
      return { refreshToken: refreshTokenFromLocalStorage, remember: true };
    }

    const refreshTokenFromSessionStorage = sessionStorage.getItem('refreshToken');
    if (refreshTokenFromSessionStorage) {
      return { refreshToken: refreshTokenFromSessionStorage, remember: false };
    }

    return { refreshToken: undefined };
  },
  getRefreshTokenRaw: () => {
    const { refreshToken } = tokenStorage.getRefreshToken();
    return refreshToken;
  },
  saveAccessToken: ({ remember, token }) => {
    localStorage.removeItem('accessToken');
    sessionStorage.removeItem('accessToken');

    const storageType = remember ? 'localStorage' : 'sessionStorage';
    window[storageType].setItem('accessToken', token);
    tokenStorage.emitChange();
  },
  saveRefreshToken: ({ remember, token }) => {
    localStorage.removeItem('refreshToken');
    sessionStorage.removeItem('refreshToken');

    const storageType = remember ? 'localStorage' : 'sessionStorage';
    window[storageType].setItem('refreshToken', token);
    tokenStorage.emitChange();
  }
};
