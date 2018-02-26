var ws = new WebSocket(
	"ws://localhost:8761/websocketgateway/dial/localhost:7777"
);

ws.onclose = evt => {
	console.log("closed", evt.reason);
};
ws.onopen = evt => {
	console.log("open", evt);
};
ws.onmessage = evt => {
	console.log("message", evt);
};
ws.onerror = evt => {
	console.log("error", evt);
};
