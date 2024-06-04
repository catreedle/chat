class MessagesController < ApplicationController
  before_action :set_message, only: %i[ show update destroy ]
  MESSAGE_COUNT = {}

  # GET /messages
  def index
    @messages = Message.all

    render json: @messages
  end

  # GET /messages/1
  def show
    render json: @message
  end

  # POST /messages
  def create
    # @message = Message.new(message_params)
    @user = User.find_by(username: params[:username])
    @message = @user.messages.build(message_params)

    user_identifier = @user.username || request.remote_ip

    if throttle_user?(user_identifier)
        render json: { error: "Rate limit exceeded" }, status: :too_many_requests
      else
        if @message.save
          render json: @message, status: :created, location: @message
        else
          render json: @message.errors, status: :unprocessable_entity
        end
    end
  end

  # PATCH/PUT /messages/1
  def update
    if @message.update(message_params)
      render json: @message
    else
      render json: @message.errors, status: :unprocessable_entity
    end
  end

  # DELETE /messages/1
  def destroy
    @message.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_message
      @message = Message.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def message_params
      params.require(:message).permit(:body)
    end

    def throttle_user?(user_identifier)
        current_time = Time.now.to_i
        window_time = 60  # 1 minute window
        limit = 10        # 10 messages per window

        MESSAGE_COUNT[user_identifier] ||= []
        MESSAGE_COUNT[user_identifier].reject! { |timestamp| timestamp <= current_time - window_time }

        Rails.logger.info "Throttle check for #{user_identifier}, current count: #{MESSAGE_COUNT[user_identifier].size}, timestamps: #{MESSAGE_COUNT[user_identifier]}"

        if MESSAGE_COUNT[user_identifier].size >= limit
        Rails.logger.info "Throttling #{user_identifier} due to message count limit"
        true
        else
        MESSAGE_COUNT[user_identifier] << current_time
        Rails.logger.info "Allowing message for #{user_identifier}, updated count: #{MESSAGE_COUNT[user_identifier].size}"
        false
        end
    end

end