import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../services/configure";
import { Container } from "postcss";
import { PostForm } from '../components/index'


const EditPost = () => {

    const [post, setPosts] = useState<null | any | string>(null);

    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(slug) {
            service.getPost(slug)
            .then((post) => {
                if(post) {
                    setPosts(post);
                }
                else {
                    navigate('/');
                }
            })
        }
    }, [slug, navigate])
  return post ? (
    <div>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null;
}

export default EditPost
