import service from "../services/configure";
import {Container, PostForm, PostCard} from '../components/index'
import { useEffect, useState } from "react";

export const Home = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        service.getAllPosts().then((post) => {
            if(post) {
                setPosts(post.documents)
            }
        })
    }, [])

    if(posts.length === 0) {
        return <Container>
            Login To Read Posts
        </Container>;
    }

    return (
        <div className="w-full py-8">
            <Container>
                {
                    posts.map((post) => {
                        return <div className="flex flex-wrap">
                            <PostCard post={post} />
                        </div>
                    })
                }
            </Container>
        </div>
    )
}
