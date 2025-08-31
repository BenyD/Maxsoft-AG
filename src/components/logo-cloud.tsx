import { clsx } from 'clsx'

export function LogoCloud({
  className,
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={clsx(
        className,
        'flex justify-between max-sm:mx-auto max-sm:max-w-md max-sm:flex-wrap max-sm:justify-evenly max-sm:gap-x-4 max-sm:gap-y-4',
      )}
    >
      <img
        alt="Coop"
        src="/logo-cloud/coop_logo.svg"
        className="h-9 brightness-50 grayscale transition-all duration-300 hover:brightness-100 hover:grayscale-0 max-sm:mx-auto sm:h-8 lg:h-12"
      />
      <img
        alt="Costinhalo"
        src="/logo-cloud/costinhalogo.svg"
        className="h-9 brightness-50 grayscale transition-all duration-300 hover:brightness-100 hover:grayscale-0 max-sm:mx-auto sm:h-8 lg:h-12"
      />
      <img
        alt="dzferi"
        src="/logo-cloud/dzferi.svg"
        className="h-9 brightness-50 grayscale transition-all duration-300 hover:brightness-100 hover:grayscale-0 max-sm:mx-auto sm:h-8 lg:h-12"
      />
      <img
        alt="Maxapp"
        src="/logo-cloud/maxapp_logo.png"
        className="h-9 brightness-50 grayscale transition-all duration-300 hover:brightness-100 hover:grayscale-0 max-sm:mx-auto sm:h-8 lg:h-12"
      />
    </div>
  )
}
