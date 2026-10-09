<CsoundSynthesizer>
<CsOptions>
-W -o /tmp/festival_bell.wav
</CsOptions>
<CsInstruments>
sr=44100
ksmps=32
nchnls=2
0dbfs=1
instr 1
  iamp = p4
  ifreq = p5
  aenv expseg 1, .04, .72, 1.45, .001
  a1 oscili iamp*aenv, ifreq, 1
  a2 oscili iamp*.58*aenv, ifreq*2.71, 1
  a3 oscili iamp*.38*aenv, ifreq*4.12, 1
  a4 oscili iamp*.22*aenv, ifreq*5.43, 1
  amix = a1+a2+a3+a4
  outs amix, amix*.96
endin
</CsInstruments>
<CsScore>
f 1 0 16384 10 1
; two civic bell strokes
 i 1 0.00 1.55 .20 523.25
 i 1 0.46 1.55 .16 659.25
e
</CsScore>
</CsoundSynthesizer>
