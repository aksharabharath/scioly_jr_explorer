/**
 * Student-visible credits for Entomology practice JPEGs that require
 * attribution (CC BY / CC BY-SA). Keys are quiz `imageSrc` paths.
 * Do not include taxon names or the correct choice.
 */
export const ENTOMOLOGY_IMAGE_CREDITS: Record<string, string> = {
  "/entomology/ento-q3.jpg":
    "Photo: W.alter. CC BY-SA 4.0. Wikimedia Commons.",
  "/entomology/ento-q5.jpg":
    "Photo: Luc Viatour. CC BY-SA 3.0. Wikimedia Commons.",
  "/entomology/ento-q6.jpg":
    "Photo: April Nobile / AntWeb.org. CC BY 4.0. Wikimedia Commons.",
  "/entomology/ento-q8.jpg":
    "Photo: Olaf Nelson. CC BY-SA 4.0. Wikimedia Commons.",
  "/entomology/ento-q10.jpg":
    "Photos: Adrian Tync; AJC1. CC BY-SA 4.0 / CC BY-SA 2.0. Wikimedia Commons.",
  "/entomology/ento-q12.jpg":
    "Photos: David Perez / B kimmel; Udo Schmidt. CC BY 3.0 / CC BY-SA 2.0. Wikimedia Commons.",
  "/entomology/ento-q13.jpg":
    "Photos: neurovelho; Jedesto. CC BY-SA 3.0 / CC BY-SA 4.0. Wikimedia Commons.",
  "/entomology/ento-q24.jpg":
    "Photo: Bernard DUPONT. CC BY-SA 2.0. Wikimedia Commons.",
  "/entomology/ento-q33.jpg":
    "Photo: Bruce Marlin. CC BY-SA 2.5. Wikimedia Commons.",
  "/entomology/ento-q35.jpg":
    "Photo: Jean-Jacques MILAN. CC BY-SA 3.0. Wikimedia Commons.",
  "/entomology/ento-q38.jpg":
    "Photo: GüntherR. CC BY 2.5. Wikimedia Commons.",
  "/entomology/ento-q40.jpg":
    "Photos: Michael Apel; Luc Viatour. CC BY 2.5 / CC BY-SA 3.0. Wikimedia Commons.",
  "/entomology/ento-q41.jpg":
    "Photo: Richard Bartz. CC BY-SA 2.5. Wikimedia Commons.",
  "/entomology/ento-q44.jpg":
    "Photo: Thorsten Denhard. CC BY-SA 3.0. Wikimedia Commons.",
};

export function entomologyImageCredit(imageSrc: string | undefined): string | undefined {
  if (!imageSrc) {
    return undefined;
  }
  const credit = ENTOMOLOGY_IMAGE_CREDITS[imageSrc];
  return credit && credit.trim().length > 0 ? credit : undefined;
}
