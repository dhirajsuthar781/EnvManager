"use client"

import { useEnvStore } from "@/lib/zustand/envStore";
import { useEffect } from "react";

type Props = {

     userId: string,
     username?: string

}

export default function HydrateUserData({ userId, username }: Props) {

     const { setUserData } = useEnvStore((state) => state);

     useEffect(() => {
          if (userId) setUserData({ userId: userId, username: username || "" });
     }, [userId, setUserData]);

     return (
          null
     )
}