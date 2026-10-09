<CsoundSynthesizer>
<CsOptions>
-W -o /mnt/data/PawsAndPlumes_v019/PawsAndPlumes/assets/src/audio_v019/ambience_rain.wav
</CsOptions>
<CsInstruments>
sr=44100
ksmps=32
nchnls=2
0dbfs=1
instr 1
anoise rand 0.4
alow butterlp anoise, 1450
ahigh butterhp anoise, 700
kdrift oscil 0.13, .08, 1
agust = (alow*.25+ahigh*.1)*(0.75+kdrift)
aspat rand .3
aspat butterbp aspat, 2900, 1100
kdrop randh .7, 12
arain = (agust + aspat*(.15+kdrop*.15))*.24
outs arain, arain*.92
endin
</CsInstruments>
<CsScore>
f 1 0 4096 10 1
i 1 0 12
 e
</CsScore>
</CsoundSynthesizer>
