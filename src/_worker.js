export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        const apiToken = "Bearer YUz82BUGJTjFyXOGY22HxtX9atNwJdo2IasOs9XF"
        if (url.pathname.startsWith('/api/image/')) {
            // TODO: Add your custom /api/* logic here.
            // Prepare the Cloudflare Images API request body
            const formData = await request.formData();
            formData.set("requireSignedURLs", "true");
            const alt = formData.get("alt");
            formData.delete("alt");
            const isPrivate = formData.get("isPrivate") === "on";
            formData.delete("isPrivate");

            // Upload the image to Cloudflare Images
            const response = await fetch(
                `https://api.cloudflare.com/client/v4/accounts/493524dadc6a7fdef16df9d2ad442576/images/v1`,
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${apiToken}`,
                    },
                    mode: "cors",
                }
            );
            const result = await response.json();
            console.log("upload image result:", result)

            return new Response(result);
        }
        // Otherwise, serve the static assets.
        // Without this, the Worker will error and no assets will be served.
        return env.ASSETS.fetch(request);
    },
};
