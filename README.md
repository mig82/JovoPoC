# Install Jovo

Get the Jovo CLI and the ASK (Alexa Skills Kit) CLI.

    npm install -g jovo-cli
    npm install -g ask-cli

Working with  jovo-cli@3.2.1

Create Jovo project

    jovo new voice

Run the Jovo project

    cd voice
	jovo run --port 3301

Note that Visualizer already uses the default port 3000, so the `--port` option is necessary.

## Questions

1. Where should we create the Jovo project within the Vis project? Would `/forms` be adequate?
