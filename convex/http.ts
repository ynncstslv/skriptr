import { httpRouter } from 'convex/server';
import { WebhookEvent } from '@clerk/nextjs/server';
import { Webhook } from 'svix';
import { httpAction } from './_generated/server';
import { api } from './_generated/api';

const http = httpRouter();

http.route({
	path: '/clerk-webhook',
	method: 'POST',

	handler: httpAction(async (ctx, request) => {
		const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

		if (!webhookSecret) {
			throw new Error(
				'[ http.ts ] missing CLERK_WEBHOOK_SECRET environment variable'
			);
		}

		const svix_id = request.headers.get('svix-id');
		const svix_signature = request.headers.get('svix-signature');
		const svix_timestamp = request.headers.get('svix-timestamp');

		if (!svix_id || !svix_signature || !svix_timestamp) {
			return new Response('[ http.ts ] no svix headers', {
				status: 400,
			});
		}

		const payload = await request.json();
		const body = JSON.stringify(payload);

		const wh = new Webhook(webhookSecret);
		let evt: WebhookEvent;

		try {
			evt = wh.verify(body, {
				'svix-id': svix_id,
				'svix-signature': svix_signature,
				'svix-timestamp': svix_timestamp,
			}) as WebhookEvent;
		} catch (err) {
			console.error('[ http.ts ] error while verifying webhook:', err);
			return new Response('[ http.ts ] an error occurred', { status: 400 });
		}

		const eventType = evt.type;

		if (eventType === 'user.created') {
			// save the user to convex db
			const { id, email_addresses, first_name, last_name } = evt.data;

			const email = email_addresses[0].email_address;
			const name = `${first_name || ''} ${last_name || ''}`.trim();

			try {
				await ctx.runMutation(api.users.syncUser, {
					userId: id,
					email,
					name,
				});
			} catch (err) {
				console.error('[ http.ts ] error while creating user:', err);
				return new Response(
					'[ http.ts ] an error occurred while creating user',
					{ status: 500 }
				);
			}
		}

		return new Response('[ http.ts ] webhook processed successfully', {
			status: 200,
		});
	}),
});

export default http;