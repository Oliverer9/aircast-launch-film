# Prompts: AirCast Iceland launch film

**Model:** Claude Opus 5.5, in Claude Code (desktop app), with the HyperFrames skills installed.
I used the guide's "explore" way of working: the model pitches, plans and builds, and I react and choose.

These are my real messages, typos and all. My notes in *italics* say what each one answered.

## 1. The original prompt
- `alright, here is the next module: https://io.vefskoli.is/guides/654004dc49060571736c0033 its not connected to any other modules unless it says so`
  *(the agent read the whole guide, gave a short plan and said what had to be installed)*
- `that could be a good idea, i am wondering if i should make the aircast website better beforehand`
  *(I paused the film and improved the AirCast site first; those prompts are left out here because they changed the site, not the film)*

## 2. Back to the film, and setup
- `now on to the next guide https://io.vefskoli.is/guides/654004dc49060571736c0033`
- `Y` *(go ahead with the setup)*
- `do i have to npx skills add heygen-com/hyperframes?`
- I pasted the output of `npx hyperframes doctor` and the skills installer's questions from my terminal.
- `okay i installed them, whats next`
- `what skills should i pick`
- `alright, whats next`

## 3. Choosing a pitch
- `1, you make it` *(pitch 1, "Living map", from PITCHES.md, with the agent building it)*

## 4. Storyboard
- `nice, when can we start again?` *(after the storyboard page was made; I had hit my usage limit)*
- `what would you sugest for a changing the frames`
- `i like it all, make all of those changes, also the smaller ones you sugested`
  *(the six changes listed on the storyboard page)*

## 5. Voice and sound
- `is there any words spoken during the film?`
- `is it possible to have a voice explaning what they are seeing`
- `Yes, make a test clip`
- `Heart` *(chose the Kokoro "Heart" voice from two test voices)*
- `Sound effects only` *(no music, just effects under the voice; the film was animated and rendered after this)*

## 6. Fixes after watching
- `where can i watch the film`
- `is it possible to have an icelandic voice in the video` *(the agent explained the options; I kept the English voice)*
- `the problem is the pronounciation of reykjavik and grensás in the video, how can i type it out so it sounds icelandic`
- `maake a test clip`
- `the last one sounds the best` *(take 3: "Grenn-souse", "Rake-ya-veek")*
- `Yes, re-download it` *(HyperFrames' Chrome had broken, so renders failed)*
- `is it finnished?` *(asking about the new render)*

## 7. Checking the hand-in
- `is this according to the project descriptions`
- `what will you write for the prompt section?`
- `can you create a custom prompt for you that makes it so it would turn out the way it did`
  *(the agent wrote one long prompt describing the finished film; it is not one I used, so it's not here)*
- `whats next`
- `yes write it now` *(STYLE-LIBRARY.md, this file and the storyboard page's change list)*
- `where is the prompts.md? and why the 720 and not 1080?` *(the guide asks for a 720p copy)*
- `finnish the capturing page` *(the agent took a picture of the storyboard page to check it)*
- `arent the original prompts missing in prompt.md?` *(they were; added to section 1)*
- `alright is everything ready for turnin?`

## 8. Putting it on GitHub
- `i need the github link` *(there was no repo yet; I chose: the whole films folder, public, and I create the repo myself)*
- `give me a short description of the project and the steps that i have to make to the new repo`
- `done` *(the agent pushed to https://github.com/Oliverer9/aircast-launch-film)*
- `i cant save my change in prompt md, can you help. make it up 2 date and also github`

## A note on how the chat started
This chat was opened by another Claude session that I had asked to help me with my Vefskólinn
assignments. It started this one with a short brief: read each guide fully, make each project in
its own new folder, don't copy from my earlier projects, and don't commit or make a GitHub repo
unless I ask. Everything above is what I typed myself.

## Would I prompt it the same way next time?

I would have claude generate a base prompt for me that i can tweak to make small tweaks unnecessary. I would have the icelandic scentences that the ai reads typed like its pronounced. Other than that it came out great first try and i was kinda testing the water since film making with ai is uncharted teratory, but i have a clear vision on how to go about it efficiently nect time!
