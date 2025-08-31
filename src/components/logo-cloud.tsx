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

      {/* Scrolling Logo Container */}
      <div className="relative overflow-hidden">
        <div className="animate-scroll flex">
          {/* First set of logos */}
          <div className="flex min-w-max items-center space-x-8 sm:space-x-12 lg:space-x-16">
            <img
              alt="Coop"
              src="/logo-cloud/coop_logo.svg"
              className="h-8 brightness-50 grayscale transition-all duration-300 hover:brightness-100 hover:grayscale-0 sm:h-9 lg:h-12"
            />
            <img
              alt="Costinhalo"
              src="/logo-cloud/costinhalogo.svg"
              className="h-8 brightness-50 grayscale transition-all duration-300 hover:brightness-100 hover:grayscale-0 sm:h-9 lg:h-12"
            />
            <img
              alt="dzferi"
              src="/logo-cloud/dzferi.svg"
              className="h-8 brightness-50 grayscale transition-all duration-300 hover:brightness-100 hover:grayscale-0 sm:h-9 lg:h-12"
            />
            <img
              alt="Maxapp"
              src="/logo-cloud/maxapp_logo.png"
              className="h-8 brightness-50 grayscale transition-all duration-300 hover:brightness-100 hover:grayscale-0 sm:h-9 lg:h-12"
            />
            <img
              alt="Posaka"
              src="/logo-cloud/posaka.png"
              className="h-8 brightness-50 grayscale transition-all duration-300 hover:brightness-100 hover:grayscale-0 sm:h-9 lg:h-12"
            />
          </div>
          
          {/* Gap between sets */}
          <div className="w-16 sm:w-20 lg:w-24"></div>
          
          {/* Duplicate set for seamless loop - no gap */}
          <div className="flex min-w-max items-center space-x-8 sm:space-x-12 lg:space-x-16">
            <img
              alt="Coop"
              src="/logo-cloud/coop_logo.svg"
              className="h-8 brightness-50 grayscale transition-all duration-300 hover:brightness-100 hover:grayscale-0 sm:h-9 lg:h-12"
            />
            <img
              alt="Costinhalo"
              src="/logo-cloud/costinhalogo.svg"
              className="h-8 brightness-50 grayscale transition-all duration-300 hover:brightness-100 hover:grayscale-0 sm:h-9 lg:h-12"
            />
            <img
              alt="dzferi"
              src="/logo-cloud/dzferi.svg"
              className="h-8 brightness-50 grayscale transition-all duration-300 hover:brightness-100 hover:grayscale-0 sm:h-9 lg:h-12"
            />
            <img
              alt="Maxapp"
              src="/logo-cloud/maxapp_logo.png"
              className="h-8 brightness-50 grayscale transition-all duration-300 hover:brightness-100 hover:grayscale-0 sm:h-9 lg:h-12"
            />
            <img
              alt="Posaka"
              src="/logo-cloud/posaka.png"
              className="h-8 brightness-50 grayscale transition-all duration-300 hover:brightness-100 hover:grayscale-0 sm:h-9 lg:h-12"
            />
          </div>
          
          {/* Gap between sets */}
          <div className="w-16 sm:w-20 lg:w-24"></div>
          
          {/* Third set to ensure perfect loop */}
          <div className="flex min-w-max items-center space-x-8 sm:space-x-12 lg:space-x-16">
            <img
              alt="Coop"
              src="/logo-cloud/coop_logo.svg"
              className="h-8 brightness-50 grayscale transition-all duration-300 hover:brightness-100 hover:grayscale-0 sm:h-9 lg:h-12"
            />
            <img
              alt="Costinhalo"
              src="/logo-cloud/costinhalogo.svg"
              className="h-8 brightness-50 grayscale transition-all duration-300 hover:brightness-100 hover:grayscale-0 sm:h-9 lg:h-12"
            />
            <img
              alt="dzferi"
              src="/logo-cloud/dzferi.svg"
              className="h-8 brightness-50 grayscale transition-all duration-300 hover:brightness-100 hover:grayscale-0 sm:h-9 lg:h-12"
            />
            <img
              alt="Maxapp"
              src="/logo-cloud/maxapp_logo.png"
              className="h-8 brightness-50 grayscale transition-all duration-300 hover:brightness-100 hover:grayscale-0 sm:h-9 lg:h-12"
            />
            <img
              alt="Posaka"
              src="/logo-cloud/posaka.png"
              className="h-8 brightness-50 grayscale transition-all duration-300 hover:brightness-100 hover:grayscale-0 sm:h-9 lg:h-12"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
