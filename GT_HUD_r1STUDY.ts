## Copyright (c) 2019 - 2021 Hex Ventures, LLC ##

## Standard Variables
def avgtypSIM = AverageType.SIMPLE;
def o = open;
def h = high;
def l = low;
def c = close;
def hlc = ( h + l + c) / 3;
def vl = volume;
def iv = imp_volatility;
def hm = Max(o, c);
def lm = Min(o, c);
def ob = 80;
def os = 20;
def ml = 50;
def sdp = 2.0;
def sdn = -2.0;
def zl = 0;
def pw = 5;
def pm = 21;
def pq = 63;
def py = 252;
def ofs = 1;

## 63 Period High and Low with Median
plot ll = Lowest(lm, pq);
ll.SetDefaultColor(Color.LIGHT_GRAY);
ll.HideBubble();

plot hh = Highest(hm, pq);
hh.SetDefaultColor(Color.LIGHT_GRAY);
hh.HideBubble();

plot median = (hh + ll) / 2;
median.SetDefaultColor(Color.YELLOW);
median.SetLineWeight(2);

## 21 SMA
plot maone = MovingAverage(avgtypSIM, c, pw);
maone.SetDefaultColor(Color.WHITE);
maone.SetLineWeight(2);
maone.HideBubble();

## 252 SMA
plot matwo = MovingAverage(avgtypSIM, c, py);
matwo.SetDefaultColor(Color.DARK_ORANGE);
matwo.SetLineWeight(2);
matwo.HideBubble();

## Keltner Channels
def ks = ( sdp - 0.50 ) * MovingAverage(avgTypSIM, TrueRange(h, c, l), pm);
def ka = MovingAverage(avgTypSIM, c, pm);
plot kub = ka + ks;
kub.SetDefaultColor(Color.BLUE);
kub.HideBubble();
plot klb = ka - ks;
klb.SetDefaultColor(Color.BLUE);
klb.HideBubble();

## Bollinger Bands
def bbsd = stdev(c, pm);
def bbml = MovingAverage(avgtypSIM, c, pm);
plot bblb = bbml + sdn * bbsd;
bblb.SetDefaultColor(Color.BLUE);
bblb.HideBubble();
plot bbub = bbml + sdp * bbsd;
bbub.SetDefaultColor(Color.BLUE);
bbub.HideBubble();

## Keltner and Bollinger Cloud
AddCloud( bbub, kub, Color.CURRENT, Color.RED);
AddCloud( bblb, klb, Color.RED, Color.CURRENT);

## VIX Calculated Portfolio Allocation Percentage
def vc = close("vix");
def pa = Round((GetNetLiq() - GetTotalCash()) / GetNetLiq() * 100, 1);
def vpa = if vc >= 40 then 50 else if vc >= 30 and vc < 40 then 40 else if vc >= 20 and vc < 30 then 35 else if vc >= 15 and vc < 20 then 30 else 25;
AddLabel(yes, "$VIX = " + vc, if vc >= 40 then Color.RED else if vc >= 30 and vc < 40 then Color.ORANGE else if vc >= 20 and vc < 30 then Color.YELLOW else if vc >= 15 and vc < 20 then Color.GREEN else Color.LIGHT_GRAY);
AddLabel(yes, "PA: " + pa + "%" + " VPA: " + vpa + "%", if vpa <= pa then Color.RED else Color.GREEN);

## Market Phase
def bull = c[ofs] > median && c[ofs] > matwo && median > matwo;
def accu = c[ofs] > median && c[ofs] > matwo && median < matwo;
def reco = c[ofs] > median && c[ofs] < matwo && median < matwo;

def bear = c[ofs] < median && c[ofs] < matwo && median < matwo;
def dist = c[ofs] < median && c[ofs] < matwo && median > matwo;
def weak = c[ofs] < median && c[ofs] > matwo && median > matwo;

AddLabel(bull, " + Markup + " , if bull is true then Color.GREEN else Color.GRAY);
AddLabel(accu, " + Accumulation + ", if accu is true then Color.LIGHT_GREEN else Color.GRAY);
AddLabel(reco, " + Recover + ", if reco is true then Color.ORANGE else Color.GRAY);
AddLabel(weak, " - Weaken - ", if weak is true then Color.LIGHT_ORANGE else Color.GRAY);
AddLabel(dist, " - Distribution - ", if dist is true then Color.LIGHT_RED else Color.GRAY);
AddLabel(bear, " - Markdown - ", if bear is true then Color.RED else Color.GRAY);