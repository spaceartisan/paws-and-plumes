<CsoundSynthesizer>
<CsOptions>
-d -m0 -W -o guard_block.wav
</CsOptions>
<CsInstruments>
sr=44100
ksmps=32
nchnls=2
0dbfs=1
instr 1
 iamp = 0.55
 aenv expon 1, p3, 0.001
 a1 oscili iamp*aenv, 1280, 1
 a2 oscili iamp*0.65*aenv, 1910, 1
 anoise rand iamp*0.16
 anoise = anoise*aenv
 aout = tanh(a1+a2+anoise)
 outs aout, aout
endin
</CsInstruments>
<CsScore>
f 1 0 16384 10 1
 i 1 0 0.22
 e
</CsScore>
</CsoundSynthesizer>
