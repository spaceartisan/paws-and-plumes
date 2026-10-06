<CsoundSynthesizer>
<CsOptions>
-d -m0 -W -o enemy_warning.wav
</CsOptions>
<CsInstruments>
sr=44100
ksmps=32
nchnls=2
0dbfs=1
instr 1
 kfreq linseg 520, p3*0.35, 690, p3*0.65, 570
 aenv linseg 0, 0.012, 0.42, p3-0.04, 0.22, 0.028, 0
 a1 oscili aenv, kfreq, 1
 a2 oscili aenv*0.25, kfreq*1.5, 1
 aout = (a1+a2)*0.7
 outs aout, aout
endin
</CsInstruments>
<CsScore>
f 1 0 16384 10 1
 i 1 0 0.34
 e
</CsScore>
</CsoundSynthesizer>
