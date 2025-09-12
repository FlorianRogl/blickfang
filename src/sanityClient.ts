import { createClient, type SanityClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder'

export const client: SanityClient = createClient({
    projectId: 'dwm6bfip', // findest du in sanity-studio/sanity.config.ts
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: true,
    token: ''
})

const builder = imageUrlBuilder(client)
export const urlFor = (source: any): ImageUrlBuilder => builder.image(source)