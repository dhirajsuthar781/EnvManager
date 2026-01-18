import { Button } from "@/components/ui/button"
 
type Props = {}

export default function Navbar({}: Props) {
  return (
    <div className=' flex   bg-gray-50 justify-end p-3 border-b  '>
      
      <Button  variant={"destructive"}>Logout</Button>
   
    </div>
  )
}