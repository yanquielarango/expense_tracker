import { useUser } from "@clerk/clerk-expo"
import { useQuery } from "convex/react"
import { api } from '@/convex/_generated/api'

export function useUserProfile() {
    const { user } = useUser()
    const clerkId = user?.id

    console.log("Clerk user:", user)
    console.log("Clerk ID:", clerkId)

    const userProfile = useQuery(api.users.getUserByClerkId,
        clerkId ? { clerkId } : "skip"
    )

    console.log("User profile from Convex:", userProfile)

    return { userProfile, isLoading: userProfile === undefined, user }
}