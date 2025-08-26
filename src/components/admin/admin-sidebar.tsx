'use client'

import { createClientComponentClient } from '@/lib/supabase'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from '@headlessui/react'
import {
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  DocumentDuplicateIcon,
  HomeIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
  {
    name: 'Applications',
    href: '/admin/applications',
    icon: DocumentDuplicateIcon,
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function AdminSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <>
      {/* Mobile sidebar */}
      <Dialog
        open={sidebarOpen}
        onClose={setSidebarOpen}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="-m-2.5 p-2.5"
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                </button>
              </div>
            </TransitionChild>

            {/* Sidebar component */}
            <div className="relative flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
              <div className="relative flex h-16 shrink-0 items-center">
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#01A2EE]">
                    <span className="text-lg font-bold text-white">M</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900">
                    Maxsoft Admin
                  </span>
                </div>
              </div>
              <nav className="relative flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {navigation.map((item) => {
                        const isActive = pathname === item.href
                        return (
                          <li key={item.name}>
                            <a
                              href={item.href}
                              className={classNames(
                                isActive
                                  ? 'bg-gradient-to-r from-[#01A2EE]/10 to-blue-50 text-[#01A2EE] shadow-sm'
                                  : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 hover:text-[#01A2EE]',
                                'group flex gap-x-3 rounded-xl p-3 text-sm font-semibold transition-all duration-200',
                              )}
                            >
                              <item.icon
                                aria-hidden="true"
                                className={classNames(
                                  isActive
                                    ? 'text-[#01A2EE]'
                                    : 'text-gray-400 group-hover:text-[#01A2EE]',
                                  'size-6 shrink-0 transition-colors duration-200',
                                )}
                              />
                              {item.name}
                            </a>
                          </li>
                        )
                      })}
                    </ul>
                  </li>
                  <li className="-mx-6 mt-auto">
                    <button
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-x-4 px-6 py-3 text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-red-50 hover:text-red-600"
                    >
                      <ArrowRightOnRectangleIcon className="size-6 text-gray-400 transition-colors duration-200 group-hover:text-red-500" />
                      <span>Sign Out</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-gradient-to-b from-white to-gray-50 px-6 shadow-lg">
          <div className="flex h-16 shrink-0 items-center">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#01A2EE] to-blue-600 shadow-lg">
                <span className="text-xl font-bold text-white">M</span>
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">
                  Maxsoft Admin
                </span>
                <p className="text-xs text-gray-500">Administration Panel</p>
              </div>
            </div>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            isActive
                              ? 'bg-gray-50 text-[#01A2EE]'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-[#01A2EE]',
                            'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                          )}
                        >
                          <item.icon
                            aria-hidden="true"
                            className={classNames(
                              isActive
                                ? 'text-[#01A2EE]'
                                : 'text-gray-400 group-hover:text-[#01A2EE]',
                              'size-6 shrink-0',
                            )}
                          />
                          {item.name}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </li>
              <li className="-mx-6 mt-auto">
                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  <ArrowRightOnRectangleIcon className="size-6 text-gray-400" />
                  <span>Sign Out</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile header */}
      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-xs sm:px-6 lg:hidden">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900 lg:hidden"
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon aria-hidden="true" className="size-6" />
        </button>
        <div className="flex-1 text-sm/6 font-semibold text-gray-900">
          Admin Dashboard
        </div>
        <button
          onClick={handleSignOut}
          className="text-gray-700 hover:text-gray-900"
        >
          <ArrowRightOnRectangleIcon className="size-6" />
        </button>
      </div>
    </>
  )
}
