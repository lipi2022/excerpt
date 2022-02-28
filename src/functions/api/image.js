const apiToken = "Bearer YUz82BUGJTjFyXOGY22HxtX9atNwJdo2IasOs9XF"

// Reacts to POST Image
export async function onRequestPost(request) {
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
        }
    );
    const result = await response.json();
    console.log("upload image result:", result)

    return new Response(result);
}
