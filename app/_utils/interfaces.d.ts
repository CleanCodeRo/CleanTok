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
    comments: {
        comment: string;
        _key: string;
        postedBy: {
            _ref: string;
        };
    }[];
    userId: string;
}
