import { Sidebar } from "./_components/sidebar"

const ChatPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <div className="hidden flex-1 lg:flex">
        <Sidebar />
      </div>
      <div className="flex-[4_4_0%]">{children}</div>
    </div>
  )
}

export default ChatPageLayout
