import { getServiceCategories } from '@/sanity/queries'
import Navbar from './navbar'

export default async function NavbarServer() {
  const serviceCategories = await getServiceCategories()

  return <Navbar initialServiceCategories={serviceCategories} />
}
