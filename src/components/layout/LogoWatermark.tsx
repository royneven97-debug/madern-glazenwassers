import Image from "next/image";

// Het logo als vast watermerk in de lege marge links naast de tekstkolom.
// Staat in de root-layout, dus op elke pagina, en blijft staan tijdens scrollen.
//
// Waarom in de marge en niet over de content: het watermerk lag eerst bovenop
// de pagina en kleurde daarmee de witte achtergrond achter de tekst blauw. Dat
// verlaagt het contrast en leest als een waas, zeker omdat veel bodytekst zelf
// al half doorzichtig is (text-navy-800/75 en /85). Eronder leggen kan niet:
// vrijwel elke sectie schildert een eigen dekkende achtergrond, dus daar zou
// het volledig onder verdwijnen.
//
// De rekensom: de tekstkolom is max-w-6xl (72rem) en gecentreerd, dus de vrije
// marge links is (100vw - 72rem) / 2. De rechterrand van het logo leggen we op
// de linkerrand van die kolom, en de breedte begrenzen we tot diezelfde marge
// met 1rem lucht. Dat plafond via min() is nodig: zonder zou het logo bij een
// smaller venster links buiten beeld steken, en dat afvangen met overflow-x
// hidden op de body breekt de sticky header.
//
// Onder 1440px is de marge te smal om er iets zinnigs in te tonen, daar blijft
// het watermerk dus weg. In calc() horen spaties rond + en -, vandaar de
// underscores: Tailwind vertaalt die naar spaties.
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
      className="pointer-events-none fixed right-[calc(50%_+_36rem)] top-1/2 z-40 hidden w-[min(26rem,calc(50vw_-_37rem))] -translate-y-1/2 select-none mix-blend-multiply opacity-[0.14] min-[1440px]:block"
    />
  );
}
