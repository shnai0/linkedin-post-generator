import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>

      </Head>
      <body>
        <Main />
        <NextScript />
        <script type='text/javascript'>kofiwidget2.init('Support Me on Ko-fi', '#29abe0', 'E1E2KGTK2');kofiwidget2.draw();</script>
        <script src='https://storage.ko-fi.com/cdn/scripts/overlay-widget.js'></script>
        <script

          dangerouslySetInnerHTML={{
            __html: `
                kofiWidgetOverlay.draw('shnai', {
                  'type': 'floating-chat',
                  'floating-chat.donateButton.text':'',
                  'floating-chat.donateButton.background-color': '#0E66C2',
                  'floating-chat.donateButton.text-color': '#fff'
  
                  
                });
              `,
          }}
        />
      </body>
    </Html >
  )
}
