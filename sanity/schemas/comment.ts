export const CommentSchema = {
    name: 'comment',
    title: 'Comment',
    type: 'document',
    fields: [
        {
            name: 'postedBy',
            title: 'Posted By',
            type:'postedBy',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'commentText',
            title: 'Comment Text',
            type:'string',
        },
        {
            name: 'parentPost',
            title: "Parent Post",
            type: 'reference',
            to: [{type: 'post'}],
            validation: (Rule: any) => Rule.required(),
        }
    ]
}