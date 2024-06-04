class AddUserToMessages < ActiveRecord::Migration[6.1]
    def change
      # Add the user_id column
      add_reference :messages, :user, foreign_key: true
  
      # Delete all existing messages
      reversible do |dir|
        dir.up { Message.delete_all }
      end
  
      # Add the not null constraint
      change_column_null :messages, :user_id, false
    end
  end
  