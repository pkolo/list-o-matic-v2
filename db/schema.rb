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

ActiveRecord::Schema.define(version: 20170203171030) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "ballots", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "list_id"
    t.integer  "voter_id"
    t.index ["list_id"], name: "index_ballots_on_list_id", using: :btree
  end

  create_table "discogs", force: :cascade do |t|
    t.integer "album_id"
    t.string  "artist"
    t.string  "title"
    t.string  "year"
    t.string  "label"
    t.string  "video_url", default: ""
    t.string  "img_url",   default: ""
  end

  create_table "lists", force: :cascade do |t|
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.string   "title"
    t.integer  "maximum"
    t.integer  "owner_id"
    t.boolean  "open",       default: true
    t.integer  "minimum",    default: 10
    t.text     "notes",      default: ""
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "username"
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

  create_table "votes", force: :cascade do |t|
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.integer  "album_id"
    t.integer  "ballot_id"
    t.integer  "rank"
    t.text     "review",     default: ""
    t.index ["ballot_id"], name: "index_votes_on_ballot_id", using: :btree
  end

end
