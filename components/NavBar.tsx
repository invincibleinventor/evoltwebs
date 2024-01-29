"use client";
import Headeritem from "@/components/HeaderItem";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function App$() {
  const loc = usePathname();
  return (
    <div className="mb-auto lg:w-[400px]">
      <div className={`  flex w-max flex-col items-start p-0 md:pr-0 ${loc.startsWith("/post/") ? "md:flex" : ""}`}>
        <Link className="flex flex-row mt-1" href="/">
          <svg
            className="ml-[8px] mr-2 mt-[2px] h-[51px] w-[51px] cursor-pointer rounded-full p-[10px] text-black transition-all  duration-100 ease-linear hover:bg-gray-400 md:ml-[4px] md:mr-0"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <circle
              cx="12"
              cy="12"
              r="9"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </svg>
        </Link>
        <div className="flex flex-col space-y-3 py-4 pt-[14px] md:mt-7 md:space-y-[4px] md:bg-neutral-100 md:px-4 md:pt-[4px]">
          <Headeritem
            link="/"
            url={
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="m8.36 1.37l6.36 5.8l-.71.71L13 6.964v6.526l-.5.5h-3l-.5-.5v-3.5H7v3.5l-.5.5h-3l-.5-.5V6.972L2 7.88l-.71-.71l6.35-5.8zM4 6.063v6.927h2v-3.5l.5-.5h3l.5.5v3.5h2V6.057L8 2.43z"
                clipRule="evenodd"
              />
            }
            name="Home"
          ></Headeritem>
          <Headeritem
            link="/explore"
            url={
              <path
                fill="currentColor"
                d="M4.38 5h1V4h1V3h-1V2h-1v1h-1v1h1zm8 4h-1v1h-1v1h1v1h1v-1h1v-1h-1zM14 2V1h-1v1h-1v1h1v1h1V3h1V2zm-2.947 2.442a1.49 1.49 0 0 0-2.12 0l-7.49 7.49a1.49 1.49 0 0 0 0 2.12c.59.59 1.54.59 2.12 0l7.49-7.49c.58-.58.58-1.53 0-2.12m-8.2 8.9c-.2.2-.51.2-.71 0c-.2-.2-.2-.51 0-.71l6.46-6.46l.71.71zm7.49-7.49l-.32.32l-.71-.71l.32-.32c.2-.2.51-.2.71 0c.19.2.19.52 0 .71"
              />
            }
            name="Explore"
          ></Headeritem>
          <Headeritem
            link="/notifications"
            url={
              <path
                fill="currentColor"
                d="M13.377 10.573a7.63 7.63 0 0 1-.383-2.38V6.195a5.115 5.115 0 0 0-1.268-3.446a5.138 5.138 0 0 0-3.242-1.722c-.694-.072-1.4 0-2.07.227c-.67.215-1.28.574-1.794 1.053a4.923 4.923 0 0 0-1.208 1.675a5.067 5.067 0 0 0-.431 2.022v2.2a7.61 7.61 0 0 1-.383 2.37L2 12.343l.479.658h3.505c0 .526.215 1.04.586 1.412c.37.37.885.586 1.412.586c.526 0 1.04-.215 1.411-.586s.587-.886.587-1.412h3.505l.478-.658zm-4.69 3.147a.997.997 0 0 1-.705.299a.997.997 0 0 1-.706-.3a.997.997 0 0 1-.3-.705h1.999a.939.939 0 0 1-.287.706zm-5.515-1.71l.371-1.114a8.633 8.633 0 0 0 .443-2.691V6.004c0-.563.12-1.113.347-1.616c.227-.514.55-.969.969-1.34c.419-.382.91-.67 1.436-.837c.538-.18 1.1-.24 1.65-.18a4.147 4.147 0 0 1 2.597 1.4a4.133 4.133 0 0 1 1.004 2.776v2.01c0 .909.144 1.818.443 2.691l.371 1.113h-9.63v-.012z"
              />
            }
            name="Notifications"
          ></Headeritem>
          <Headeritem
            link="/messages"
            url={
              <path
                fill="currentColor"
                d="M14.5 2h-13l-.5.5v9l.5.5H4v2.5l.854.354L7.707 12H14.5l.5-.5v-9zm-.5 9H7.5l-.354.146L5 13.293V11.5l-.5-.5H2V3h12z"
              />
            }
            name="Messages"
          ></Headeritem>
          <Headeritem
            link="/bookmarks"
            url={
              <path
                fill="currentColor"
                d="M12.5 1h-9l-.5.5v13l.872.335L8 10.247l4.128 4.588L13 14.5v-13zM12 13.2L8.372 9.165h-.744L4 13.2V2h8z"
              />
            }
            name="Bookmarks"
          ></Headeritem>
          <Headeritem
            link="/myself"
            url={
              <path
                fill="currentColor"
                d="M16 7.992C16 3.58 12.416 0 8 0S0 3.58 0 7.992c0 2.43 1.104 4.62 2.832 6.09c.016.016.032.016.032.032c.144.112.288.224.448.336c.08.048.144.111.224.175A7.98 7.98 0 0 0 8.016 16a7.98 7.98 0 0 0 4.48-1.375c.08-.048.144-.111.224-.16c.144-.111.304-.223.448-.335c.016-.016.032-.016.032-.032c1.696-1.487 2.8-3.676 2.8-6.106m-8 7.001c-1.504 0-2.88-.48-4.016-1.279c.016-.128.048-.255.08-.383a4.17 4.17 0 0 1 .416-.991c.176-.304.384-.576.64-.816c.24-.24.528-.463.816-.639c.304-.176.624-.304.976-.4A4.15 4.15 0 0 1 8 10.342a4.185 4.185 0 0 1 2.928 1.166c.368.368.656.8.864 1.295c.112.288.192.592.24.911A7.03 7.03 0 0 1 8 14.993m-2.448-7.4a2.49 2.49 0 0 1-.208-1.024c0-.351.064-.703.208-1.023c.144-.32.336-.607.576-.847c.24-.24.528-.431.848-.575c.32-.144.672-.208 1.024-.208c.368 0 .704.064 1.024.208c.32.144.608.336.848.575c.24.24.432.528.576.847c.144.32.208.672.208 1.023c0 .368-.064.704-.208 1.023a2.84 2.84 0 0 1-.576.848a2.84 2.84 0 0 1-.848.575a2.715 2.715 0 0 1-2.064 0a2.84 2.84 0 0 1-.848-.575a2.526 2.526 0 0 1-.56-.848zm7.424 5.306c0-.032-.016-.048-.016-.08a5.22 5.22 0 0 0-.688-1.406a4.883 4.883 0 0 0-1.088-1.135a5.207 5.207 0 0 0-1.04-.608a2.82 2.82 0 0 0 .464-.383a4.2 4.2 0 0 0 .624-.784a3.624 3.624 0 0 0 .528-1.934a3.71 3.71 0 0 0-.288-1.47a3.799 3.799 0 0 0-.816-1.199a3.845 3.845 0 0 0-1.2-.8a3.72 3.72 0 0 0-1.472-.287a3.72 3.72 0 0 0-1.472.288a3.631 3.631 0 0 0-1.2.815a3.84 3.84 0 0 0-.8 1.199a3.71 3.71 0 0 0-.288 1.47c0 .352.048.688.144 1.007c.096.336.224.64.4.927c.16.288.384.544.624.784c.144.144.304.271.48.383a5.12 5.12 0 0 0-1.04.624c-.416.32-.784.703-1.088 1.119a4.999 4.999 0 0 0-.688 1.406c-.016.032-.016.064-.016.08C1.776 11.636.992 9.91.992 7.992C.992 4.14 4.144.991 8 .991s7.008 3.149 7.008 7.001a6.96 6.96 0 0 1-2.032 4.907"
              />
            }
            name="Profile"
          ></Headeritem>
          <Headeritem
            link="/more"
            url={
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3.5 2h-1v5h1zm6.1 5H6.4L6 6.45v-1L6.4 5h3.2l.4.5v1zm-5 3H1.4L1 9.5v-1l.4-.5h3.2l.4.5v1zm3.9-8h-1v2h1zm-1 6h1v6h-1zm-4 3h-1v3h1zm7.9 0h3.19l.4-.5v-.95l-.4-.5H11.4l-.4.5v.95zm2.1-9h-1v6h1zm-1 10h1v2h-1z"
                clipRule="evenodd"
              />
            }
            name="More"
          ></Headeritem>
          <Link href="/create" className="pt-5">
            <div className="mx-auto flex h-[52px]  w-[52px] cursor-pointer  flex-row content-center items-center bg-black p-3 transition-all duration-100 ease-linear hover:bg-black md:mr-auto md:h-[44px] md:w-[calc(180px)] md:py-[14px]">
              <span className={`mx-auto hidden pt-[0px] text-center text-xs font-medium  text-white md:inline-block`}>
                New Post
              </span>
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="m-auto h-[22px] w-[22px] text-white md:hidden"
                style={{ fill: "white" }}
              >
                <g>
                  <path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z"></path>
                </g>
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
