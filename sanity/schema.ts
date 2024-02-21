import { type SchemaTypeDefinition } from 'sanity';

import { PostSchema } from './post';
import { UserSchema } from './user';
import { CommentSchema } from './comment';
import { PostedBySchema } from './postedBy';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    PostSchema,
    UserSchema,
    CommentSchema,
    PostedBySchema,
  ],
}
