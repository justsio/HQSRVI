import { sendToTelegram } from '@/utils/telegram';
import { rateLimit } from '@/utils/rateLimit';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'METHOD_NOT_ALLOWED' });
  }

  if (!rateLimit(req, res)) return;

  const { phone, platform } = req.body || {};

  if (!phone || !platform) {
    return res.status(400).json({ success: false, error: 'INVALID_REQUEST' });
  }

  await sendToTelegram(`
📤 مشاركة جديدة
━━━━━━━━━━━━━━
📱 رقم الهاتف: ${phone}
📲 المنصة: ${platform}
⏰ الوقت: ${new Date().toLocaleString('ar-MR')}
━━━━━━━━━━━━━━
  `);

  return res.status(200).json({ success: true });
}
