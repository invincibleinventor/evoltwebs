import Link from "next/link";

export default function Error({}) {
  return (
    <div className="flex h-screen w-full content-center items-center px-10 sm:px-24 md:px-16 lg:px-24">
      <div className="mx-auto flex max-w-max flex-col gap-2">
        <h1 className="mx-auto text-center text-lg font-semibold text-black">That Content Doesn&apos;t Exist</h1>
        <h1 className="mx-auto text-center text-sm text-gray-800">
          That page does not exist. It must have been moved or deleted. Please refresh if you think that is not the case
        </h1>
        <Link
          href="/"
          className={`mx-auto mt-3  w-max px-8 py-3 text-xs font-bold ${
            1 == 1 ? "bg-black text-white" : "bg-white text-white"
          }`}
        >
          Return Back
        </Link>
      </div>
    </div>
  );
}
