require "test_helper"

class UserTest < ActiveSupport::TestCase
  setup do
    @user = User.new(username: "testuser")
  end

  test "should be valid with valid attributes" do
    assert @user.valid?
  end

  test "should not be valid without a username" do
    @user.username = nil
    assert_not @user.valid?
    assert_includes @user.errors[:username], "can't be blank"
  end

  test "should not be valid with a duplicate username" do
    duplicate_user = @user.dup
    @user.save
    assert_not duplicate_user.valid?
    assert_includes duplicate_user.errors[:username], "has already been taken"
  end
end

