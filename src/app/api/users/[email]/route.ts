import { db } from "@/lib/db";

export async function HEAD(
  request: Request,
  {
    params,
  }: {
    params: { email: string };
  }
) {
  const email = params.email;

  const user = await db.user.findFirst({
    where: { email },
  });

  if (user) {
    return new Response("User exists.", { status: 409 });
  }
  return new Response("User does not exist.", { status: 200 });
}
