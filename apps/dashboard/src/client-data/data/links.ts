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
    //  TODO: uncomment when ready
    // {
    //   name: 'Settings',
    //   href: '/settings',
    // },
  ],
}

// TODO: add links
export const settingsPageLinks: LinkItemsProps = {
  // pathname: '/settings',
  links: [
    {
      name: 'Settings',
      href: `/settings`,
    },
    {
      name: 'Personal',
      href: `/settings/personal`,
    },
    {
      name: 'Company',
      href: `/settings/company`,
    },
    {
      name: 'Drivers',
      href: `/settings/drivers`,
    },
    {
      name: 'Vehicles',
      href: `/settings/vehicles`,
    },
  ],
}
