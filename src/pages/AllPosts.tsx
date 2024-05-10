import { useEffect, useState } from "react";
import { Container } from "../components";
import PostCard from "../components/PostCard";
import service from "../services/configure";

const AllPosts = () => {

    const [post, serPosts] = useState([]);

    useEffect(() => {
        service.getAllPosts([]).then(posts => {
            if(posts) {
                serPosts(posts);
            }
        });
    }, [])
  return <div>
    <Container>
        {
            post.map((posts) => (<PostCard post={post} />))
        }
    </Container>
  </div>;
};

export default AllPosts;
