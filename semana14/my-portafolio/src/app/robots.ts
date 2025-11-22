import { MetadataRoute } from 'next';
import { personalInfo } from '../../libs/data';


export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/','/contact','/projects','/about'],
        disallow: ['/api/', '/admin/', '/_next/'],
      },
      {
        userAgent: 'Googlebot',
        allow: ['/','/contact','/projects','/about'],
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${personalInfo.siteUrl}/sitemap.xml`,
  };
}

