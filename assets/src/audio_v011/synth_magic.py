import math, wave, struct, random
from pathlib import Path
SR=44100

def write(name,dur,fn):
    n=int(SR*dur)
    path=Path('/mnt/data')/(name+'.wav')
    with wave.open(str(path),'w') as w:
        w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR)
        frames=[]
        for i in range(n):
            t=i/SR
            v=max(-1,min(1,fn(t,dur)))
            frames.append(struct.pack('<h',int(v*32767)))
        w.writeframes(b''.join(frames))
    return path

def bolt(t,d):
    env=(1-t/d)**1.8
    f=880-520*(t/d)+55*math.sin(t*18)
    tone=math.sin(2*math.pi*f*t)+.35*math.sin(2*math.pi*(f*2.02)*t)
    sparkle=.18*math.sin(2*math.pi*(1500+700*t/d)*t)
    return .42*env*(tone*.62+sparkle)

def burst(t,d):
    x=t/d
    env=(1-x)**1.25
    swell=min(1,t/.035)
    base=math.sin(2*math.pi*(240+160*x)*t)+.45*math.sin(2*math.pi*(480+260*x)*t)
    shimmer=.3*math.sin(2*math.pi*(1200-500*x)*t)
    noise=(random.random()*2-1)*.12*(1-x)
    return .48*swell*env*(base*.62+shimmer+noise)
write('arcane_bolt',.28,bolt)
write('arcane_burst',.55,burst)
