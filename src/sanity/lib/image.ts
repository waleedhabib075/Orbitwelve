import createImageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { dataset, projectId, hasSanityConfig } from '../env'

type ImageUrlBuilder = ReturnType<typeof createImageUrlBuilder>

const emptyBuilder = {
  width: () => emptyBuilder,
  height: () => emptyBuilder,
  url: () => '',
} as unknown as ImageUrlBuilder

// https://www.sanity.io/docs/image-url
const builder: ImageUrlBuilder | null = hasSanityConfig
  ? createImageUrlBuilder({ projectId, dataset })
  : null

export const urlFor = (source: SanityImageSource): ImageUrlBuilder => {
  if (!builder) {
    return emptyBuilder
  }

  return builder.image(source)
}
