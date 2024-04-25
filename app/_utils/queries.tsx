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
        "relatedComments": *[_type == "comment" && references(^._id)]{
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
      "relatedComments": *[_type == "comment" && references(^._id)]{
        _id,
        _createdAt,
        commentText,
        postedBy->{
          _id,
          userName,
          profileImage
        }
      },
      likes,
      topic
    }`;

    return query;
};
