import { useEffect, useRef, useState } from "react"
import { messages as mockMessages } from "../services/mockApi.js"

const Chat = ({userId}) => {

    const [text, setText] = useState("")

    const [messages, setMessages] = useState(mockMessages)

    const chatBodyRef = useRef(null)


    const handleChange = (event) => {
        setText(event.target.value)
    }

    const handleKeyDown = (event)  => {
        if(event.key === "Enter") {
            sendMessages()
        }

    }

    useEffect(() => {
        if(chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight
        } 
}, [messages])



const sendMessages = () => {
    if(text.length === 0) {
        return
    }

    const currentTime = new Date()
    const newMessage = {
        id: messages.length + 1,
        author: "Ana",
        time: currentTime.getHours() +":"+ currentTime.getMinutes(),
        text: text,
    }

    setMessages([...messages, newMessage])
    setText("")
}



    return (
    <section className="chat">
        <header>
            <h2>Lucas Hernan Figueroa</h2>
            <p>Ultima conexion: hace 1 minuto</p>
        </header>
        <div className="chat-body" ref={chatBodyRef}>
            {
                messages.map((message)=> <div  key={message.id} className={`message ${message.author === "Ana"? "me": "received"}`}>  
                    <p><b>{message.author}:</b> {message.text}</p>
                    <p className="timestamp">{message.time}</p>
                    </div>)
            }
        </div>
        <div className="chat-input">
            <input type="text" placeholder="Escribe un mensaje.." 
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            value={text}/>
        
            <button onClick={sendMessages}>Enviar</button>

        </div>
    </section>
    )


}



export { Chat }