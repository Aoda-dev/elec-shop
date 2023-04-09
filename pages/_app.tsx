import '../styles/globals.css';
import Head from 'next/head';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Eshop Magazine</title>
      </Head>
      <main className={`${montserrat.variable} font-sans`}>
        <Component {...pageProps} />
      </main>
    </>
  );
}
