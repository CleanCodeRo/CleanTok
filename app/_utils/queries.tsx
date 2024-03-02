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
      likes,
      comments[]{
        comment,
        _key,
        postedBy->{
        _id,
        userName,
        profileImage
      },
      }
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
      likes,
      comments[]{
        comment,
        _key,
        postedBy->{
          _id,
          _ref,
        },
      }
    }`;

    return query;
};
