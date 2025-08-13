import { Handlers, PageProps } from "$fresh/server.ts";

export const handler: Handlers = {
    async GET(_request, context) {
        const response = await context.render();
        response.headers.set("X-Custom-Header", "Hello World");
        return response;
    }
}

export default function About(props: PageProps) {
    return (
        <div>
            <h1>About Us</h1>
            <p>This is the about page.</p>
            <p>{props.url.pathname}</p>
        </div>
    );
}