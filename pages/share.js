import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useContest } from '@/context/ContestContext';

export default function SharePage() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { phone } = useContest();
  const [siteUrl, setSiteUrl] = useState('');

  useEffect(() => {
    if (!phone) {
      router.replace('/register');
      return;
    }
    setSiteUrl(window.location.origin);
  }, [phone, router]);

  const shareText =
    i18n.language === 'fr'
      ? `Rejoignez le concours MASRVI et gagnez des prix precieux!\n${siteUrl}`
      : `انضم لمسابقة مصرفي واربح جوائز قيمة!\n${siteUrl}`;

  const trackShare = async (platform) => {
    try {
      await axios.post('/api/track-share', { phone, platform });
    } catch (error) {
      console.error('Track share error:', error);
    }
  };

  const handleWhatsApp = () => {
    trackShare('WhatsApp');
    window.open(
      `https://wa.me/?text=${encodeURIComponent(shareText)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleMessenger = () => {
    trackShare('Messenger');
    window.open(
      `fb-messenger://share?link=${encodeURIComponent(siteUrl)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleSnapchat = () => {
    trackShare('Snapchat');
    window.open(
      `https://www.snapchat.com/scan?attachmentUrl=${encodeURIComponent(siteUrl)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  if (!phone) return null;

  return (
    <>
      <Head>
        <title>MASRVI - {t('share.success')}</title>
      </Head>

      <main className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12 bg-gradient-to-b from-primary-50 to-white">
        <div className="w-full max-w-md text-center">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            {/* Logo */}
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7923244c-5be4-4f29-bbe9-96c23ebaebc9.jpeg"
              alt="Masrvi Logo"
              width={120}
              height={50}
              className="h-12 w-auto mx-auto mb-6 object-contain"
            />

            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-3">{t('share.success')}</h1>
            <p className="text-gray-600 mb-8">{t('share.message')}</p>

            <div className="space-y-3">
              <button
                type="button"
                onClick={handleWhatsApp}
                className="w-full py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold rounded-2xl transition-colors flex items-center justify-center gap-3 text-lg"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {t('share.whatsapp')}
              </button>
              <button
                type="button"
                onClick={handleMessenger}
                className="w-full py-4 bg-[#0084FF] hover:bg-[#0073e6] text-white font-semibold rounded-2xl transition-colors flex items-center justify-center gap-3 text-lg"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.497 1.745 6.616 4.472 8.652V24l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.111S18.627 0 12 0zm1.193 14.963l-3.056-3.259-5.963 3.259 6.559-6.963 3.13 3.259 5.889-3.259-6.559 6.963z"/>
                </svg>
                {t('share.messenger')}
              </button>
              <button
                type="button"
                onClick={handleSnapchat}
                className="w-full py-4 bg-[#FFFC00] hover:bg-[#e6e300] text-gray-900 font-semibold rounded-2xl transition-colors flex items-center justify-center gap-3 text-lg"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.464 0-.879.045-1.258.135-.195.029-.42.059-.57.059h-.045c-.329 0-.524-.15-.569-.42-.061-.18-.105-.359-.149-.553-.044-.195-.089-.465-.149-.57-1.873-.284-2.92-.702-3.161-1.271-.03-.075-.044-.149-.044-.224 0-.24.165-.465.419-.509 3.266-.54 4.731-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.45-.884-.674-1.332-.809-.12-.045-.241-.09-.345-.119-.823-.33-1.228-.72-1.213-1.168 0-.359.285-.689.734-.838.149-.059.329-.089.509-.089.135 0 .314.015.479.104.39.18.749.286 1.033.301.195 0 .326-.045.401-.091-.007-.165-.017-.33-.03-.51l-.003-.06c-.104-1.627-.225-3.654.299-4.847C7.859 1.07 11.216.793 12.206.793z"/>
                </svg>
                {t('share.snapchat')}
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
