import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        email: v.string(),
        clerkId: v.string(),
        imageUrl: v.optional(v.id("_storage")),
        firstName: v.string()
    }).index('byClerkUserId', ['clerkId']),


})


