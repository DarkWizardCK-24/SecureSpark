const LOG_2 = Math.log(2);

// Time conversion constants (seconds)
const SECONDS_IN_MINUTE = 60.0;
const SECONDS_IN_HOUR = 3600.0;
const SECONDS_IN_DAY = 86400.0;
const SECONDS_IN_WEEK = 604800.0;
const SECONDS_IN_YEAR = 31536000.0;
const SECONDS_IN_DECADE = 315360000.0;
const SECONDS_IN_CENTURY = 3153600000.0;

export function calculateEntropy(password) {
  if (!password) return 0.0;

  let poolSize = 0;
  let hasLower = false, hasUpper = false, hasDigit = false, hasSpecial = false, hasExtended = false;
  const charFrequency = new Map();

  // Single-pass character analysis
  for (let code of password) {
    charFrequency.set(code, (charFrequency.get(code) || 0) + 1);
    code = code.charCodeAt(0);
    if (code >= 97 && code <= 122) hasLower = true;
    else if (code >= 65 && code <= 90) hasUpper = true;
    else if (code >= 48 && code <= 57) hasDigit = true;
    else if ('!@#$%^&*(),.?":{}|<>[]-_=`~;'.includes(code)) hasSpecial = true;
    else if ('£€¥©®™'.includes(code)) hasExtended = true;
  }

  // Calculate pool size
  if (hasLower) poolSize += 26;
  if (hasUpper) poolSize += 26;
  if (hasDigit) poolSize += 10;
  if (hasSpecial) poolSize += 32;
  if (hasExtended) poolSize += 6;

  // Adjust for repetition
  const repetitionFactor = charFrequency.size / password.length;
  if (repetitionFactor < 1.0) {
    poolSize = Math.round(poolSize * repetitionFactor);
  }

  // Entropy = length * log2(poolSize)
  return poolSize > 0 ? password.length * (Math.log(poolSize) / LOG_2) : 0.0;
}

export function getStrengthInfo(entropy) {
  const guessesPerSecond = 1e10;
  const seconds = Math.pow(2, entropy) / guessesPerSecond;

  let crackTime, isApproximate = false;
  if (seconds < SECONDS_IN_MINUTE) {
    crackTime = `${seconds.toFixed(2)} seconds`;
  } else if (seconds < SECONDS_IN_HOUR) {
    crackTime = `${(seconds / SECONDS_IN_MINUTE).toFixed(2)} mins`;
  } else if (seconds < SECONDS_IN_DAY) {
    crackTime = `${(seconds / SECONDS_IN_HOUR).toFixed(2)} hours`;
  } else if (seconds < SECONDS_IN_WEEK) {
    crackTime = `${(seconds / SECONDS_IN_DAY).toFixed(2)} days`;
  } else if (seconds < SECONDS_IN_YEAR) {
    crackTime = `${(seconds / SECONDS_IN_WEEK).toFixed(2)} weeks`;
  } else if (seconds < SECONDS_IN_DECADE) {
    crackTime = `approx ${(seconds / SECONDS_IN_YEAR).toFixed(2)} years`;
    isApproximate = true;
  } else if (seconds < SECONDS_IN_CENTURY) {
    crackTime = `approx ${(seconds / SECONDS_IN_DECADE).toFixed(2)} decades`;
    isApproximate = true;
  } else {
    crackTime = `approx ${(seconds / SECONDS_IN_CENTURY).toFixed(2)} centuries`;
    isApproximate = true;
  }

  if (entropy < 28) {
    return { strength: 'Very Weak', crackTime, isApproximate, color: 'red' };
  } else if (entropy < 36) {
    return { strength: 'Weak', crackTime, isApproximate, color: 'orange' };
  } else if (entropy < 60) {
    return { strength: 'Reasonable', crackTime, isApproximate, color: 'yellow' };
  } else if (entropy < 80) {
    return { strength: 'Strong', crackTime, isApproximate, color: 'green' };
  } else if (entropy < 100) {
    return { strength: 'Very Strong', crackTime, isApproximate, color: 'blue' };
  } else {
    return { strength: 'Extremely Strong', crackTime, isApproximate, color: 'teal' };
  }
}

export function checkConditions(password) {
  return {
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    digit: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>[\]\-_=`~;]/.test(password),
    extended: /[£€¥©®™]/.test(password),
  };
}