import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Add the Simple Analytics script */}
      <Script 
        src="https://scripts.simpleanalyticscdn.com/latest.js" 
        strategy="afterInteractive" 
      />
      
      
      {/* Render your page components */}
      <Component {...pageProps} />
    </>
  )
}
