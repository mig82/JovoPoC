# Quantum Jovo Proof of Concept

This Visualizer project includes two bits of interest.

1. A Jovo app —found at `otherresources/voice/JovoPoC`— that integrates with Fabric and covers the following platforms:

  * Google Assistant (using Actions on Google as the NLU)
  * Alexa
  * Chatbots (using Dialogflow as the NLU).

2. A component —found at `userwidgets/quantum.JovoDialogue`— which implements a chatbot wired to talk to the Jovo app mentioned above. It's important to note that:

  * This component is made of several other components, such as `quantum.InSpeech`, `quantum.DialogueLoad` and so on, that implement the different elements that can populate a chat box.
  * This component leverages Jovo's own `JovoWebClient` client library, downloaded in its minified form from its CDN location.

The general idea is that we Jovo to build a *single* codebase that covers *all* conversational platforms, including VPA's —such as Alexa, Google Assistant and others in the future— as well as web apps built using Visualizer —and eventually native apps as well.

# Implementation Notes

Find all my notes in the `README.md` file found at `otherresources/voice`, [here](otherresources/voice/README.md)

## Install

The Jovo project found at `otherresources/voice/JovoPoC` is a Node application. You should follow Jovo's docs in order to install it. It should be as easy as running `npm install` though.

**However**, this project in particular depends on another two libraries custom made for the purpose of achieving integration with Fabric.

* **Quantum Jovo Base Application:** While a normal Jovo app is an instance of `App` from package `jovo-framework`, this app is instead and instance of `QuantumJovoApp` from  package `quantum-jovo`. The `QuantumJovoApp` class is an extension of Jovo's base `App` that includes a ton of utility features we'll need in order to be able slap low code features around this.
* **Kony:** Since Jovo applications are built in Node, and JS is already Quantum's programming language, it made sense to try to recreate the old Kony SDK in an NPM package that would allow us to code Node applications that talk to Fabric in the same ways the old Kony SDK does. This `kony` NodeJS library is meant to implement the subset of the old Kony SDK that is responsible for communicating with Fabric —i.e. invoking Identity, Integration, Engagement and Metrics.

Since these two packages are not yet published to NPM, you'll have to either `git clone` them into your workstation and install them from their file path —e.g. `npm i path/to/foo`— or install them from Git —e.g. `git+ssh://git@github.com/Temenos-Quantum/[repo]`. See full reference [here](https://docs.npmjs.com/cli/v7/commands/npm-install)

## Build

To build the Jovo project, use the `makefile` found at the root of the JovoPoC project directory, [here](otherresources/voice/JovoPoC/makefile).

To build the models for the three different platforms run:

```
make build
```

To deploy the models you'll have to link and install the respective CLI for each (Alexa, GActions and Dialogflow) and then run:

```
make deploy
```

**Note** that the reason for using a makefile is to be able to build each platform separately in order to be able to support GActions and Dialogflow in the same project —something which is not possible out of the box with Jovo v3.
