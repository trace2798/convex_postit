// "use client";

// import { toast } from "sonner";
// import Link from "next/link";
// import Image from "next/image";
// import { useAuth } from "@clerk/nextjs";
// import { MoreHorizontal } from "lucide-react";
// import { formatDistanceToNow } from "date-fns";

// import { api } from "@/convex/_generated/api";
// import { Skeleton } from "@/components/ui/skeleton";
// // import { useApiMutation } from "@/hooks/use-api-mutation";

// import { Footer } from "./footer";
// import { Overlay } from "./overlay";
// // import { Actions } from "@/components/actions";

// interface SnippetCardProps {
//   id: string;
//   title: string;
//   authorName: string;
//   userId: string;
//   createdAt: number;
//   imageUrl: string;
//   orgId: string;
//   isFavorite: boolean;
// }

// export const SnippetCard = ({
//   id,
//   title,
//   userId,
//   authorName,
//   createdAt,
//   imageUrl,
//   orgId,
//   isFavorite,
// }: SnippetCardProps) => {
//   const { userId } = useAuth();

//   const authorLabel = userId === userId ? "You" : authorName;
//   const createdAtLabel = formatDistanceToNow(createdAt, {
//     addSuffix: true,
//   });

//   // const { mutate: onFavorite, pending: pendingFavorite } = useApiMutation(
//   //   api.board.favorite
//   // );
//   // const { mutate: onUnfavorite, pending: pendingUnfavorite } = useApiMutation(
//   //   api.board.unfavorite
//   // );

//   // const toggleFavorite = () => {
//   //   if (isFavorite) {
//   //     onUnfavorite({ id }).catch(() => toast.error("Failed to unfavorite"));
//   //   } else {
//   //     onFavorite({ id, orgId }).catch(() => toast.error("Failed to favorite"));
//   //   }
//   // };

//   return (
//     <Link href={`/personal/snippet/${id}`}>
//       <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
//         <div className="relative flex-1 bg-amber-50">
//           {/* <Image src={imageUrl} alt={title} fill className="object-fit" /> */}
//           <Overlay />
//           {/* <Actions id={id} title={title} side="right">
//             <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
//               <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity" />
//             </button>
//           </Actions> */}
//         </div>
//         <Footer
//           isFavorite={isFavorite}
//           title={title}
//           authorLabel={authorLabel}
//           createdAtLabel={createdAtLabel}
//           // onClick={toggleFavorite}
//           // disabled={pendingFavorite || pendingUnfavorite}
//           onClick={() => {}}
//           disabled={false}
//         />
//       </div>
//     </Link>
//   );
// };

// SnippetCard.Skeleton = function SnippetCardSkeleton() {
//   return (
//     <div className="aspect-[100/127] rounded-lg overflow-hidden">
//       <Skeleton className="h-full w-full" />
//     </div>
//   );
// };

"use client";

import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { api } from "@/convex/_generated/api";
import { Skeleton } from "@/components/ui/skeleton";
// import { useApiMutation } from "@/hooks/use-api-mutation";

import { Footer } from "./footer";
import { Overlay } from "./overlay";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Actions } from "@/components/actions";
import { useCurrentUser } from "@/hooks/use-current-user";
// import { Actions } from "@/components/actions";

interface SnippetCardProps {
  id: string;
  title: string;
  authorName: string;
  userId: string;
  createdAt: number;
  imageUrl: string;
  orgId: string;
  isFavorite: boolean;
}

export const SnippetCard = ({
  id,
  title,
  userId,
  authorName,
  createdAt,
  imageUrl,
  orgId,
  isFavorite,
}: SnippetCardProps) => {
  // const { userId } = useAuth();
  const currentUser = useCurrentUser();
  console.log("CurrentUSer===>", currentUser);
  const authorLabel = userId === userId ? "You" : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true,
  });

  // const { mutate: onFavorite, pending: pendingFavorite } = useApiMutation(
  //   api.board.favorite
  // );
  // const { mutate: onUnfavorite, pending: pendingUnfavorite } = useApiMutation(
  //   api.board.unfavorite
  // );

  // const toggleFavorite = () => {
  //   if (isFavorite) {
  //     onUnfavorite({ id }).catch(() => toast.error("Failed to unfavorite"));
  //   } else {
  //     onFavorite({ id, orgId }).catch(() => toast.error("Failed to favorite"));
  //   }
  // };

  return (
    <Link href={`/snippet/${id}`}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="text-sm">{title}</div>
          <div>
            {/* <Actions id={id} title={title} side="right">
              <button className="">
                <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity" />
              </button>
            </Actions> */}
          </div>
        </CardHeader>
        <CardFooter className="text-sm">{createdAtLabel}</CardFooter>
      </Card>
    </Link>
  );
};

SnippetCard.Skeleton = function SnippetCardSkeleton() {
  return (
    <div className="aspect-[100/127] rounded-lg overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  );
};