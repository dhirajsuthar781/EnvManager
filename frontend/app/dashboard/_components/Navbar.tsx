"use client"
import { Button } from "@/components/ui/button"
import { logout } from "@/lib/api/project_env"
import { useRouter } from "next/navigation"
type Props = {}

export default function Navbar({ }: Props) {
  const router = useRouter()
  async function LogoutHandler() {
    let data = await logout();
    if (data.success) {
      router.push("/");
    }
  }
  
  return (
    <div className=' flex   bg-gray-50 justify-end p-3 border-b  '>

      <Button onClick={LogoutHandler} variant={"destructive"}>Logout</Button>

    </div>
  )
}