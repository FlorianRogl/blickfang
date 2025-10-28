import { createClient, type SanityClient } from '@sanity/client'

// Opening Hours Interface
export interface OpeningHour {
    day: string;
    hours: string;
    isOpen: boolean;
}

// Course Interfaces
export interface CourseModule {
    title: string;
    items: string[];
}

export interface PricingVariant {
    name: string;
    price: string;
    description?: string;
    features: string[];
    isPopular: boolean;
}

export interface Course {
    title: string;
    subtitle: string;
    slug: { current: string };
    image: string;
    duration: string;
    nextDate?: string;
    participants: string;
    level: string;
    price: string;
    description: string;
    short_description: string;
    goal_description?: string;
    courseType: 'basic' | 'daily' | 'individual';
    modules?: CourseModule[];
    contentList?: string[];
    pricingVariants?: PricingVariant[];
    featured: boolean;
    features: string[];
}

// Sanity Client
export const client: SanityClient = createClient({
    projectId:  'r414e7iu',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2024-01-01',
})

// Opening Hours Functions
export async function getOpeningHours(): Promise<OpeningHour[]> {
    const query = `*[_type == "openingHours"] | order(order asc) {
    day,
    hours,
    isOpen
  }`

    return await client.fetch<OpeningHour[]>(query)
}

// Course Functions
export async function getCourses(): Promise<Course[]> {
    const query = `*[_type == "course"] | order(order asc) {
    title,
    subtitle,
    slug,
    "image": image.asset->url,
    duration,
    nextDate,
    participants,
    level,
    price,
    description,
    short_description,
    goal_description,
    courseType,
    modules[]{
      title,
      items
    },
    contentList,
    pricingVariants[]{
      name,
      price,
      description,
      features,
      isPopular
    },
    featured,
    features
  }`

    return await client.fetch<Course[]>(query)
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
    const query = `*[_type == "course" && slug.current == $slug][0] {
    title,
    subtitle,
    slug,
    "image": image.asset->url,
    duration,
    nextDate,
    participants,
    level,
    price,
    description,
    short_description,
    goal_description,
    courseType,
    modules[]{
      title,
      items
    },
    contentList,
    pricingVariants[]{
      name,
      price,
      description,
      features,
      isPopular
    },
    features
  }`

    return await client.fetch<Course | null>(query, { slug })
}