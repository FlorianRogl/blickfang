export default {
    name: 'course',
    title: 'Kurse',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Kurstitel',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'subtitle',
            title: 'Untertitel',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'slug',
            title: 'URL Slug',
            type: 'slug',
            description: 'z.B. "gel-nails-grundkurs"',
            options: {
                source: 'title',
                maxLength: 96
            },
            validation: Rule => Rule.required()
        },
        {
            name: 'image',
            title: 'Hero Bild',
            type: 'image',
            options: {
                hotspot: true
            },
            validation: Rule => Rule.required()
        },
        {
            name: 'duration',
            title: 'Kursdauer',
            type: 'string',
            description: 'z.B. "45 Stunden" oder "1 Tag"',
            validation: Rule => Rule.required()
        },
        {
            name: 'nextDate',
            title: 'Nächster Termin',
            type: 'string',
            description: 'Optional, z.B. "15. Januar 2025" oder leer lassen für "auf Anfrage"'
        },
        {
            name: 'participants',
            title: 'Teilnehmerzahl',
            type: 'string',
            description: 'z.B. "Max. 3 Personen"',
            validation: Rule => Rule.required()
        },
        {
            name: 'level',
            title: 'Level',
            type: 'string',
            description: 'z.B. "Anfänger und Fortgeschrittene"',
            validation: Rule => Rule.required()
        },
        {
            name: 'price',
            title: 'Preis (Anzeige)',
            type: 'string',
            description: 'z.B. "ab 1.269€" oder "auf Anfrage"',
            validation: Rule => Rule.required()
        },
        {
            name: 'description',
            title: 'Hauptbeschreibung',
            type: 'text',
            rows: 4,
            validation: Rule => Rule.required()
        },
        {
            name: 'short_description',
            title: 'Kurzbeschreibung / Zitat',
            type: 'text',
            rows: 3,
            validation: Rule => Rule.required()
        },
        {
            name: 'goal_description',
            title: 'Zielbeschreibung',
            type: 'text',
            rows: 3,
            description: 'Optional, für spezielle Kurse wie 1:1'
        },
        {
            name: 'courseType',
            title: 'Kurs-Typ',
            type: 'string',
            options: {
                list: [
                    { title: 'Basiskurs (mit Modulen)', value: 'basic' },
                    { title: 'Tageskurs (einfache Liste)', value: 'daily' },
                    { title: 'Individual (mit Modulen)', value: 'individual' }
                ]
            },
            validation: Rule => Rule.required()
        },
        {
            name: 'modules',
            title: 'Kursmodule',
            type: 'array',
            description: 'Für Basiskurs und Individual-Kurs',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'title',
                            title: 'Modul-Titel',
                            type: 'string'
                        },
                        {
                            name: 'items',
                            title: 'Inhalte',
                            type: 'array',
                            of: [{ type: 'string' }]
                        }
                    ]
                }
            ],
            hidden: ({ document }) => document?.courseType === 'daily'
        },
        {
            name: 'contentList',
            title: 'Kursinhalte (einfache Liste)',
            type: 'array',
            description: 'Für Tageskurse',
            of: [{ type: 'string' }],
            hidden: ({ document }) => document?.courseType !== 'daily'
        },
        {
            name: 'pricingVariants',
            title: 'Preisvarianten',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'name',
                            title: 'Varianten-Name',
                            type: 'string',
                            description: 'z.B. "Basic", "Premium"'
                        },
                        {
                            name: 'price',
                            title: 'Preis',
                            type: 'string',
                            description: 'z.B. "1.269 €"'
                        },
                        {
                            name: 'description',
                            title: 'Zusatzbeschreibung',
                            type: 'string',
                            description: 'Optional, z.B. "Mit Starter-Set"'
                        },
                        {
                            name: 'features',
                            title: 'Features',
                            type: 'array',
                            of: [{ type: 'string' }]
                        },
                        {
                            name: 'isPopular',
                            title: 'Beliebte Wahl',
                            type: 'boolean',
                            initialValue: false
                        }
                    ]
                }
            ]
        },
        {
            name: 'featured',
            title: 'Featured (hervorgehoben)',
            type: 'boolean',
            description: 'Wird groß auf der Kurs-Übersicht angezeigt',
            initialValue: false
        },
        {
            name: 'order',
            title: 'Reihenfolge',
            type: 'number',
            initialValue: 0
        },
        {
            name: 'features',
            title: 'Kurs-Highlights (für Übersicht)',
            type: 'array',
            description: 'Kurze Liste für die Kursübersicht',
            of: [{ type: 'string' }],
            validation: Rule => Rule.max(5)
        }
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'subtitle'
        }
    }
}