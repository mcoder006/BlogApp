import { useCallback, useEffect, useReducer } from "react";
import { EventType, useForm } from "react-hook-form";
import { Select } from "../index.ts";
import service from "../../services/configure";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import RTE from "../RTE.tsx";

interface PostProps {
  $id: number;
  title: string;
  slug: string;
  content: string;
  status: string;
  featuredImage?: string;
}

interface RootState {
  auth: {
    status: boolean;
    userData: null | string;
  };
}

const PostForm = (post: PostProps) => {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();

  const userData = useSelector((state: RootState) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0] ? service.uploadFile : null;

      if (file) {
        service.deleteFile(post.featuredImage);
      }

      const dbPost = await service.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      } else {
        const file = data.image[0]
          ? await service.uploadFile(data.image[0])
          : null;

        if (file) {
          const fileId = file.$id;
          data.featuredImage = fileId;
          await service.createPost({
            ...data,
            userId: userData.$id,
          });

          if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
          }
        }
      }
    }
  };

  const slugTransform = useCallback((value: string) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }

    return '';
  }, []);

  useEffect(() => {
    const subscription = watch((value, {name}) => {
      if(name === 'title') {
        setValue('slug', slugTransform(value.title, { validate: true}));
      }
    });

    return () => {
      subscription.unsubscribe();
    }
  }, [watch, slugTransform, setValue])

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <label>
          Title :
          <input
            type="text"
            placeholder="Title"
            className="mb-4"
            {...register("title", {
              required: true,
            })}
          />
        </label>

        <label>
          Slug :{" "}
          <input
            type="text"
            placeholder="Slug"
            className={`p-2 outline-none border-none text-black rounded mb-2`}
            {...register("slug", {
              required: true,
            })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.target.value), {
                shouldValidate: true,
              });
            }}
          />
        </label>
        <RTE
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />

        <div className="w-1/3 px-2">
          <input
            className={`mb-2 p-2 outline-none border-none text-black rounded`}
            accept="image/png, image/jpg, image/jpeg, image/gif"
            type="file"
            {...register("image", { required: !post })}
          />

          {post && (
            <div className="w-full mb-4">
              <img
                src={service.getFilePreview(post.featuredImage)}
                alt={post.title}
              />
            </div>
          )}

          <Select
            props=""
            label="status"
            options={["active", "inactive"]}
            className="mb-4"
            {...register("status", { required: true })}
          />
          <button className="w-full px-3 py-2 text-white bg-green-500 rounded">
            {post ? "Update" : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PostForm;
