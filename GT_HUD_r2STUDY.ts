## Copyright (c) 2019 - 2021 Hex Ventures, LLC ##

input showChannel = yes;
input showWeekMA = no;
input showMonthMA = yes;
input showSimesterMA = no;
input showYearlyMA = yes;
input showBollinger = no;
input showKeltner = no;
input showBreakoutSignals = no;

## Standard Variables
input avgtypSIM = AverageType.EXPONENTIAL;
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
def ps = 126;
def py = 252;
def ofs = 1;

## 63 Period High and Low with Median
plot ll = Lowest(lm, pq);
ll.SetDefaultColor(Color.LIGHT_GRAY);
ll.HideBubble();
ll.SetHiding(!showChannel);

plot hh = Highest(hm, pq);
hh.SetDefaultColor(Color.LIGHT_GRAY);
hh.HideBubble();
hh.SetHiding(!showChannel);

plot median = (hh + ll) / 2;
median.SetDefaultColor(Color.YELLOW);
median.SetLineWeight(2);
median.SetHiding(!showChannel);

## 5 SMA
plot mafast = MovingAverage(avgtypSIM, c, pw);
mafast.SetDefaultColor(Color.WHITE);
mafast.SetLineWeight(2);
mafast.HideBubble();
mafast.SetHiding(!showWeekMA);

## 21 SMA
plot maone = MovingAverage(avgtypSIM, c, pm);
maone.AssignValueColor(if c > maone then Color.GREEN else Color.RED);
maone.SetLineWeight(2);
maone.HideBubble();
maone.SetHiding(!showMonthMA);

## 126 SMA
plot maslow = MovingAverage(avgtypSIM, c, ps);
maslow.SetDefaultColor(Color.DARK_ORANGE);
maslow.SetLineWeight(2);
maslow.HideBubble();
maslow.SetHiding(!showSimesterMA);

## 252 SMA
plot matwo = MovingAverage(avgtypSIM, c, py);
matwo.SetDefaultColor(Color.DARK_RED);
matwo.SetLineWeight(2);
matwo.HideBubble();
matwo.SetHiding(!showYearlyMA);

## Keltner Channels
def ks = ( sdp - 0.50 ) * MovingAverage(avgtypSIM, TrueRange(h, c, l), pm);
def ka = MovingAverage(avgtypSIM, c, pm);
plot kub = ka + ks;
kub.SetDefaultColor(Color.VIOLET);
kub.HideBubble();
kub.SetHiding(!showKeltner);
plot klb = ka - ks;
klb.SetDefaultColor(Color.VIOLET);
klb.HideBubble();
klb.SetHiding(!showKeltner);

## Bollinger Bands
def bbsd = StDev(c, pm);
def bbml = MovingAverage(avgtypSIM, c, pm);
plot bblb = bbml + sdn * bbsd;
bblb.SetDefaultColor(Color.BLUE);
bblb.HideBubble();
bblb.SetHiding(!showBollinger);
plot bbub = bbml + sdp * bbsd;
bbub.SetDefaultColor(Color.BLUE);
bbub.HideBubble();
bbub.SetHiding(!showBollinger);

## VIX Calculated Portfolio Allocation Percentage
def vc = close("vix")[ofs];
def pa = Round((GetNetLiq() - GetTotalCash()) / GetNetLiq() * 100, 1);
def vpa = if vc >= 40 then 50 else if vc >= 30 and vc < 40 then 40 else if vc >= 20 and vc < 30 then 35 else if vc >= 15 and vc < 20 then 30 else 25;
AddLabel(yes, "$VIX = " + vc, if vc >= 40 then Color.RED else if vc >= 30 and vc < 40 then Color.ORANGE else if vc >= 20 and vc < 30 then Color.YELLOW else if vc >= 15 and vc < 20 then Color.GREEN else Color.LIGHT_GRAY);
AddLabel(yes, "PA: " + pa + "%" + " VPA: " + vpa + "%", if vpa <= pa then Color.RED else Color.GREEN);

## Market Phase
def bull = maone > median && maone > matwo && median > matwo;
def accu = maone > median && maone > matwo && median < matwo;
def reco = maone > median && maone < matwo && median < matwo;
def mu = ( bull or reco );

def bear = maone < median && maone < matwo && median < matwo;
def dist = maone < median && maone < matwo && median > matwo;
def weak = maone < median && maone > matwo && median > matwo;
def md = ( bear or weak );

AddLabel(bull, " + Markup + " , if bull is true then Color.GREEN else Color.GRAY);
AddLabel(accu, " + Accumulation + ", if accu is true then Color.LIGHT_GREEN else Color.GRAY);
AddLabel(reco, " + Recover + ", if reco is true then Color.ORANGE else Color.GRAY);
AddLabel(weak, " - Weaken - ", if weak is true then Color.LIGHT_ORANGE else Color.GRAY);
AddLabel(dist, " - Distribution - ", if dist is true then Color.LIGHT_RED else Color.GRAY);
AddLabel(bear, " - Markdown - ", if bear is true then Color.RED else Color.GRAY);

plot UpSignal = if mafast crosses above maslow and mu then mafast else Double.NaN;
UpSignal.SetHiding(!showBreakoutSignals);
UpSignal.SetDefaultColor(Color.UPTICK);
UpSignal.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);

plot DownSignal = if mafast crosses below maslow and md then mafast else Double.NaN;
DownSignal.SetDefaultColor(Color.DOWNTICK);
DownSignal.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
DownSignal.SetHiding(!showBreakoutSignals);

AssignPriceColor( if low < low[1] and close < low[1] and high > high[1] then Color.LIGHT_RED else if  low < low[1] and close > high[1] and high > high[1] then Color.LIGHT_GREEN else Color.CURRENT);