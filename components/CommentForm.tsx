import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Post } from '../typings'

interface FormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

interface Props {
  post: Post;
  setSubmitted: Function;
}

interface PostProps {
  post: Post;
}

function CommentForm(props: Props) {
  const post: PostProps = props;
  const { setSubmitted } = props;
  const { register, handleSubmit, formState: { errors } } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data)
    }).then(() => {
      setSubmitted(true);
    }).catch((error) => {
      setSubmitted(false);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col p-5 max-w-2xl mx-auto mb-10'>
      <h3 className='text-sm text-yellow-500'>Enjoyed this article?</h3>
      <h4 className='text-3xl font-bold'>Leave a comment below!</h4>
      <hr className='py-3 mt-2' />

      <input
        // pulls the data from de form in a easy way
        {...register("_id")}
        type="hidden"
        name="_id"
        value={post.post._id}
      />

      <label className='block mb-5'>
        <span className='text-gray-700'>Name</span>
        <input
          {...register("name", { required: true })}
          className='shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring'
          placeholder='Name'
          type="text"
        />
      </label>
      <label className='block mb-5'>
        <span className='text-gray-700'>Email</span>
        <input
          {...register("email", { required: true })}
          className='shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring'
          placeholder='Email'
          type="email"
        />
      </label>
      <label className='block mb-5'>
        <span className='text-gray-700'>Comment</span>
        <textarea
          {...register("comment", { required: true })}
          className='shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-yellow-500 outline-none focus:ring'
          placeholder='Be kind'
          rows={8}
        />
      </label>

      <div className='flex flex-col p-5'>
        {errors.name && (
          <span className='text-red-500'>- The Name Field is Required</span>
        )}
        {errors.comment && (
          <span className='text-red-500'>- The Comment Field is Required</span>
        )}
        {errors.email && (
          <span className='text-red-500'>- The Email Field is Required</span>
        )}
      </div>

      <input className='shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer' type="submit" />
    </form>
  )
}

export default CommentForm