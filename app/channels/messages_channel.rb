class MessagesChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "MessagesChannel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    stop_stream_from "MessagesChannel"
  end

  def send_message(data)
    user = User.find(data["message"][:user_id])
    message = user.messages.create!(body: data["message"][:body])
    ActionCable.server.broadcast("messages", {
      body: message.body,
      username: user.username
    })
  end
end
