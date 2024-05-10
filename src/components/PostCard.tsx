import { Link } from "react-router-dom"
import service from "../services/configure"

interface PostCardProps {
    $id: number;
    title: string;
    featuredImage: string;
}

const PostCard = ( post : PostCardProps) => {
  return (
    <Link to={`/post/${post.$id}`}>
        <div className="w-full p-4 bg-gray-100 rounded-xl">
            <div className="justify-center w-full mb-4">
                <img src={service.getFilePreview(post.featuredImage)} alt={post.title}
                className="rounded-xl"
                />
                Image
            </div>
            <h2
            className="text-xl font-bold"
            >{post.title}</h2>
        </div>
    </Link>
  )
}

export default PostCard