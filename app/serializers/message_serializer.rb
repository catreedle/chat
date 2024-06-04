class MessageSerializer < ActiveModel::Serializer
    attributes :id, :body, :created_at, :updated_at, :username
  
    def username
      object.user.username
    end
  end
  