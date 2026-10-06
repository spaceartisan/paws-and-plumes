<CsoundSynthesizer>
<CsOptions>
-W -o /mnt/data/PawsAndPlumes/assets/src/audio_v050/wood_chop.wav
</CsOptions>
<CsInstruments>
sr=44100
ksmps=32
nchnls=2
0dbfs=1
instr 1
 aN noise .5, 0
 aR reson aN, 520, 420
 aE expon 1, p3, .001
 aO = (aR*.65 + aN*.08)*aE
 outs aO,aO
endin
</CsInstruments>
<CsScore>
i1 0 .22
</CsScore>
</CsoundSynthesizer>
