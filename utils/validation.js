export function validatePhone(phone) {
  return /^[234][0-9]{7}$/.test(phone);
}

export function validateEntryCode(entryCode) {
  return /^\d{4}$/.test(entryCode);
}

export function validateOTP(phone, otpCode) {
  if (!/^\d{6}$/.test(otpCode)) {
    return { valid: false, error: 'INVALID_FORMAT' };
  }

  const phonePrefix = phone.substring(0, 6);

  if (otpCode.startsWith(phonePrefix)) {
    return { valid: false, error: 'OTP_MATCHES_PHONE_PREFIX' };
  }

  return { valid: true };
}
