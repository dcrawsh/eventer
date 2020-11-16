# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)



Event.destroy_all

events = Event.create([
  {
    title: "New Seasons Expo",
    start_datetime: "Mon, 14 Oct 2019",
    location: "New Seasons Concordia"
  },
  {
    title: "Enterprise Sales Training Workshop",
    start_datetime: "Tue, 15 Oct 2019",
    location: "Oregon Convention Center"
  },
  {
    title: "Ruby Hack Night",
    start_datetime: "Fri, 18 Oct 2019",
    location: "Multnomah County Library"
  },
  {
    title: "Beginners Salsa dance meetup",
    start_datetime: "Sat, 14 Oct 2019",
    location: "Aztec Willie's Taqueria"
  }
])
