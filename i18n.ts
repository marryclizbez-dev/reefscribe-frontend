import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';

// Can be imported from a shared config
export const locales = ['en', 'ar'];

export default getRequestConfig(async ({locale}) => {
  const safeLocale = locales.includes(locale as any) ? locale : 'en';
  return {
    locale: safeLocale as string,
    messages: (await import(`./messages/${safeLocale}.json`)).default
  };
});
