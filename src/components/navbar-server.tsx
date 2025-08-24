import { getServiceCategories } from '@/sanity/queries'
import { Navbar } from './navbar'

export async function NavbarServer({ banner }: { banner?: React.ReactNode }) {
  const serviceCategories = await getServiceCategories()

  return (
    <Navbar banner={banner} serviceCategories={serviceCategories.data || []} />
  )
}
