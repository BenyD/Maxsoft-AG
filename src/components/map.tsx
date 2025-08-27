'use client'

export function Map() {
  return (
    <div aria-hidden="true" className="relative size-full">
      <div className="absolute inset-0 bg-[url(/map.png)] mask-[linear-gradient(to_bottom,black_50%,transparent)] bg-size-[530px_430px] bg-position-[center_-75px] bg-no-repeat" />
    </div>
  )
}
