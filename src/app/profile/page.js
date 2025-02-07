import { cookies } from "next/headers";

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;

  const refreshToken = cookieStore.get("refreshToken")?.value || null;


  return (
    <div>
      <h1>User Profile</h1>
      <p>Access Token: {accessToken ? "Available" : "Not Found"} is {accessToken} and refresh token is \n {refreshToken}</p>
    </div>
  );
}
