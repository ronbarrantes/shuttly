export type LinkItemsProps = {
  pathname?: string
  links: {
    name: string
    href: string
  }[]
}

export const mainNavLinks: LinkItemsProps = {
  links: [
    {
      name: 'Dashboard',
      href: '/',
    },
    {
      name: 'Settings',
      href: '/settings',
    },
  ],
}

export const settingsPageLinks: LinkItemsProps = {
  pathname: '/settings',
  links: [
    /**
        <li>
          <Link href={`${uri}/`}>Personal</Link>
        </li>
        <li>
          <Link href={`${uri}/`}>Company</Link>
        </li>
        <li>
          <Link href={`${uri}/`}>Drivers</Link>
        </li>
        <li>
          <Link href={`${uri}/`}>Drivers</Link>
        </li> 
 

 */
  ],
}
