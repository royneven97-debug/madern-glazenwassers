import Image from "next/image";

// Het logo als vast watermerk links in beeld. Staat in de root-layout, dus op
// elke pagina, en blijft staan terwijl de pagina eronder doorscrollt.
//
// Waarom bovenóp de content en niet erachter: vrijwel elke sectie schildert een
// eigen dekkende achtergrond (bg-white, bg-mist-50, bg-navy-900) en de body zelf
// is ook wit. Een watermerk achter de content zou daar volledig onder verdwijnen,
// behalve in de hero. Het ligt dus erboven, met pointer-events-none zodat het
// geen klikken opvangt, en onder z-50 zodat de sticky header er wel overheen gaat.
//
// De zichtbare vorm beslaat 89% van de breedte en 67% van de hoogte van het
// vierkante bestand, de rest is transparante marge.
export function LogoWatermark() {
  return (
    <Image
      src="/madern-glazenwassers-logo-transparant.png"
      alt=""
      aria-hidden
      width={1024}
      height={1024}
      // Eager, maar bewust geen priority: het watermerk is direct in beeld, dus
      // lazy zou het zichtbaar laten inpoppen, maar het is te decoratief om een
      // preload te verdienen boven de tekst van de pagina.
      loading="eager"
      className="pointer-events-none fixed -left-16 top-1/2 z-40 w-[22rem] -translate-y-1/2 select-none opacity-[0.22] sm:w-[28rem] lg:-left-24 lg:w-[38rem] xl:w-[44rem]"
    />
  );
}
