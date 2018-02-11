# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180211185225) do

  create_table "artists", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "artists_issues", id: false, force: :cascade do |t|
    t.integer "issue_id", null: false
    t.integer "artist_id", null: false
  end

  create_table "colorists", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "colorists_issues", id: false, force: :cascade do |t|
    t.integer "issue_id", null: false
    t.integer "colorist_id", null: false
  end

  create_table "inkers", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "inkers_issues", id: false, force: :cascade do |t|
    t.integer "issue_id", null: false
    t.integer "inker_id", null: false
  end

  create_table "issues", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.integer "page_count"
    t.datetime "release_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "series_id"
    t.string "external_image_url"
    t.index ["series_id"], name: "index_issues_on_series_id"
  end

  create_table "issues_writers", id: false, force: :cascade do |t|
    t.integer "issue_id", null: false
    t.integer "writer_id", null: false
  end

  create_table "publishers", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "series", force: :cascade do |t|
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "publisher_id"
    t.index ["publisher_id"], name: "index_series_on_publisher_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "provider"
    t.string "uid"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "writers", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
