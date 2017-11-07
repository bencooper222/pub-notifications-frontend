# Disclaimers

## Functionality
This is a best effort project. I might screw up and something might go wrong. If it doesn't text you, sorry. 

## Storage
I store your phone number in Firebase Real Time Database until your order is called. After that, it is deleted. I have not spent the time to fully secure this setup. It's possible that if someone cared enough to hack this, they could steal your phone number. That also applies if you do something stupid like entering your social security number instead of your phone number. 

It currently runs on a Google Cloud Compute Engine Instance that I"m pretty sure is secure. Again, I may be wrong and your phone number may be stolen.


I also use `localStorage` to store your phone number, you guessed it, locally! This means your phone number will be autofilled after your first visit to the site. Incognito mode in Chrome (or its equivalents in other browsers) should be enough to stop this if you wanted. 

Twilio also does provide me with a log of numbers texted. If Twilio gets hacked, your number could get exposed. I could also run analytics on who gets texted (which would tell me who goes to the pub and how frequently). 


## Mining
For memes, I've attached a Coinhive process to the site that mines for the Monero blockchain. Given my site has low stickiness (who spends a lot of time on it?) and low usage, I'm not expecting much money out of it (if any). That said, if you're uncomfortable with it, don't use my app. It costs me $45/school year to run this: a few CPU cycles isn't a lot to ask
