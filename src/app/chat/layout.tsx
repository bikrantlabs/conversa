import { Sidebar } from "./_components/sidebar"

const ChatPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <div className="flex-1">
        <Sidebar />
      </div>
      <div className="flex-[4_4_0%]">{children}</div>
    </div>
  )
}

export default ChatPageLayout
