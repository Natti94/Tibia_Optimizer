export async function fetchNews(limit = 3) {
  const news_API = import.meta.env.VITE_API_URI_NEWS;
  if (!news_API) throw new Error("News URL not configured");
  const res = await fetch(news_API);
  if (!res.ok) throw new Error("Failed to fetch news archive");
  const archive = await res.json();

  const items = Array.isArray(archive?.news)
    ? archive.news.slice(0, limit)
    : [];

  const enriched = await Promise.all(
    items.map(async (item) => {
      let title = item.news;
      let image;
      let excerpt;
      try {
        const dres = await fetch(item.url_api);
        if (dres.ok) {
          const detail = await dres.json();
          title = detail?.news?.title || title;
          const html = detail?.news?.content_html || "";
          const match = /<img[^>]+src=\"([^\"]+)\"/i.exec(html);
          if (match) image = match[1];
          // Strip HTML tags to build a safe excerpt
          const text = html
            .replace(/<script[\s\S]*?<\/script>/gi, " ")
            .replace(/<style[\s\S]*?<\/style>/gi, " ")
            .replace(/<[^>]+>/g, " ")
            .replace(/\s+/g, " ")
            .trim();
          if (text) {
            excerpt = text.slice(0, 500);
          }
        }
      } catch (error) {
        console.error("Failed to fetch news detail", error);
      }

      return {
        id: item.id,
        date: item.date,
        text: item.news,
        excerpt: excerpt || (item.news ? String(item.news).slice(0, 300) : undefined),
        category: item.category,
        type: item.type,
        url: item.url,
        url_api: item.url_api,
        image,
      };
    })
  );

  return enriched;
}
