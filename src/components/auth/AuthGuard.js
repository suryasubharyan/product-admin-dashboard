"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";
import Loader from "@/components/ui/Loader";

export default function AuthGuard({ children }){
    const router = useRouter();
    const [isAllowed, setIsAllowed] = useState(false);

    useEffect(() => {
        if (getToken()) {
            setIsAllowed(true);
        } else {
            router.replace("/login");
        }
    }, [router]);

    if ( !isAllowed ) return <Loader text="Checking login..." />;

    return children;
}