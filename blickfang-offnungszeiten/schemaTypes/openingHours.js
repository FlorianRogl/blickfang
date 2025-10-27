export default {
    name: 'openingHours',
    title: 'Öffnungszeiten',
    type: 'document',
    fields: [
        {
            name: 'day',
            title: 'Tag',
            type: 'string',
            options: {
                list: [
                    { title: 'Montag', value: 'Montag' },
                    { title: 'Dienstag', value: 'Dienstag' },
                    { title: 'Mittwoch', value: 'Mittwoch' },
                    { title: 'Donnerstag', value: 'Donnerstag' },
                    { title: 'Freitag', value: 'Freitag' },
                    { title: 'Samstag', value: 'Samstag' },
                    { title: 'Sonntag', value: 'Sonntag' }
                ]
            },
            validation: Rule => Rule.required()
        },
        {
            name: 'hours',
            title: 'Öffnungszeiten',
            type: 'string',
            description: 'z.B. "09:00 - 18:00" oder "Geschlossen"',
            validation: Rule => Rule.required()
        },
        {
            name: 'isOpen',
            title: 'Geöffnet',
            type: 'boolean',
            initialValue: true
        },
        {
            name: 'order',
            title: 'Reihenfolge',
            type: 'number',
            initialValue: 0
        }
    ],
    orderings: [
        {
            title: 'Reihenfolge',
            name: 'orderAsc',
            by: [{ field: 'order', direction: 'asc' }]
        }
    ],
    preview: {
        select: {
            title: 'day',
            subtitle: 'hours'
        }
    }
}