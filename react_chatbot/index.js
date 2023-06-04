import React, { Component } from "react";
import { render } from "react-dom";
import Hello from "./Hello";
import { Clock } from "./Clock";
import "./style.css";

class App extends Component {
	constructor() {
		super();
		this.state = {
			receiverID: "",
			messageText: null,
			groupMessage: [
				{
					id: "user",
					sender: { uid: "other" },
					data: { text: "text" },
				},
			],
			user: {},
			isAuthenticated: true,
		};
		this.GUID = "123";
	}
	sendMessage = (uid) => {
		console.log("send message");
		// this.setState({
		//   groupMessage: [
		//     ...this.state.groupMessage,
		//     {
		//       id: 'user',
		//       sender: { uid: uid },
		//       data: { text: 'text' },
		//     },
		//   ],
		// });
		this.state.groupMessage.push({
			id: "user",
			sender: { uid: uid },
			data: { text: "text" },
		});
		this.setState({ messageText: null });
		console.log(this.state.groupMessage);
	};
	scrollToBottom = () => {
		const chat = document.getElementById("chatList");
		chat.scrollTop = chat.scrollHeight;
	};
	handleSubmit = (event) => {
		event.preventDefault();

		this.sendMessage("other");
		this.sendMessage("uid");
		event.target.reset();
	};
	handleChange = (event) => {
		this.setState({ messageText: event.target.value });
	};
	getUser = () => {
		this.setState({ user: { uid: "uid" } });
		console.log(this.state.user);
	};
	// messageListener = () => {
	//   chat.addMessageListener((data, error) => {
	//     if (error) return console.log(`error: ${error}`);
	//     this.setState(
	//       (prevState) => ({
	//         groupMessage: [...prevState.groupMessage, data],
	//       }),
	//       () => {
	//         this.scrollToBottom();
	//       }
	//     );
	//   });
	// };
	componentDidMount() {
		this.getUser();
		// this.messageListener();
		// chat.j/oinGroup(this.GUID)
	}
	render() {
		return (
			<div>
				<Hello name={this.state.name} />
				<p>Start editing to see some magic happen :)</p>
				<Clock />
				<div className="chatWindow">
					<ul className="chat" id="chatList">
						{this.state.groupMessage.map((data) => (
							<div key={data.id}>
								{this.state.user.uid === data.sender.uid ? (
									<li className="self">
										<div className="msg">
											<p>{data.sender.uid}</p>
											<div className="message"> {data.data.text}</div>
										</div>
									</li>
								) : (
									<li className="other">
										<div className="msg">
											<p>{data.sender.uid}</p>
											<div className="message"> {data.data.text} </div>
										</div>
									</li>
								)}
							</div>
						))}
					</ul>
					<div className="chatInputWrapper">
						<form onSubmit={this.handleSubmit}>
							<input
								className="textarea input"
								type="text"
								placeholder="Enter your message..."
								onChange={this.handleChange}
							/>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

render(<App />, document.getElementById("root"));
