<CsoundSynthesizer>
<CsOptions>
-d -W -o arquebus_shot.wav
</CsOptions>
<CsInstruments>
sr=44100
ksmps=32
nchnls=1
0dbfs=1
instr 1
 iamp = 0.92
 aenv linseg 1, 0.012, .72, 0.07, .18, 0.16, 0
 anoise rand 1
 athump oscili 0.58, 92
 aring oscili 0.16, 690
 aout = (anoise*0.62 + athump + aring) * aenv * iamp
 aout tone aout, 5200
 out aout
endin
</CsInstruments>
<CsScore>
i1 0 0.25
e
</CsScore>
</CsoundSynthesizer>
