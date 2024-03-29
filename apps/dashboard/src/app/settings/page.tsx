import { SettingsPageNav } from '@components/navigation'
import { PageLayout } from '@components/page-layout'

export default function Settings() {
  return (
    <PageLayout title="Settings">
      <span className="from-brandred to-brandindigo block bg-gradient-to-r bg-clip-text px-2 text-transparent">
        Turborepo Example
      </span>
      <SettingsPageNav />
    </PageLayout>
  )
}
