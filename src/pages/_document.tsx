/* eslint-disable @next/next/next-script-for-ga */
import Document, { Head, Html, Main, NextScript } from 'next/document'
import { ColorModeScript } from '@chakra-ui/react'
import theme from '../theme'
import { layout } from '../data'

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/next_ico.svg" />
          <meta name="keywords" content={layout.keywords?.join(', ')} />
          <meta property="og:url" content={layout.url} />
          <meta property="og:type" content="page" />
          <meta property="og:title" content={layout.socialTitle} />
          <meta property="og:image" content={layout.socialImageUrl} />
          <meta property="og:description" content={layout.description} />
          <meta property="og:site_name" content={layout.siteName} />
          <meta property="article:author" content="NeXTIME" />
          <meta name="twitter:title" content={layout.socialTitle} />
          <meta name="twitter:description" content={layout.description} />
          <meta property="twitter:image:src" content={layout.socialImageUrl} />
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-HR3FEXZ81Q" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-HR3FEXZ81Q');
            `
            }}
          />
          <script async src="https://www.googletagmanager.com/gtag/js?id=AW-10801675787" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-10801675787');
            `
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:3149058,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `
            }}
          />
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
