import { AnimationWrapper } from '@/components/animation-wrapper'
import { Heading, Subheading } from '@/components/text'
import { clsx } from 'clsx'

export function LogoCloud({
  className,
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={clsx(className, 'py-24')}>
      <div className="mb-16">
        <AnimationWrapper animation="slideUp" delay={0.2}>
          <Subheading>Kunden</Subheading>
        </AnimationWrapper>
        <AnimationWrapper animation="slideUp" delay={0.4}>
          <Heading as="h2" className="mt-2 max-w-3xl">
            Unsere Kunden
          </Heading>
        </AnimationWrapper>
        <AnimationWrapper animation="slideUp" delay={0.6}>
          <p className="mt-6 max-w-2xl text-lg text-gray-600">
            Langjährige, partnerschaftliche Zusammenarbeit in verschiedenen
            Branchen.
          </p>
        </AnimationWrapper>
      </div>

      <div
        className={clsx(
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
        <img
          alt="Posaka"
          src="/logo-cloud/posaka.png"
          className="h-9 brightness-50 grayscale transition-all duration-300 hover:brightness-100 hover:grayscale-0 max-sm:mx-auto sm:h-8 lg:h-12"
        />
      </div>
    </div>
  )
}
