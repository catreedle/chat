# test/channels/messages_channel_test.rb
require "test_helper"

class MessagesChannelTest < ActionCable::Channel::TestCase
  setup do
    @user = users(:testuser1)
    @message = messages(:message1)
  end

  test "subscribes and streams from the channel" do
    subscribe

    assert subscription.confirmed?
    assert_has_stream "MessagesChannel"
  end

  test "sends a message" do
    subscribe
    perform :send_message, message: { body: "New message", user_id: @user.id }

    assert_broadcast_on("messages", body: "New message", username: @user.username)
  end

  test "unsubscribes and stops streaming" do
    subscribe
    assert subscription.confirmed?
    assert_has_stream "MessagesChannel"

    unsubscribe
    assert_no_streams
  end
end
