export default function Layout ({ children }) {
  return (
    <>
      <main>
        {children}
      </main>
      <footer className="footer">
        <a
          href="https://ionkom.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className="logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/ionkom_logo_100_white.svg" alt="Vercel Logo" width={60} height={60} />
          </span>
        </a>
      </footer>

      <style jsx>{`
        .footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;

          // backdrop-filter: blur(20px);
          background: rgba(16 18 27 / 40%);
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
    </>
  )
}