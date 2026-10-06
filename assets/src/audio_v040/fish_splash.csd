<CsoundSynthesizer>
<CsOptions>
-W -o /mnt/data/PawsAndPlumes/assets/src/audio_v040/fish_splash.wav
</CsOptions>
<CsInstruments>
sr=44100
ksmps=32
nchnls=2
0dbfs=1
instr 1
kenv linseg 0, .006, .9, .12, .36, .18, 0
anoise rand 0.45
kcf expseg 4200, .28, 650
asig butterlp anoise, kcf
apop poscil .12, 180, 1
outs (asig+apop)*kenv, (asig+apop)*kenv
endin
</CsInstruments>
<CsScore>
f 1 0 4096 10 1
i 1 0 .34
e
</CsScore>
</CsoundSynthesizer>
