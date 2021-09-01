import Image from 'next/image'


export default function Layout ({ children }) {
  return (
    <div className="container">
      <div className="app">
        {children}
      </div>
      <footer className="footer">
        <a
          href="https://ionkom.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className="logo">
            <Image src="/ionkom_logo_100_white.svg" alt="Vercel Logo" width={60} height={60} />
          </span>
        </a>
      </footer>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 0 0.5rem;
          min-height: 100vh;
          height: 100vh;
        }
        .app {
          min-width: 500px;
          backdrop-filter: blur(20px);
          background: rgba(16 18 27 / 40%);
          border-radius: 14px;
        }
        .footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-grow: 1;
        }
        .logo {
          margin-left: 0.5rem;
        }
        
      `}</style>
      <style jsx global>{`
          :root {
            --active-color: #fefffe;
            --dark-bg: #14162b;
          }

          body {
            font-family: 'Poppins', sans-serif;
            background: #355c7d;
            background: -webkit-linear-gradient(to right, #355c7d, #6c5b7b, #c06c84);
            background: linear-gradient(to right, #355c7d, #6c5b7b, #c06c84);
            color: var(--active-color);
          }

          * {
            box-sizing: border-box;
          }
        `}</style>
    </div>
  )
}