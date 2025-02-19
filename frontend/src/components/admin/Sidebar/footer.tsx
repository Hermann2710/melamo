import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SidebarFooter } from '@/components/ui/sidebar'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'

function Footer() {
    const { user } = useSelector((state: RootState) => state.auth);
  return (
    <SidebarFooter className={"bg-white"}>
        <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profilePic ? `/uploads/${user?.profilePic}` : ""}
                    alt={user?.username}
                  />
                  <AvatarFallback className="bg-green-500 text-white uppercase font-bold">
                    {user?.username.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>{user?.username}</TooltipContent>
            </Tooltip>
          <div className="flex flex-col text-xs">
            <span className="font-bold">{user?.username}</span>
            <span>{user?.email}</span>
          </div>
        </div>
      </SidebarFooter>
  )
}

export default Footer