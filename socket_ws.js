import WebSocket from "ws";

const url = "wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-12-17";
const ws = new WebSocket(url, {
  headers: {
    "Authorization": "Bearer " + process.env.OPENAI_API_KEY,
    "OpenAI-Beta": "realtime=v1",
  },
});

ws.on("open", function open() {
  console.log("Connected to server.");
});

ws.on("message", function incoming(message) {
  console.log(JSON.parse(message.toString()));

    ws.send(JSON.stringify({
        action: "start",
        model: "gpt-4o-realtime-preview-2024-12-17",
        user: "user-id-or-name",
        messages: [
            { role: "user", content: "connection test" }
        ],
    }));

    ws.on("message", data => {
        const msg = JSON.parse(data);
        if (msg.action === "update") {
            process.stdout.write(msg.delta.content);
        }
        if (msg.action === "done") {
            console.log("\n Done");
        }
    });

    ws.send(JSON.stringify({
        action: "next",
        messages: [
            { role: "user", content: "connection test" }
        ]
    }));

});