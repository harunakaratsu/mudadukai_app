require File.expand_path("#{File.dirname(__FILE__)}/environment")

rails_env = ENV['RAILS_ENV'] || :development

set :environment, rails_env
set :output, "#{Rails.root}/log/cron.log"

every :monday, at: '9am' do
  rake 'push_line:push_line_message_week'
end

every 1.month, at: 'start of the month at 9am' do
  rake 'push_line:push_line_message_month'
end
