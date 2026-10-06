<CsoundSynthesizer>
<CsOptions>
-W -o /mnt/data/PawsAndPlumes/assets/src/audio_v040/loot_pickup.wav
</CsOptions>
<CsInstruments>
sr=44100
ksmps=32
nchnls=2
0dbfs=1
instr 1
kenv linseg 0, .004, .65, .07, .28, .13, 0
kfreq expseg 780, .2, 1320
asig poscil .38, kfreq, 1
asig2 poscil .18, kfreq*1.5, 1
outs (asig+asig2)*kenv, (asig+asig2)*kenv
endin
</CsInstruments>
<CsScore>
f 1 0 4096 10 1
i 1 0 .21
e
</CsScore>
</CsoundSynthesizer>
