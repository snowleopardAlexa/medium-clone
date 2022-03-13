import Head from 'next/head'
import Header from "../components/Header"
import Image from "next/image"

const Home = () => {
  return (
    <div className=" max-w-7xl mx-auto">
      <Head>
        <title>Medium Clone</title>
      </Head>

     <Header />
     <div className="flex justify-between items-center bg-yellow-400 border-y border-black py-10">
       <div className="px-10 space-y-5">
         <h1 className="text-6xl max-w-xl font-serif">
           <span className="underline decoration-black decoration-4">Medium</span>{" "}
           is a place to write, read, and connect</h1>
         <h2>It's easy and free to post your thinking on any topic and connect
           with millions of readers. 
         </h2>
       </div>
       <Image 
         className="hidden md:inline-flex h-32 lg:h-full"
         src="/medium-letter.png"
         alt="medium-logo"
         width="270px"
         height="200px"
       />
     </div>
    </div>
  )
}

export default Home
