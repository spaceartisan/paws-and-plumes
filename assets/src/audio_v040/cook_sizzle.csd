<CsoundSynthesizer>
<CsOptions>
-W -o /mnt/data/PawsAndPlumes/assets/src/audio_v040/cook_sizzle.wav
</CsOptions>
<CsInstruments>
sr=44100
ksmps=32
nchnls=2
0dbfs=1
instr 1
kenv linseg 0, .02, .55, .5, .38, .28, 0
anoise rand .32
asig butterhp anoise, 1800
kmod poscil .22, 13, 1
outs asig*kenv*(.75+kmod), asig*kenv*(.72-kmod*.3)
endin
</CsInstruments>
<CsScore>
f 1 0 4096 10 1
i 1 0 .8
e
</CsScore>
</CsoundSynthesizer>
