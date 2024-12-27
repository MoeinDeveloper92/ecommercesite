/**
 * This file is used to allow presentation to set the app in Draft Mode, which will load Visual Efitin and query draft content and preview the conten a it will appear once everuthign os puvlisehd
 *
 */

import { validatePreviewUrl } from '@sanity/preview-url-secret';
import { client } from '@/sanity/lib/client';
import { redirect } from 'next/navigation';
import { draftMode } from 'next/headers';
import { NextRequest } from 'next/server';

const token = process.env.SANITY_API_READ_TOKEN;

export async function GET(request: NextRequest) {
  const { isValid, redirectTo = '/' } = await validatePreviewUrl(
    client.withConfig({ token }),
    request.url
  );
  if (!isValid) {
    return new Response(JSON.stringify({ message: 'Invalid Secret' }), {
      status: 401,
    });
  }
  (await draftMode()).enable();
  redirect(redirectTo);
}
