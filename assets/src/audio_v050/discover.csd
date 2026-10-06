<CsoundSynthesizer>
<CsOptions>
-W -o /mnt/data/PawsAndPlumes/assets/src/audio_v050/discover.wav
</CsOptions>
<CsInstruments>
sr=44100
ksmps=32
nchnls=2
0dbfs=1
instr 1
 aE expon .22, p3, .001
 a1 oscili aE, p4
 a2 oscili aE*.45, p4*2
 outs a1+a2,a1+a2
endin
</CsInstruments>
<CsScore>
i1 0 .32 523.25
i1 .12 .38 659.25
i1 .24 .5 783.99
</CsScore>
</CsoundSynthesizer>
