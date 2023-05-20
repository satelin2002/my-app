import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { Client } from "postmark";

import { siteConfig } from "@/config/site";
import { db } from "@/lib/db";
import { get } from "http";

const postmarkAPIToken = process.env.POSTMARK_API_TOKEN;
const postMarkSigninTemplate = process.env.POSTMARK_SIGN_IN_TEMPLATE;
const postMarkActivationTemplate = process.env.POSTMARK_ACTIVATION_TEMPLATE;

if (!postmarkAPIToken || postmarkAPIToken.length === 0) {
  throw new Error("Missing POSTMARK_API_TOKEN");
}
if (!postMarkSigninTemplate || postMarkSigninTemplate.length === 0) {
  throw new Error("Missing POSTMARK_SIGN_IN_TEMPLATE");
}
if (!postMarkActivationTemplate || postMarkActivationTemplate.length === 0) {
  throw new Error("Missing POSTMARK_ACTIVATION_TEMPLATE");
}

const postmarkClient = new Client(postmarkAPIToken);

const smtpToken = process.env.SMTP_TOKEN;
if (!smtpToken || smtpToken.length === 0) {
  throw new Error("Missing SMTP_TOKEN");
}

function getGoogleCredentials(): { clientId: string; clientSecret: string } {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || clientId.length === 0) {
    throw new Error("Missing GOOGLE_CLIENT_ID");
  }

  if (!clientSecret || clientSecret.length === 0) {
    throw new Error("Missing GOOGLE_CLIENT_SECRET");
  }

  return { clientId, clientSecret };
}

export const authOptions: NextAuthOptions = {
  // huh any! I know.
  // This is a temporary fix for prisma client.
  // @see https://github.com/prisma/prisma/issues/16117
  adapter: PrismaAdapter(db as any),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
    }),
    EmailProvider({
      from: smtpToken,
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        const user = await db.user.findUnique({
          where: {
            email: identifier,
          },
          select: {
            emailVerified: true,
          },
        });

        console.log("user", user);
        console.log("user.emailVerified", user?.emailVerified);

        console.log("identifier", identifier);
        console.log("url", url);
        console.log("provider", provider);

        // const templateId = user?.emailVerified
        //   ? postMarkSigninTemplate
        //   : postMarkActivationTemplate;
        // if (!templateId) {
        //   throw new Error("Missing template id");
        // }

        // const result = await postmarkClient.sendEmailWithTemplate({
        //   TemplateId: parseInt(templateId),
        //   To: identifier,
        //   From: provider.from as string,
        //   TemplateModel: {
        //     action_url: url,
        //     product_name: siteConfig.name,
        //   },
        //   Headers: [
        //     {
        //       // Set this to prevent Gmail from threading emails.
        //       // See https://stackoverflow.com/questions/23434110/force-emails-not-to-be-grouped-into-conversations/25435722.
        //       Name: "X-Entity-Ref-ID",
        //       Value: new Date().getTime() + "",
        //     },
        //   ],
        // });

        // if (result.ErrorCode) {
        //   throw new Error(result.Message);
        // }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
  },
  debug: process.env.NODE_ENV === "development",
};
