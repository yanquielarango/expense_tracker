import { httpRouter } from 'convex/server'
import { internal } from './_generated/api'
import { httpAction } from './_generated/server'

const http = httpRouter()


const handleClerkWebhook = httpAction(async (ctx, request) => {
    const event = await request.json();



    switch (event.type) {
        case 'user.created': // intentional fallthrough
        case 'user.updated':
            await ctx.runMutation(internal.user.upsertFromClerk, {
                data: event.data
            })
            break
        case 'user.deleted': {
            const clerkUserId = event.data.id!
            await ctx.runMutation(internal.user.deleteFromClerk, {
                clerkUserId
            })
            break
        }
        default:
            console.log('Ignored Clerk webhook event', event.type)
    }

    return new Response(null, { status: 200 })
})


http.route({
    path: '/clerk-users-webhook',
    method: 'POST',
    handler: handleClerkWebhook,
});

export default http;
