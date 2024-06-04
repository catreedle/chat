class Message < ApplicationRecord
    belongs_to :user
  
    after_create_commit { broadcast_message }
  
    validates :body, presence: true
    validates :user_id, presence: true
  
    private
  
    def broadcast_message
      ActionCable.server.broadcast("MessagesChannel", {
        id: id,
        body: body,
        user_id: user.id,
        username: user.username
      })
    end
  end
  