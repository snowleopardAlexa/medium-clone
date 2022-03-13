import Head from 'next/head'

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Medium Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Medium Clone</h1>
    </div>
  )
}

export default Home
