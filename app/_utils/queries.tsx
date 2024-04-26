export const allPostsQuery = () => {
    const query = `*[_type == "post"] | order(_createdAt desc){
        _id,
        caption,
         video{
          asset->{
            _id,
            url
          }
        },
        userId,
        postedBy->{
          _id,
          userName,
          profileImage
        },
        "relatedComments": *[_type == "comment" && references(^._id)] | order(_createdAt asc){
          _id,
          _createdAt,
          commentText,
          postedBy->{
            _id,
            userName,
            profileImage
          }
        },
        likes
    }`;

    return query;
};

export const postDetailQuery = (postId: string | string[]) => {
    const query = `*[_type == "post" && _id == '${postId}']{
      _id,
      caption,
      video{
        asset->{
          _id,
          url
        }
      },
      userId,
      postedBy->{
        _id,
        userName,
        profileImage
      },
      "relatedComments": *[_type == "comment" && references(^._id)] | order(_createdAt asc){
        _id,
        _createdAt,
        commentText,
        postedBy->{
          _id,
          userName,
          profileImage
        },
        parentPost
      },
      likes,
      topic
    }`;

    return query;
};

// Comments

export const allCommentsQuery = () => {
    const query = `*[_type == "comment"] | order(_createdAt desc){
      _id,
      _createdAt,
      commentText,
      postedBy->{
        _id,
        userName,
        profileImage
      },
      parentPost
    }`;

    return query;
};

export const commentQuery = (commentId: string | string[]) => {
    const query = `*[_type == "comment" && _id == '${commentId}']{
      _id,
      _createdAt,
      commentText,
      postedBy->{
        _id,
        userName,
        profileImage
      },
      parentPost
    }`;

    return query;
};
