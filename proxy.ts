import { NextResponse, type NextRequest } from "next/server";
import {
  cookieName,
  fallbackLng,
  isSupportedLanguage,
  type AppLanguage,
} from "@/i18n/settings";

function getLanguageFromHeader(headerValue: string | null): AppLanguage {
  if (!headerValue) {
    return fallbackLng;
  }

  const values = headerValue.split(",").map((entry) => entry.trim().toLowerCase());

  for (const value of values) {
    if (value.startsWith("es")) {
      return "es";
    }

    if (value.startsWith("en")) {
      return "en";
    }
  }

  return fallbackLng;
}

function detectLanguage(request: NextRequest): AppLanguage {
  const languageFromCookie = request.cookies.get(cookieName)?.value;

  if (languageFromCookie && isSupportedLanguage(languageFromCookie)) {
    return languageFromCookie;
  }

  return getLanguageFromHeader(request.headers.get("accept-language"));
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathLanguage = pathname.split("/")[1];

  if (isSupportedLanguage(pathLanguage)) {
    const response = NextResponse.next();
    response.cookies.set(cookieName, pathLanguage, { path: "/" });
    return response;
  }

  const language = detectLanguage(request);
  const redirectUrl = request.nextUrl.clone();

  redirectUrl.pathname = `/${language}${pathname}`;

  const response = NextResponse.redirect(redirectUrl);
  response.cookies.set(cookieName, language, { path: "/" });

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
