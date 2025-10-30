// Schema.org strukturierte Daten für SEO

export const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": "blickfang Nagelstudio",
    "alternateName": "blickfang Nail Academy",
    "description": "Professionelles Nagelstudio und Nail Academy in St. Veit am Vogau mit Kursen für Nageldesign, Russian Manicure und mehr.",
    "url": "https://blickfang-nagelstudio.at",
    "logo": "https://blickfang-nagelstudio.at/logo.png",
    "image": [
        "https://blickfang-nagelstudio.at/og-image.jpg",
        "https://blickfang-nagelstudio.at/studio-image.jpg"
    ],
    "telephone": "+436644523026",
    "email": "hi@blickfang-nagelstudio.at",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "Am Kirchpl. 7",
        "addressLocality": "St. Veit am Vogau",
        "postalCode": "8423",
        "addressRegion": "Steiermark",
        "addressCountry": "AT"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": 46.7333,
        "longitude": 15.6167
    },
    "openingHoursSpecification": [
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
        }
    ],
    "priceRange": "€€",
    "paymentAccepted": "Cash, Bank Transfer",
    "currenciesAccepted": "EUR",
    "areaServed": {
        "@type": "GeoCircle",
        "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": 46.7333,
            "longitude": 15.6167
        },
        "geoRadius": "50000"
    },
    "sameAs": [
        "https://www.instagram.com/blickfang.nagelstudio/",
        "https://wa.me/436644523026"
    ]
};

export const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "blickfang Nagelstudio",
    "image": "https://blickfang-nagelstudio.at/og-image.jpg",
    "@id": "https://blickfang-nagelstudio.at",
    "url": "https://blickfang-nagelstudio.at",
    "telephone": "+436644523026",
    "priceRange": "€€",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "Am Kirchpl. 7",
        "addressLocality": "St. Veit am Vogau",
        "postalCode": "8423",
        "addressRegion": "Steiermark",
        "addressCountry": "AT"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": 46.7333,
        "longitude": 15.6167
    },
    "openingHoursSpecification": [
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
        }
    ]
};

export const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Adriana",
    "jobTitle": "Nageldesignerin & Nail Trainerin",
    "worksFor": {
        "@type": "Organization",
        "name": "blickfang Nagelstudio"
    },
    "description": "Erfahrene Nageldesignerin seit 2010 mit eigener Nail Academy in St. Veit am Vogau",
    "url": "https://blickfang-nagelstudio.at/#about",
    "knowsAbout": [
        "Nageldesign",
        "Russian Manicure",
        "Gel-Nägel",
        "Nail Art",
        "Nagelmodellage"
    ]
};

interface CourseData {
    name: string;
    description: string;
    price: number | string;
    duration: string;
    slug: string;
}

export const courseSchema = (course: CourseData) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    "name": course.name,
    "description": course.description,
    "provider": {
        "@type": "Organization",
        "name": "blickfang Nagelstudio",
        "sameAs": "https://blickfang-nagelstudio.at"
    },
    "offers": {
        "@type": "Offer",
        "price": course.price.toString(),
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock",
        "url": `https://blickfang-nagelstudio.at/course/${course.slug}`,
        "validFrom": "2025-01-01"
    },
    "courseCode": course.slug,
    "educationalLevel": "Beginner to Advanced",
    "inLanguage": "de",
    "timeRequired": course.duration,
    "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": "Onsite",
        "location": {
            "@type": "Place",
            "name": "blickfang Nagelstudio",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Am Kirchpl. 7",
                "addressLocality": "St. Veit am Vogau",
                "postalCode": "8423",
                "addressCountry": "AT"
            }
        },
        "instructor": {
            "@type": "Person",
            "name": "Adriana"
        }
    }
});

export const breadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
    }))
});

export const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "blickfang Nagelstudio",
    "url": "https://blickfang-nagelstudio.at",
    "potentialAction": {
        "@type": "SearchAction",
        "target": "https://blickfang-nagelstudio.at/?s={search_term_string}",
        "query-input": "required name=search_term_string"
    }
};

// Aggregate Schema für Homepage
export const aggregateSchema = {
    "@context": "https://schema.org",
    "@graph": [
        organizationSchema,
        localBusinessSchema,
        personSchema,
        websiteSchema
    ]
};

// Kurs-Daten (können später in separate Datei verschoben werden)
export const courses = {
    gelNails: {
        name: "Gel-Nägel Grundkurs",
        description: "Professioneller Grundkurs für Gel-Nägel. Lerne die Basics der Nagelmodellage mit Gel von Grund auf.",
        price: 450,
        duration: "P2D",
        slug: "gel-nails-grundkurs"
    },
    russianManicure: {
        name: "Russian Manicure Kurs",
        description: "Professioneller Kurs für Russian Manicure Technik. Lerne die präzise Nagelhautbearbeitung und perfekte Maniküre.",
        price: 350,
        duration: "P1D",
        slug: "russian-manicure"
    },
    fastTips: {
        name: "Fast Tips & Dual Tips Kurs",
        description: "Lerne die moderne Fast Tips und Dual Tips Technik für schnelle und professionelle Nagelmodellage.",
        price: 300,
        duration: "P1D",
        slug: "fast-tips-dual-tips"
    },
    individual: {
        name: "Individual Perfection Kurs",
        description: "Individueller Perfektionskurs für fortgeschrittene Nageldesignerinnen. Persönliches Training nach deinen Bedürfnissen.",
        price: 400,
        duration: "P1D",
        slug: "individual-perfection-course"
    }
};