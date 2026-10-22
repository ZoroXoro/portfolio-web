import { dataUrlResponse, getProfile } from "@/lib/portfolio";
import { site } from "@/data/site";

// The admin-uploaded resume wins; public/resume.pdf is the fallback.
export async function GET(req: Request) {
  const { resumeUrl } = await getProfile();
  if (resumeUrl.startsWith("data:")) {
    const filename = `${site.legalName.replace(/\s+/g, "-")}-Resume.pdf`;
    return dataUrlResponse(resumeUrl, { "Content-Disposition": `inline; filename="${filename}"` });
  }
  if (/^https?:\/\//.test(resumeUrl)) return Response.redirect(resumeUrl, 307);
  return Response.redirect(new URL("/resume.pdf", req.url), 307);
}
