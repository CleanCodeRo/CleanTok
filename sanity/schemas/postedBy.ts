export const PostedBySchema = {
    name: 'postedBy',
    title: 'Posted By',
    type: 'reference',
    to: [{type: 'user'}]
}