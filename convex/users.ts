import {internalMutation, mutation, query, QueryCtx, action} from "./_generated/server";
import { v } from "convex/values";
import { createClerkClient } from '@clerk/backend';
import {api, internal} from "@/convex/_generated/api";
import {Id} from "@/convex/_generated/dataModel";




export const current = query({
    args: {},
    handler: async (ctx) => {
        return await getCurrentUser(ctx);
    },
});


export async function getCurrentUserOrThrow(ctx: QueryCtx) {
    const userRecord = await getCurrentUser(ctx);
    if (!userRecord) throw new Error("Can't get current user");
    return userRecord;
}

export async function getCurrentUser(ctx: QueryCtx) {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
        return null;
    }
    return await userByExternalId(ctx, identity.subject);
}

async function userByExternalId(ctx: QueryCtx, clerkUserId: string) {
    return await ctx.db
        .query("users")
        .withIndex("byClerkUserId", (q) => q.eq("clerkId", clerkUserId))
        .unique();
}

export const getUserById = query({
    args: {
        userId: v.id('users'),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.get(args.userId);
        if (!user?.imageUrl || user.imageUrl.startsWith('http')) {
            return user;
        }

        const url = await ctx.storage.getUrl(user.imageUrl );

        return {
            ...user,
            imageUrl: url,
        };
    },
});


export const getUserByClerkId = query({
    args: {
        clerkId: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query('users')
            .filter((q) => q.eq(q.field('clerkId'), args.clerkId))
            .unique();

        if (!user?.imageUrl || user.imageUrl.startsWith('http')) {
            return user;
        }

        const url = await ctx.storage.getUrl(user.imageUrl );

        return {
            ...user,
            imageUrl: url,
        };
    },
});


// Internal Mutation for create a user in the database
export const InternalCreateUser = internalMutation({
    args: {
        firstName: v.string(),
        email: v.string(),
        clerkId: v.string(),
    },
    async handler(ctx, args) {
        const userId: Id<"users"> = await ctx.db.insert("users", {
            firstName: args.firstName,
            email: args.email,
            clerkId: args.clerkId,
        });
        return userId;

    },
});


// Mutation for the user creation
export const createUser = mutation({
    args: {
        email: v.string(),
        clerkId: v.string(),
        firstName: v.string()
    },
    async handler(ctx, args) {
        const user = await userByExternalId(ctx, args.clerkId);
        if (user === null) {

            await ctx.runMutation(internal.users.InternalCreateUser, {
                firstName: args.firstName,
                email: args.email,
                clerkId: args.clerkId,
            });
        }
    }
});




// Action to delete user from Clerk
export const deleteUserFromClerk = action({
    args: { clerkId: v.string() },
    handler: async (ctx, { clerkId }) => {
        const clerkClient = createClerkClient({
            secretKey: process.env.CLERK_SECRET_KEY,
        });

        try {
            await clerkClient.users.deleteUser(clerkId);
            return { success: true };
        } catch (error) {
            return { success: false, error: "Failed to delete user from Clerk" };
        }
    },
});

// Internal mutation to delete user from Convex
export const deleteUserFromConvex = mutation({
    args: { clerkId: v.string() },
    handler: async (ctx, { clerkId }) => {
        const user = await ctx.db
            .query("users")
            .withIndex("byClerkUserId", (q) => q.eq("clerkId", clerkId))
            .unique();

        if (user) {
            await ctx.db.delete(user._id);
            return { success: true };
        } else {
            return { success: false, error: "User not found in Convex" };
        }
    },
});

export const deleteUser = mutation({
    args: { clerkId: v.string() },
    handler: async (ctx, args) => {
        // Check if the current user has permission to delete users
        const identity = await ctx.auth.getUserIdentity()
        if (!identity) {
            throw new Error("Not authenticated")
        }

        // First, schedule the Clerk deletion
        await ctx.scheduler.runAfter(0, api.users.deleteUserFromClerk, {
            clerkId: args.clerkId,
        })

        // Then delete from Convex
        const convexResult = await ctx.runMutation(api.users.deleteUserFromConvex, {
            clerkId: args.clerkId,
        })

        if (!convexResult.success) {
            throw new Error(convexResult.error || "Failed to delete user from Convex")
        }

        return { success: true, message: "User deletion process initiated" }
    },
})

export const updateUserProfile = mutation({
    args: {
        name: v.string(),
        imageUrl: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Not authenticated");
        }

        const user = await userByExternalId(ctx, identity.subject);
        if (!user) {
            throw new Error("User not found");
        }

        const updateFields: {
            firstName: string;
            imageUrl?: string;
        } = {
            firstName: args.name,
        };

        if (args.imageUrl) {
            updateFields.imageUrl = args.imageUrl;
        }

        await ctx.db.patch(user._id, updateFields);

        return { success: true, message: "Profile updated successfully" };
    },
});


export const generateUploadUrl = mutation(async (ctx) => {
    await getCurrentUserOrThrow(ctx);

    return await ctx.storage.generateUploadUrl();
});