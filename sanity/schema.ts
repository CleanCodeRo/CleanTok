import { type SchemaTypeDefinition } from 'sanity';

import { PostSchema } from './schemas/post';
import { UserSchema } from './schemas/user';
import { CommentSchema } from './schemas/comment';
import { PostedBySchema } from './schemas/postedBy';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    PostSchema,
    UserSchema,
    CommentSchema,
    PostedBySchema,
  ],
}
