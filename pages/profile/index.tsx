import { useSession } from "next-auth/react";

function ProfileIndex() {
  const { data: session } = useSession();

  return (
    <>
      <section className="min-h-screen bg-gray-50 flex">
        <div className="flex flex-col py-10 px-8">
          <h2 className="mb-2 text-3xl font-extrabold leading-tight text-gray-900">Welcome {session?.user?.name}</h2>
          <p className="mb-20 text-lg text-gray-500">Comes directly from the desk of engineers, creators and managers at Skcript.</p>
        </div>
      </section>
    </>
  )
}

ProfileIndex.layout = "Profile"

export default ProfileIndex