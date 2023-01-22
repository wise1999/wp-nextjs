function ProfileArticles() {
  return (
    <>
      <section className="min-h-screen bg-gray-50 flex">
        <div className="flex flex-col py-10 px-8">
          <h2 className="mb-2 text-3xl font-extrabold leading-tight text-gray-900">Your Articles</h2>
          <p className="mb-20 text-lg text-gray-500">Comes directly from the desk of engineers, creators and managers at Skcript.</p>
        </div>
      </section>
    </>
  )
}

ProfileArticles.layout = "Profile"

export default ProfileArticles