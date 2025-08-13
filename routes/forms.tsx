import { Handlers, PageProps } from "$fresh/server.ts";

const NAMES = ["Alice", "Bob", "Charlie", "Dave", "Eve", "Frank"];

interface Data {
  results: string[];
  query: string;
}

export const handler: Handlers<Data> = {
  GET(req, ctx) {
    const url = new URL(req.url);
    const query = url.searchParams.get("q") || "";
    const results = NAMES.filter((name) =>
      name.toLowerCase().includes(query.toLowerCase())
    );
    return ctx.render({ results, query });
  },
};

export default function Page({ data }: PageProps<Data>) {
  const { results, query } = data;
  return (
    <div class="max-w-md mx-auto mt-8 p-6">
      <form class="mb-6">
        <div class="flex gap-2">
          <input
            type="text"
            name="q"
            value={query}
            placeholder="Search names..."
            class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            class="px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded-md transition-colors duration-200 font-medium text-gray-700"
          >
            Search
          </button>
        </div>
      </form>

      {results.length > 0 ? (
        <ul class="space-y-2">
          {results.map((name) => (
            <li
              key={name}
              class="px-3 py-2 bg-gray-50 rounded-md border border-gray-200 text-gray-800"
            >
              {name}
            </li>
          ))}
        </ul>
      ) : (
        query && (
          <p class="text-gray-500 text-center py-4">No results found</p>
        )
      )}
    </div>
  );
}
