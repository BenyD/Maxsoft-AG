import { getMostRecentPost, getServiceCategories } from '@/sanity/queries'
import { Navbar } from './navbar'

export async function NavbarServer({ banner }: { banner?: React.ReactNode }) {
  const [serviceCategories, mostRecentPost] = await Promise.all([
    getServiceCategories(),
    getMostRecentPost(),
  ])

  return (
    <Navbar
      banner={banner}
      serviceCategories={serviceCategories.data || []}
      mostRecentPost={mostRecentPost.data}
    />
  )
}
