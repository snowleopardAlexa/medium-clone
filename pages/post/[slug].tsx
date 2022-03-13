import { GetStaticProps } from "next"
import Header from "../../components/Header"
import { sanityClient, urlFor } from "../../sanity"
import { Post } from "../../typings"
import PortableText from "react-portable-text"

interface Props {
  post: Post;
}

const Post = ({ post } : Props ) => {
  return (
    <main>
      <Header />
      <img 
       className="w-full h-40 object-cover"
       src={urlFor(post.mainImage).url()!}
       alt="post-image-cover"
      />
      <article className="max-w-3xl mx-auto p-5">
       <h1 className="text-3xl mt-10 mb-3">{post.title}</h1>
       <h2 className="text-xl font-light text-gray-500 mb-2">
           {post.description}
       </h2>
       <div className="flex items-center space-x-2">
           <img
             className="h-10 w-10 rounded-full" 
             src={urlFor(post.author.image).url()!}
             alt="author-image"
           />
           <p className="font-extralight text-sm">Blog post by  
            <span className="text-green-600"> {post.author.name} </span>
           - Published at {new Date(post._createdAt).toLocaleString()}
           </p>
       </div>
       <div className="mt-10">
           <PortableText 
             className=""
             dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
             projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
             content={post.body}
             serializers={{
                 h1: (props: any) => (
                     <h1 className="text-2xl font-bold my-5" {...props} />
                 ),
                 h2: (props: any) => (
                     <li className="ml-4 list-disc my-5" {...props} />
                 ),
                 li: ({ children }: any) => (
                    <li className="ml-4 list-disc">{children}</li>
                 ),
                 link: ({ href, children }: any) => (
                     <a href={href} className="text-blue-500 hover:underline">
                         {children}
                     </a>
                 )
             }}
           />
       </div>
      </article>
      <hr className="max-w-lg my-5 mx-auto border border-yellow-500" />
      
      <form className="flex flex-col p-5 my-10 max-w-2xl mx-auto mb-10">
          <h3 className="text-sm text-yellow-500">Enjoyed this article?</h3>
          <h4 className="text-3xl font-bold">Leave a commment below!</h4>
          <hr className="py-3 mt-2" />
          <label className="block mb-5">
              <span className="text-grey-700">Name</span>
              <input className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500" placeholder="Name" type="text" />
          </label>
          <label className="block mb-5">
              <span>Email</span>
              <input className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500" placeholder="Email" type="text" />
          </label>
          <label className="block mb-5">
              <span>Comment</span>
              <textarea className="shadow border rounded py-2 px-3 form-textarea mr-1 w-full ring-yellow-500 outline-none focus:ring" placeholder="Type a comment..." rows={8} />
          </label>
      </form>
    </main>
  )
}

export default Post

export const getStaticPaths = async() => {
  const query = 
  ` *[_type == "post"]{
    _id,
    slug  {
    current
   }
  }`

  const posts = await sanityClient.fetch(query)

  const paths = posts.map((post: Post) => ({
      params: {
          slug: post.slug.current
      }
  }))

  return {
      paths,
      fallback: 'blocking',
  }
}

// get the post from sanity
export const getStaticProps: GetStaticProps = async({ params }) => {
  const query = 
  `
    *[_type == "post" && slug.current == $slug][0] {
        _id,
        _createdAt,
        title,
        author-> {
            name,
            image
        },
        'comments': *[
            _type == "comment" &&
            post._ref == ^._id &&
            approved == true],
        description,
        mainImage,
        slug,
        body
    }`
  

   const post = await sanityClient.fetch(query, {
       slug: params?.slug,
   })

   // no post to come back from fetch
   if (!post) {
       return {
           notFound: true
       }
   }

   return {
       props: {
           post,
       },
       revalidate: 60, // after 60 sec revalidates/updates the old cached version
   }
}

