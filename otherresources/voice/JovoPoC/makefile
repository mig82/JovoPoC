alexa_skill_id=amzn1.ask.skill.6e5989ec-8044-4605-acec-0dc4a0dd275f

run:
	jovo run --port 3000 -w

google_pull:
	cd platforms/googleAction && \
	gactions pull --force --project-id jovopoc

alexa_pull:
	cd platforms/alexaSkill && \
	ask smapi export-package --skill-id $(alexa_skill_id) --stage development && \
	ask smapi get-account-linking-info --skill-id $(alexa_skill_id) > acct-linking.json
	#ask smapi get-skill-manifest --skill-id $(alexa_skill_id) && \

alexa_push:
	cd platforms/alexaSkill && \
	ask smapi update-account-linking-info --skill-id $(alexa_skill_id) --account-linking-request $(cat acct-linking.json)
