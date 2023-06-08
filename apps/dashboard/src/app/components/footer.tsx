import dayjs from 'dayjs'

export const Footer = () => {
  const currentYear = dayjs().year()

  return (
    <footer className="justify-self-end">
      <div className="flex flex-col items-center justify-center gap-1 text-sm text-slate-500">
        <ul className="flex gap-1">
          <li>Tools used:</li>
          <li>
            <a
              href="http://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="link-primary"
            >
              Next.js
            </a>
          </li>
          <li>
            <a
              href="http://turbo.build"
              target="_blank"
              rel="noopener noreferrer"
              className="link-primary"
            >
              Turborepo
            </a>
          </li>
          <li>
            <a
              href="http://tailwind.css"
              target="_blank"
              rel="noopener noreferrer"
              className="link-primary"
            >
              Tailwind
            </a>
          </li>
          <li>
            <a
              href="http://planetscale.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link-primary"
            >
              PlanetScale
            </a>
          </li>
          <li>
            <a
              href="http://clerk.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link-primary"
            >
              Clerk.com
            </a>
          </li>
        </ul>

        <p>
          Made with{' '}
          <span role="img" aria-label="love">
            ❤️
          </span>{' '}
          by{' '}
          <a
            href="http://ronb.co"
            target="_blank"
            rel="noopener"
            className="text-indigo-500 underline hover:text-black hover:no-underline"
          >
            Ron
          </a>{' '}
          • {currentYear}
        </p>
      </div>
    </footer>
  )
}
