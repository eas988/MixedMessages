# MixedMessages
Codecademy Mixed Messages Project

Original project criteria was to randomly generate a message from at least three data sources, using JavaScript, Terminal, Git/Github.

I initially had a program that would give a random musical key pulling from two data sources, an array of strings representing all the musical notes, and another array of 
two strings indicating major or minor. The third element was a random variation of the I-V-vi-IV "four chord" progression, utilizing a for loop with modulo operator to
begin at any given point and progress, wrapping around the array if necessary, to return the potential progression options.

This satisfied the criteria of my Codecademy portfolio project, however I wanted the ability to generate lyrics, and I also wanted to generate "any" lyrics.

The program does so by utilizing a variety of modules. A series of four randomly generated "template" verse lines are created via the Poem-gen module, and each word in that 
poem is then pushed through a function which utilizes the wordPOS module to check it's type against known adjectives, nouns, adverbs, and verbs; it will randomly generate
a like word of a similar type and syllable count from any available in Princeton's WordNet Database, and return this word, with "rest" words returned as-is, and in both instances 
as a string within an array due to wordPOS' functionality in order to maintain consistency. The newly generated array of lines are pushed into a new array, which is now
three dimensional; I maintained this both to experiment academically with retreiving and replacing objects in a three dimensional array, and to be frank because initially I could
not think of an easier option, though I am certain one exists. At this point, a while loop coupled with the rhymes module determines if a given word has no available rhyming options;
if it does not, a new word is selected at random utilizing the syllableCountCheck function; if the word falls into the "rest" category, it returns itself and a completely new word
selected ignoring the type (verb/adverb/etc) is assigned, the while loop verifies again, etc. Once this occurs, the final word of the fourth verse is used as an argument
for the rhymingWordMateSelect function which generates one of the available rhyming matches at random, and it is assigned to that index position.

//ToDo: Revise this and utilize markdown.
