import { SearchBox } from "@/features/search-users/search-box"

const ChatNavbar = () => {
  return (
    <div className="border-b px-4 py-8 shadow-sm">
      <div className="w-72">
        <SearchBox />
      </div>
    </div>
  )
}

export default ChatNavbar
