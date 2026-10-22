import { dataUrlResponse, getSpecimenImage } from "@/lib/portfolio";

export async function GET(_req: Request, ctx: RouteContext<"/work/[slug]/plate">) {
  const { slug } = await ctx.params;
  const image = await getSpecimenImage(slug);
  return image ? dataUrlResponse(image) : new Response("Not found", { status: 404 });
}
