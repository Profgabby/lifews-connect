import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        }
      }
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const path = request.nextUrl.pathname;

  const protectedRoutes = ["/dashboard", "/pillars", "/library", "/garden", "/announcements", "/messages", "/settings", "/onboarding"];
  const isProtected = protectedRoutes.some((route) => path.startsWith(route));

  if (!user && isProtected) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role,onboarding_completed")
      .eq("id", user.id)
      .maybeSingle();

    const needsOnboarding = !profile || !profile.onboarding_completed || !profile.role;

    if (needsOnboarding && path !== "/onboarding" && isProtected) {
      const url = request.nextUrl.clone();
      url.pathname = "/onboarding";
      return NextResponse.redirect(url);
    }

    if (!needsOnboarding && ["/login", "/signup", "/auth", "/onboarding"].includes(path)) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      url.search = `?role=${encodeURIComponent(profile.role)}`;
      return NextResponse.redirect(url);
    }
  }

  return response;
}
