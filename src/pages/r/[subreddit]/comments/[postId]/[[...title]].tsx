import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

import Comments from "../../../../../components/Comments";
import Frame from "../../../../../components/Frame";
import Post from "../../../../../components/Post";
import { redditApi } from "../../../../../lib/reddit/redditApi";
import { withSessionSsr } from "../../../../../lib/session/withSession";

export const getServerSideProps: GetServerSideProps = withSessionSsr(
    async (context) => {
        const { req } = context;

        const subreddit = context.query["subreddit"];
        const postId = context.query["postId"];

        const path = `/r/${subreddit}/comments/${postId}`;

        const postsResponse = await redditApi(req, {
            method: "GET",
            path: path,
        });
        return {
            props: {
                initialPost: postsResponse.data[0].data.children[0],
                initialComments: postsResponse.data[1],
            },
        };
    }
);

type Props = {
    initialPost: any;
    initialComments: any;
};

const CommentsPage: FC<Props> = ({ initialPost, initialComments }) => {
    const router = useRouter();
    const [post, setPost] = useState<any>(initialPost);
    const [comments, setComments] = useState<any>(initialComments);

    useEffect(() => {
        async () => {
            const subreddit = router.query["subreddit"];
            const postId = router.query["postId"];
            const path = `/r/${subreddit}/comments/${postId}`;

            const postsResponse = await axios.post("/api/reddit", {
                method: "GET",
                path: path,
            });

            setPost(postsResponse.data[0].data.children[0]);
            setComments(postsResponse.data[1]);
        };
    }, [router.query]);

    return (
        <Frame>
            <Post post={post} />
            <Comments initialComments={comments} />
        </Frame>
    );
};

export default CommentsPage;
