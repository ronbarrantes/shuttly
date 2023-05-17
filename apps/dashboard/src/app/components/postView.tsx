// import type { RouterOutputs } from "@/utils/api";
// import dayjs from "dayjs";
// import Image from "next/image";
// import Link from "next/link";
// import relativeTime from "dayjs/plugin/relativeTime";

// dayjs.extend(relativeTime);

// type PostWithUser = RouterOutputs["posts"]["getAll"][0];
// export const PostView = (props: PostWithUser) => {
//   const { post, author } = props;
//   return (
//     <div className="flex items-center gap-3 border-b border-slate-400 p-4">
//       <Image
//         src={author.profileImageUrl}
//         alt={`@${author.username}'s profile image`}
//         className="h-14 w-14 rounded-full"
//         width={56}
//         height={56}
//       />
//       <div className="flex flex-col">
//         <div className="flex gap-2 text-slate-300">
//           <Link href={`/@${author.username}`}>
//             <span>{`@${author.username}`}</span> ·{" "}
//           </Link>
//           <Link href={`/post/${post.id}`}>
//             <span className="font-thin">{dayjs(post.createdAt).fromNow()}</span>
//           </Link>
//         </div>
//         <span className="text-2xl">{props.post.content}</span>
//       </div>
//     </div>
//   );
// };
