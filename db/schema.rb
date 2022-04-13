# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_04_08_114627) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "foods", force: :cascade do |t|
    t.string "name", null: false
    t.integer "price", null: false
    t.integer "calorie", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "place"
    t.text "memo"
    t.boolean "favorite", default: false, null: false
    t.integer "amount"
    t.string "unit"
    t.index ["user_id"], name: "index_foods_on_user_id"
  end

  create_table "target_values", force: :cascade do |t|
    t.integer "price", default: 0, null: false
    t.integer "calorie", default: 0, null: false
    t.bigint "user_id", null: false
    t.string "year_month", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id", "year_month"], name: "index_target_values_on_user_id_and_year_month", unique: true
    t.index ["user_id"], name: "index_target_values_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "line_user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["line_user_id"], name: "index_users_on_line_user_id", unique: true
  end

  add_foreign_key "foods", "users"
  add_foreign_key "target_values", "users"
end
