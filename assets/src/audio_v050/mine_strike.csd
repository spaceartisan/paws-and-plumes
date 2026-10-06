<CsoundSynthesizer>
<CsOptions>
-W -o /mnt/data/PawsAndPlumes/assets/src/audio_v050/mine_strike.wav
</CsOptions>
<CsInstruments>
sr=44100
ksmps=32
nchnls=2
0dbfs=1
instr 1
 aE expon 1, p3, .001
 a1 oscili .36*aE, 1280
 a2 oscili .20*aE, 1910
 aN noise .08*aE, 0
 outs a1+a2+aN,a1+a2+aN
endin
</CsInstruments>
<CsScore>
i1 0 .28
</CsScore>
</CsoundSynthesizer>
