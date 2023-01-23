import Link from "next/link"

function ProfileArticles() {
  return (
    <>
      <section className="min-h-screen bg-gray-50 flex w-full">
        <div className="flex flex-col py-10 px-8 w-full">
          <div className="flex items-center justify-between">
            <h2 className="mb-2 text-3xl font-extrabold leading-tight text-gray-900">Your Articles</h2>
            <Link href="/profile/articles/new" className="btn btn-primary">Add New</Link>
          </div>
        </div>
      </section>
    </>
  )
}

ProfileArticles.layout = "Profile"

export default ProfileArticles