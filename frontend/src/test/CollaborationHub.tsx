import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"

interface Message {
  id: string
  content: string
  sender: string
  timestamp: string
}

export function CollaborationHub() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', content: "Hey team, I've just pushed the latest changes to our repository. Can someone review it?", sender: "Alice", timestamp: "2023-07-21 10:30" },
    { id: '2', content: "Sure, I'll take a look at it this afternoon.", sender: "Bob", timestamp: "2023-07-21 11:15" },
    { id: '3', content: "Great, thanks! Let me know if you have any questions.", sender: "Alice", timestamp: "2023-07-21 11:20" },
  ])

  const [newMessage, setNewMessage] = useState("")
  const { toast } = useToast()

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        content: newMessage,
        sender: "Current User", // This should be dynamically set based on the logged-in user
        timestamp: new Date().toLocaleString()
      }
      setMessages([...messages, message])
      setNewMessage("")
      toast({
        title: "Message Sent",
        description: "Your message has been sent to the team.",
      })
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Collaboration Hub</CardTitle>
        <CardDescription>Communicate with your team in real-time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] overflow-y-auto mb-4 p-4 border rounded-md">
          {messages.map(message => (
            <div key={message.id} className="mb-4">
              <div className="flex items-start">
                <Avatar className="w-8 h-8 mr-2">
                  <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${message.sender}`} />
                  <AvatarFallback>{message.sender[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{message.sender}</p>
                  <p className="text-sm text-gray-500">{message.timestamp}</p>
                </div>
              </div>
              <p className="mt-1 ml-10">{message.content}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message here..."
            className="flex-grow mr-2"
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
      </CardContent>
    </Card>
  )
}

