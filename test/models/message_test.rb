# test/models/message_test.rb
require "test_helper"

class MessageTest < ActiveSupport::TestCase
  setup do
    @user = users(:testuser1)
  end

  test "should be valid with valid attributes" do
    message = Message.new(body: "Hello", user: @user)
    assert message.valid?
  end

  test "should be invalid without a body" do
    message = Message.new(user: @user)
    assert_not message.valid?
    assert_includes message.errors[:body], "can't be blank"
  end

  test "should be invalid without a user" do
    message = Message.new(body: "Hello")
    assert_not message.valid?
    assert_includes message.errors[:user], "must exist"
  end

  test "should broadcast message after create" do
    message = Message.new(body: "Hello", user: @user)
    
    # Set up ActionCable mock
    mock = Minitest::Mock.new
    ActionCable.server.stub :broadcast, mock do
      message.save
      mock.verify
    end
    
    assert_mock mock
  end
end
