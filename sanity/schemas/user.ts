export const UserSchema = {
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
        {
            name: 'userName',
            title: 'User Name',
            type:'string',
        },
        {
            name: 'profileImage',
            title: 'Profile Image',
            type:'string',
        }
    ]
}