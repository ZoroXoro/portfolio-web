import { dataUrlResponse, getCertificateImage } from "@/lib/portfolio";

export async function GET(_req: Request, ctx: RouteContext<"/certificates/[id]/image">) {
  const { id } = await ctx.params;
  const image = await getCertificateImage(id);
  return image ? dataUrlResponse(image) : new Response("Not found", { status: 404 });
}
