## Copyright (c) 2019 - 2021 Hex Ventures, LLC ##
## Dollar Volume Liquidity Rank
declare lower;

## Standard Variables
input ts = {"Year", default "Quarter", "Month"};
def avgtypSIM = AverageType.SIMPLE;
def o = open;
def h = high;
def l = low;
def c = close;
def hlc = ( h + l + c) / 3;
def iv = imp_volatility;
def vl = volume;
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

# Define Scale
def pl;
switch (ts) {
case "Month":
    pl = pm;
case "Quarter":
    pl = pq;
case "Year":
    pl = py;
}

## Define DVLR
def av = Average(vl, pl);
def dvl = c * av;
def pldvlH = Round(Highest(dvl, pl), 3);
def pldvlL = Round(Lowest(dvl, pl), 3);
def pldvlM = ( pldvlH + pldvlL ) / 2;
def pldvlRN = pldvlH - pldvlL;

plot pldvlr =  if IsNaN(Round(((dvl - pldvlL) / pldvlRN) * 100.0, 0)) then Double.NaN else Round(((dvl - pldvlL) / pldvlRN) * 100.0, 0) ;
pldvlr.DefineColor("Highest", Color.YELLOW);
pldvlr.DefineColor("Lowest", Color.DARK_GREEN);
pldvlr.AssignNormGradientColor(pq, pldvlr.color("Highest"), pldvlr.color("Lowest"));
pldvlr.SetPaintingStrategy(PaintingStrategy.LINE);
pldvlr.SetLineWeight(2);

## MA pldvlr
plot pldvlrMA = MovingAverage(avgtypSIM, pldvlr, pq);
pldvlrMA.SetDefaultColor(Color.RED);
pldvlrMA.HideBubble();

## Midline
plot fifty = ml;
fifty.SetDefaultColor(Color.ORANGE);
fifty.SetPaintingStrategy(PaintingStrategy.DASHES);
fifty.HideBubble();
