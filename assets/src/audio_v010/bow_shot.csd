<CsoundSynthesizer>
<CsOptions>
-d -W -o bow_shot.wav
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
nchnls = 1
0dbfs = 1

instr BowShot
  ; taut string snap, then a short air hiss from the arrow leaving the bow
  kfreq expon 720, p3, 190
  astring poscil 0.52, kfreq
  aenv linseg 0, 0.002, 1, 0.035, 0.33, p3-0.047, 0
  anoise rand 0.24
  ahiss buthp anoise, 1800
  ahiss butlp ahiss, 7200
  ahenv linseg 0, 0.004, 0.8, 0.045, 0.28, p3-0.061, 0
  aout = astring*aenv + ahiss*ahenv
  outs aout
endin
</CsInstruments>
<CsScore>
i "BowShot" 0 0.19
</CsScore>
</CsoundSynthesizer>
