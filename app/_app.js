export default function App({ Component, pageProps}) {
  return (
    <AppLayaout>
      <Component {...pageProps} />
    </AppLayaout>
  );
}