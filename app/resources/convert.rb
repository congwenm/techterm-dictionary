#! /usr/bin/ruby
require 'json'

dictionary = []

ENGLISH = /[\(\w\) ]*/
File.open("dictionary.txt", "r") do |file|
  file.each_line do |line|

    definition = line
    term = ENGLISH.match(line).to_s
    definition.slice! term
    term.strip!
    definition.strip!

    puts 'term: ', term
    puts 'definition: ', definition

    hash = {
      term: term,
      definition: definition
    }
    dictionary << hash
  end
end
# puts '*************'
# puts 'pretty result: ', JSON.pretty_generate(dictionary)

File.open('./output.json', 'w') do |file|
  file.write(JSON.pretty_generate(dictionary))
end
