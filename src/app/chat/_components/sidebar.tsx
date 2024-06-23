import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

export const Sidebar = () => {
  return (
    <div className="h-screen w-full bg-accent px-8 py-4">
      <div className="flex flex-col">
        <Separator />
        <div className="my-4 flex flex-col">
          <h2 className="mb-4 text-lg font-medium">Online</h2>
          <div className="flex gap-2">
            <div className="flex flex-col items-center gap-1">
              <Avatar>
                <AvatarImage src=""></AvatarImage>
                <AvatarFallback>CN</AvatarFallback>
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400"></div>
              </Avatar>
              <p className="max-w-16 truncate text-sm">John</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Avatar>
                <AvatarImage src=""></AvatarImage>
                <AvatarFallback>AL</AvatarFallback>
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400"></div>
              </Avatar>
              <p className="max-w-16 truncate text-sm">Alex</p>
            </div>
          </div>
        </div>
        <Separator />
      </div>
    </div>
  )
}
