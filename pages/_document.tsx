import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head>

      </Head>
      <body>
        <Main />
        <NextScript />
        <script src='https://storage.ko-fi.com/cdn/scripts/overlay-widget.js' />
        <Script  
          id="kofi-widget" 
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html:
            `kofiWidgetOverlay.draw('shnai', {
              'type': 'floating-chat',
              'floating-chat.donateButton.text':'',
              'floating-chat.donateButton.background-color': '#0E66C2',
              'floating-chat.donateButton.text-color': '#fff'
            });`
          }}
        />
      </body>
    </Html >
  )
}
