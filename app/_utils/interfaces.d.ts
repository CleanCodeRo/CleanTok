export interface Video {
    _id: string;
    caption: string;
    video: {
        asset: {
            _id: string;
            url: string;
        };
    };
    postedBy: {
        _id: string;
        userName: string;
        profileImage: string;
    };
    likes: {
        postedBy: {
            _id: string;
            userName: string;
            profileImage: string;
        };
    }[];
    relatedComments: IComment[];
    userId: string;
}

export interface IComment {
    _id: string;
    _createdAt: string;
    postedBy: {
        _id: string;
        _ref: string;
        userName: string;
        profileImage: string;
    };
    commentText: string;
    parentPost: any;
}

export interface IUser {
    _id: string;
    _type: string;
    userName: string;
    profileImage: string;
  }