//variants string
// export const EMAIL_REGEXP = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
// export const EMAIL_REGEXP = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const EMAIL_REGEXP = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export const ACCESS_TOKEN_LT = 1000 * 60 * 15;

export const REFRESH_TOKEN_LT = 1000 * 60 * 60 * 24 * 30;
