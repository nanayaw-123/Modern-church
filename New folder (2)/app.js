import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Nav />
      <main className="py-4">
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  )
}